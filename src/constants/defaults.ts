export const defaultProject = { 
    description: '',
    projectId: -1,
    name: '',
    is_template: 0,
    created_at: new Date().toString()
};

export const defaultRule = { 
    description: '',
    projectId: -1,
    name: '',
    jsonBody: '{}',
    ruleId: -1,
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

export type basicRuleType = {
    created_at: string | null;
    name: string;
    projectId: number;
    ruleId: number;
    description: string | null;
    jsonBody: string;
}

export type createRuleType = {
    projectId: number;
    ruleId?: number;
    description: string | null;
    jsonBody: string;
    name: string;
}




