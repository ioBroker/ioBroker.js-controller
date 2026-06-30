import { join } from 'node:path';
import fs from 'node:fs';
import { generateDtsBundle } from 'dts-bundle-generator';

const thisDir = import.meta.dirname;
const outputPath = join(thisDir, 'build/types.d.ts');

// Roll up the adapter's public declarations into a single self-contained file.
// `@alcalzone/pak` is inlined so consumers don't need it as a dependency; everything shared with
// the controller comes from `@iobroker/types-dev` (provided separately via the copied files below).
const [generated] = generateDtsBundle(
    [
        {
            filePath: join(thisDir, '../adapter/build/cjs/index.d.ts'),
            libraries: {
                inlinedLibraries: ['@alcalzone/pak'],
            },
            output: {
                noBanner: true,
                // Only re-export what the entry exports; keep transitively referenced types internal
                exportReferencedTypes: false,
            },
        },
    ],
    { preferredConfigPath: join(thisDir, 'tsconfig.dts.json') },
);

// Remove references to @iobroker/types-dev (its types are provided via the copied files below)
const content = generated
    .split('\n')
    .filter(line => !(line.startsWith('/// <reference') && line.includes('@iobroker/types-dev')))
    .join('\n');

fs.mkdirSync(join(thisDir, 'build'), { recursive: true });
fs.writeFileSync(outputPath, content);

// Copy outputs from types-dev to here
fs.copyFileSync(join(thisDir, '../types-dev/objects.d.ts'), join(thisDir, 'build/objects.d.ts'));
fs.copyFileSync(join(thisDir, '../types-dev/index.d.ts'), join(thisDir, 'build/shared.d.ts'));
fs.copyFileSync(join(thisDir, '../types-dev/config.d.ts'), join(thisDir, 'build/config.d.ts'));
fs.copyFileSync(join(thisDir, '../types-dev/utils.d.ts'), join(thisDir, 'build/utils.d.ts'));

// Ensure that the generated types don't contain any references to @iobroker/*
if (content.includes('@iobroker/')) {
    console.error('The generated types contain a reference to an @iobroker package. This is not allowed!');
    console.error('Make sure to put all types shared by controller and adapters into the types-dev package.');
    process.exit(1);
}

console.log('dts-bundle-generator completed successfully');
process.exit(0);
