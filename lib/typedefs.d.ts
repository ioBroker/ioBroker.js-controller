// Type declarations which are too complicated to do in JSDoc
interface HostInfo {
    Platform: Exclude<NodeJS.Platform, "win32" | "darwin"> | "Windows" | "OSX";
    os: NodeJS.Platform;
    Architecture: string;
    CPUs: number | null;
    Speed: number | null;
    Model: string | null;
    RAM: number;
    'System uptime': number;
    'Node.js': string;
}