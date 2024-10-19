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

export const defaultDevice = {
    deviceId: -1,
    name: '',
    type: '',
    description: '',
    configuration: '{}',
    created_at: new Date().toString()
};


export type createProjectType = {
    projectId?: number;
    description: string | null;
    is_template: number;
    name: string;
}

export type basicProjectType = createProjectType & {
    projectId: number;
    created_at: string | null;
}

export type createRuleType = {
    projectId?: number;
    ruleId?: number;
    name: string;
    description: string | null;
    jsonBody: string;
}

export type basicRuleType = createRuleType & {
    projectId: number;
    ruleId: number;
    created_at: string | null;
}

export type createDeviceType = {
    deviceId?: number;
    name: string;
    type: string;
    description: string | null;
    configuration: string;
}

export type basicDeviceType = createDeviceType & {
    deviceId: number;
    created_at: string | null;
}

