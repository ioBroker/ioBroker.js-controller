import { register } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const adapterSrc = resolve(__dirname, 'src');
const repoRoot = resolve(__dirname, '..', '..');

// ts-node reads TS_NODE_PROJECT on first use; setting it here before registering ensures it
// picks up the test tsconfig with @iobroker/types-dev and mocha types.
process.env.TS_NODE_PROJECT ??= resolve(__dirname, 'tsconfig.test.json');

register('ts-node/esm', pathToFileURL(repoRoot + '/'));

// Registered after ts-node so Node's last-registered-runs-first chain puts this before ts-node,
// allowing @/ aliases to be remapped before ts-node's resolver sees them.
register(
    `data:text/javascript,
    const adapterSrc = ${JSON.stringify('file://' + adapterSrc)};
    export async function resolve(specifier, context, nextResolve) {
        if (specifier.startsWith('@/')) {
            return nextResolve(adapterSrc + '/' + specifier.slice(2), context);
        }
        return nextResolve(specifier, context);
    }`,
    pathToFileURL(repoRoot + '/')
);
