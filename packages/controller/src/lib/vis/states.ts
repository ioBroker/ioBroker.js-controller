import { getUsedObjectIDs } from './visUtils.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

interface CalculatedProject {
    id: string;
    val: number;
}

interface CalculateProjectsOptions {
    /** The objects db instance */
    objects: ObjectsClient;
    /** Vis instance */
    instance: number;
    /** Vis adapter name */
    visAdapter: 'vis' | 'vis-2';
}

interface CalculateProjectOptions extends CalculateProjectsOptions {
    /** The read project directories */
    projects: ioBroker.ReadDirResult[];
}

/**
 * Calculate the number of data points for each project of given instance
 *
 * @param options - database and project information
 */
async function calcProject(options: CalculateProjectOptions): Promise<CalculatedProject[]> {
    const { visAdapter, instance, objects, projects } = options;
    const result: CalculatedProject[] = [];

    if (!projects?.length) {
        return result;
    }

    for (const project of projects) {
        if (!project?.isDir) {
            continue;
        }

        if (!(await objects.fileExists(`${visAdapter}.${instance}`, `/${project.file}/vis-views.json`))) {
            continue;
        }

        // calculate data points in one project
        const data = await objects.readFile(`${visAdapter}.${instance}`, `/${project.file}/vis-views.json`);
        let json;
        try {
            json = JSON.parse(data.file as string);
        } catch {
            console.error(`Cannot parse "/${project.file}/vis-views.json`);
            continue;
        }

        const dps = getUsedObjectIDs(json, false);
        if (dps?.IDs) {
            result.push({
                id: `${visAdapter}.${instance}.datapoints.${project.file.replace(/[.\\s]/g, '_')}`,
                val: dps.IDs.length,
            });
        }
    }

    return result;
}

/**
 * Calculate the number of data points for all vis projects of given instance
 *
 * @param options - db and vis options
 */
export async function calcProjects(options: CalculateProjectsOptions): Promise<CalculatedProject[]> {
    const { visAdapter, instance, objects } = options;
    const projects = await objects.readDirAsync(`${visAdapter}.${instance}`, '/');

    if (!projects?.length) {
        return [{ id: `${visAdapter}.${instance}.datapoints.total`, val: 0 }];
    }

    const result = await calcProject({ objects, projects, instance, visAdapter });
    if (result?.length) {
        let total = 0;
        for (const entry of result) {
            total += entry.val;
        }
        result.push({ id: `${visAdapter}.${instance}.datapoints.total`, val: total });
    }

    return result;
}
