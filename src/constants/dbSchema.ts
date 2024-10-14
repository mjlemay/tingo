import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
    created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    description: text('description'),
    is_template: integer('is_template').notNull().default(0),
    name: text('name').notNull(),
    projectId: integer('projectId', { mode: 'number' }).primaryKey({ autoIncrement: true })
});

export const rules = sqliteTable('rules', {
    created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    description: text('description'),
    name: text('name').notNull(),
    jsonBody: text('jsonBody'),
    projectId: integer('projectId', { mode: 'number' }).notNull(),
    ruleId: integer('ruleId', { mode: 'number' }).primaryKey({ autoIncrement: true }) 
});
