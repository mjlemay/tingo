import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
    created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    description: text('description'),
    is_template: integer('is_template').notNull(),
    name: text('name').notNull(),
    projectId: integer('projectId', { mode: 'number' }).primaryKey({ autoIncrement: true })
});
export const defaultProject = { 
    description: '',
    projectId:-1,
    name: '',
    is_template: 0,
    created_at: new Date().toString()
};
export type basicProjectType = {
    created_at: string | null;
    description: string | null;
    is_template: number;
    name: string;
    projectId: number;
}

export type createProjectType = {
    projectId?: null;
    description: string | null;
    is_template: number;
    name: string;
}


