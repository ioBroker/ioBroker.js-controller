export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            /** The build time of the Docker image, only available in the official Docker image */
            BUILD: string;
            /** Allows overriding the host name via env variable for test purposes */
            IOB_HOSTNAME?: string;
        }
    }
}
