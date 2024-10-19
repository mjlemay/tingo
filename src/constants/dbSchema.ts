import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
    projectId: integer('projectId', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description'),
    is_template: integer('is_template').notNull().default(0),
    created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});

export const rules = sqliteTable('rules', {
    ruleId: integer('ruleId', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    projectId: integer('projectId', { mode: 'number' }).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    jsonBody: text('jsonBody').notNull(),
    created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});

export const devices = sqliteTable('devices', {
    deviceId: integer('deviceId', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    type: text('type').notNull(),
    description: text('description'),
    configuration: text('configuration').notNull(),
    created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});

