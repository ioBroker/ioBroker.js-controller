// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getUsedObjectIDs } = require('../www/js/visUtils');
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

interface CalculatedProject {
    id: string;
    val: number;
}

/**
 * Calculate number of datapoints for each project of given instance
 *
 * @param objects the objects db
 * @param projects the read projects
 * @param instance vis instance
 */
async function calcProject(
    objects: ObjectsClient,
    projects: ioBroker.ReadDirResult[],
    instance: number
): Promise<CalculatedProject[]> {
    const result: CalculatedProject[] = [];

    if (!projects?.length) {
        return result;
    }

    for (const project of projects) {
        if (!project?.isDir) {
            continue;
        }

        if (!(await objects.fileExists(`vis.${instance}`, `/${project.file}/vis-views.json`))) {
            continue;
        }

        // calculate datapoints in one project
        const data = await objects.readFile(`vis.${instance}`, `/${project.file}/vis-views.json`);
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
                id: `vis.${instance}.datapoints.${project.file.replace(/[.\\s]/g, '_')}`,
                val: dps.IDs.length
            });
        }
    }

    return result;
}

/**
 * Calculate number of datapoints for all vis projects of given instance
 *
 * @param objects - the objects db
 * @param instance - vis instance
 */
export async function calcProjects(objects: ObjectsClient, instance: number): Promise<CalculatedProject[]> {
    const projects = await objects.readDirAsync(`vis.${instance}`, '/');
    if (!projects?.length) {
        return [{ id: `vis.${instance}.datapoints.total`, val: 0 }];
    }

    const result = await calcProject(objects, projects, instance);
    if (result?.length) {
        let total = 0;
        for (const entry of result) {
            total += entry.val;
        }
        result.push({ id: `vis.${instance}.datapoints.total`, val: total });
    }

    return result;
}
