import * as tjs from 'ts-json-schema-generator';
import path, { dirname } from 'node:path';
import fs from 'fs-extra';
import axios from 'axios';
import { fileURLToPath } from 'node:url';

const thisDir = dirname(fileURLToPath(import.meta.url));

/** Keywords to add to one node of a generated schema */
interface SchemaKeywords {
    /** Keys from the root of the schema to the node */
    path: string[];
    /** The keywords, placed after `type` */
    keywords: Record<string, unknown>;
}

/**
 * Keywords of iobroker.json that the generator cannot derive from config.d.ts. The schema is generated again on
 * every build (`postbuild`), so they are added here instead of by hand in iobroker.json, where the next build
 * would drop them.
 */
const IOB_JSON_KEYWORDS: SchemaKeywords[] = [
    {
        // 0 (off) or at least MIN_DB_LOSS_TIMEOUT_MS of packages/controller/src/lib/controller/db/dbLossWatchdog.ts.
        // Written as `0 | number` with `@minimum` in config.d.ts, it becomes a plain `number`
        path: ['definitions', 'IoBJson', 'properties', 'system', 'properties', 'dbLossTimeout'],
        keywords: { anyOf: [{ const: 0 }, { minimum: 5_000 }] },
    },
];

/**
 * Add keywords to a node of the schema, after its `type`
 * @param schema the generated schema
 * @param entry where and what to add
 */
function addKeywords(schema: object, entry: SchemaKeywords): void {
    let node: unknown = schema;
    for (const key of entry.path) {
        node = node && typeof node === 'object' ? (node as Record<string, unknown>)[key] : undefined;
    }
    if (!node || typeof node !== 'object') {
        // the property was renamed or moved: fail the build instead of losing the keywords
        throw new Error(`Cannot add ${Object.keys(entry.keywords).join(', ')} to ${entry.path.join('.')}: not found`);
    }

    const target = node as Record<string, unknown>;
    const { type, ...rest } = target;
    for (const key of Object.keys(target)) {
        delete target[key];
    }
    Object.assign(target, type === undefined ? {} : { type }, entry.keywords, rest);
}

/**
 * Update contents io iobroker.json schema
 */
function updateIobJSON(): void {
    const config: tjs.Config = {
        path: path.join(thisDir, '..', 'types-dev', 'config.d.ts'),
        tsconfig: path.join(thisDir, '..', 'tsconfig.json'),
        type: 'IoBJson',
        skipTypeCheck: true,
        additionalProperties: false,
    };

    const schema = tjs.createGenerator(config).createSchema(config.type);
    for (const entry of IOB_JSON_KEYWORDS) {
        addKeywords(schema, entry);
    }

    fs.writeJSONSync(path.join(thisDir, 'iobroker.json'), schema, { spaces: 2 });
}

/**
 * Updates the license array in io-package json
 */
async function updateLicenseArray(): Promise<void> {
    // get all allowed licenses as array
    const licenses = await getSpdxLicenseIds();
    if (licenses) {
        const ioPackSchema = fs.readJSONSync(path.join(thisDir, 'io-package.json')) as {
            definitions: { license: { enum: string[] } };
        };
        ioPackSchema.definitions.license.enum = licenses;
        fs.writeJSONSync(path.join(thisDir, 'io-package.json'), ioPackSchema, { spaces: 2 });
    }
}

interface LicenseEntry {
    /** If the license is deprecated */
    isDeprecatedLicenseId: boolean;
    /** License ID */
    licenseId: string;
    /** Other unimportant properties */
    [other: string]: unknown;
}

/**
 * Get all valid and non-deprecated spdx licenses
 * @returns Array of valid license IDs, or null if the list could not be fetched
 */
async function getSpdxLicenseIds(): Promise<string[] | null> {
    const url = 'https://spdx.org/licenses/licenses.json';

    try {
        const res = await axios.get(url);
        const { licenses } = res.data as { licenses: LicenseEntry[] };
        // filter out deprecated and invalid licenses
        return licenses
            .filter(licenseEntry => !licenseEntry.licenseId.endsWith('+') && !licenseEntry.isDeprecatedLicenseId)
            .map(licenseEntry => licenseEntry.licenseId);
    } catch (e) {
        console.warn(`Cannot update spdx licenses list. Not critical: ${(e as Error).message}`);
        return null;
    }
}

updateIobJSON();
updateLicenseArray().catch(e =>
    console.warn(`Cannot update spdx licenses list. Not critical: ${(e as Error).message}`),
);
