import { db } from './sqlLiteService';
import { eq } from 'drizzle-orm';
import { rules } from '../constants/dbSchema';
import { basicRuleType } from '../constants/defaults';

const addRule = async (rule:basicRuleType) => {
    const { name, description, jsonBody, projectId } = rule;
    const values ={
        name,
        description,
        jsonBody,
        projectId,
    };
    return await db.insert(rules).values(values);
}

const getRule = async (ruleId:number) => {
    return await db.select().from(rules).where(eq(rules.ruleId, ruleId));
}

const getProjectRules = async (projectId:number, limit:number) => {
    return await db.select().from(rules).where(eq(rules.projectId, projectId)).limit(limit);
}

const getAllRules = async (limit:number) => {
    return await db.select().from(rules).limit(limit);
}

const updateRule = async (rule:basicRuleType) => {
    const { ruleId } = rule;
    return await db.update(rules)
        .set(rule)
        .where(eq(rules.ruleId, ruleId))
        .returning();
}

const deleteRule = async (ruleId:number) => {
    return await db.delete(rules)
        .where(eq(rules.ruleId, ruleId))
        .returning();
}

const ruleData = { 
    addRule,
    deleteRule,
    getRule,
    getProjectRules,
    getAllRules,
    updateRule
 }

export { ruleData }

