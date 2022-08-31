export type ProcessExit = (exitCode?: number) => void;
export type GetRepository = (repoName: string | undefined, params: Record<string, any>) => Promise<Record<string, any>>;
