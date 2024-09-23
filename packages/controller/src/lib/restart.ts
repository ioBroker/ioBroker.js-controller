import { spawn } from 'node:child_process';
import os from 'node:os';
import { execAsync, getRootDir } from '@iobroker/js-controller-common-db/tools';
import path from 'node:path';
import url from 'node:url';

/**
 * Restarts the js-controller
 *
 * @param callback callback to execute after restart is triggered
 */
export default async function restart(callback?: () => void): Promise<void> {
    let cmd;
    let args;
    if (os.platform() === 'win32') {
        // On Windows, we use powershell to restart the service, because execution of bat files is no more possible
        const envPath = path.join(getRootDir(), '.env').replaceAll('\\', '\\\\');
        cmd = `powershell -Command "$envPath = \\"${envPath}\\";
        $iobServiceName = \\"ioBroker\\";
        if (Test-Path $envPath) {
          foreach ($line in Get-Content $envPath) {
            $line = $line.Trim();
            if ($line -match \\"^\\s*iobservicename\\s*=\\s*(.+)\\s*$\\") {
                $iobServiceName = $matches[1].Trim(); break;
            }
          }
        }
        Write-Output \\"Restarting service $iobServiceName.exe\\";Restart-Service \\"$iobServiceName.exe\\" -Force"`;

        // Remove line breaks, because the powershell command will fail otherwise
        cmd = cmd.replace(/[\r\n]+/gm, ' ');

        try {
            await execAsync(cmd);
        } catch (e) {
            console.error(`Restart failed: ${e.message}`);
        }
    } else {
        // Unix has a global ioBroker binary that delegates to the init system
        // We need to call that, so we don't have two instances of ioBroker running
        cmd = 'iobroker';
        args = ['restart'];

        const child = spawn(cmd, args, {
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore'],
            windowsHide: true,
        });
        child.unref();
    }
    if (typeof callback === 'function') {
        setTimeout(() => callback(), 500);
    } else {
        setTimeout(() => process.exit(), 500);
    }
}

// eslint-disable-next-line unicorn/prefer-module
const modulePath = url.fileURLToPath(import.meta.url || `file://${__filename}`);
if (process.argv[1] === modulePath) {
    restart();
}
