import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

interface TranslationManagerOptions {
    /** The objects DB instance */
    objects: ObjectsClient;
    /** The config i18n directories, as absolute paths */
    configDirs: string[];
}

export class TranslationManager {
    /** The objects DB instance */
    private objects: ObjectsClient;
    /** The config i18n directories */
    private configDirs: string[];
    /** Await the promise to ensure the translator is ready */
    private ready: Promise<void>;
    /** The actual translations */
    private translations = new Map<string, string>();

    constructor(options: TranslationManagerOptions) {
        this.objects = options.objects;
        this.configDirs = options.configDirs;

        this.ready = this.init();
    }

    /**
     * Initialize the Translator instance
     * This determines the locale and loads the translations from the config file
     */
    private async init(): Promise<void> {
        // TODO: get language from sys config
        // TODO: subscribe language changes
        // TODO: create and use a method to load Translations for given language
    }

    /**
     * Translate given key to the active language (configured in `system.config` object)
     *
     * @param key key to translate
     */
    public translate(key: string): string {
        const translation = this.translations.get(key);

        if (translation === undefined) {
            throw new Error(`No translation found for key "${key}"`);
        }

        return translation;
    }
}
