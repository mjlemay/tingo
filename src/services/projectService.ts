import { db } from './sqlLiteService';
import { eq } from 'drizzle-orm';
import { projects } from '../constants/dbSchema';
import { basicProjectType, createProjectType } from '../constants/defaults';


const addProject = async (project:createProjectType) => {
    const { name, description } = project;
    const values ={
        name,
        description,
    };
    return await db.insert(projects).values(values);
}

const getProject = async (projectId:number) => {
    return await db.select().from(projects).where(eq(projects.projectId, projectId));
}

const getProjects = async (limit:number) => {
    return await db.select().from(projects).limit(limit);
}

const updateProject = async (project:basicProjectType) => {
    const { projectId } = project;
    return await db.update(projects)
        .set(project)
        .where(eq(projects.projectId, projectId))
        .returning();
}

const deleteProject = async (project:basicProjectType) => {
    const { projectId } = project;
    return await db.delete(projects)
        .where(eq(projects.projectId, projectId))
        .returning();
}

const projectData = { 
    addProject,
    deleteProject,
    getProject,
    getProjects,
    updateProject
 }

export { projectData }

