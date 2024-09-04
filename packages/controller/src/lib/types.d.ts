export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            /** If set to 'true' no capabilities for the node executable will be set by the controller */
            IOB_NO_SETCAP?: string;
        }
    }
}
