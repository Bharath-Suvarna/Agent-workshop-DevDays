/**
 * Publisher queries for build-time page data.
 * This file exposes small database access helpers used by Astro pages to list
 * publisher metadata from the local SQLite database.
 */
import { asc } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';
import type { Database } from './db';

/**
 * Returns every publisher ordered alphabetically by name.
 *
 * @param db - The database connection used to read publisher records.
 * @returns A list of publishers with their IDs and names, sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
