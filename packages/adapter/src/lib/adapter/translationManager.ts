import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import path from 'node:path';
import fs from 'node:fs/promises';

interface TranslationManagerOptions {
    /** The objects DB instance */
    objects: ObjectsClient;
    /** The config i18n directories, as absolute paths */
    configDirs: string[];
}

/** The default language to be used */
const DEFAULT_LANG: ioBroker.Languages = 'en';

export class TranslationManager {
    /** The objects DB instance */
    private readonly objects: ObjectsClient;
    /** The config i18n directories as absolute paths */
    private readonly configDirs: string[];
    /** The actual translations */
    private translations = new Map<string, string>();

    constructor(options: TranslationManagerOptions) {
        this.objects = options.objects;
        this.configDirs = options.configDirs;
    }

    /**
     * Initialize the Translator instance
     * This determines the locale and loads the translations from the config file
     */
    public async init(): Promise<void> {
        const sysConfObj = await this.objects.getObject('system.config');

        await this.updateLanguage(sysConfObj?.common.language || DEFAULT_LANG);
    }

    /**
     * Set the language and load the translations
     *
     * @param lang the language to load the translations for
     */
    public async updateLanguage(lang: ioBroker.Languages): Promise<void> {
        this.translations.clear();

        let allTranslations: Record<string, string> = {};

        for (const configDir of this.configDirs) {
            const content = await fs.readFile(path.join(configDir, `${lang}.json`), { encoding: 'utf8' });
            const newTranslations: Record<string, string> = JSON.parse(content);

            allTranslations = { ...allTranslations, ...newTranslations };
        }

        this.translations = new Map(Object.entries(allTranslations));
    }

    /**
     * Translate given key to the active language (configured in `system.config` object)
     *
     * @param key key to translate
     * @param placeholders A dictionary of keys which will be replaced by their corresponding value
     */
    public translate(key: string, placeholders?: Record<string, string>): string {
        let translation = this.translations.get(key);

        if (translation === undefined) {
            throw new Error(`No translation found for key "${key}"`);
        }

        if (!placeholders) {
            return translation;
        }

        for (const [placeholder, replacement] of Object.entries(placeholders)) {
            translation = translation.replaceAll(placeholder, replacement);
        }

        return translation;
    }
}
