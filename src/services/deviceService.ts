import { db } from './sqlLiteService';
import { eq } from 'drizzle-orm';
import { devices } from '../constants/dbSchema';
import { basicDeviceType, createDeviceType } from '../constants/defaults';

const addDevice = async (device:createDeviceType) => {
    const { name, type, description, configuration } = device;
    const values ={
        name,
        type,
        description,
        configuration,
    };
    return await db.insert(devices).values(values);
}

const getDevice = async (deviceId:number) => {
    return await db.select().from(devices).where(eq(devices.deviceId, deviceId));
}

const getDevicesByType = async (type:string, limit:number) => {
    return await db.select().from(devices).where(eq(devices.type, type)).limit(limit);
}

const getAllDevices = async (limit:number) => {
    return await db.select().from(devices).limit(limit);
}

const updateDevice = async (device:basicDeviceType) => {
    const { deviceId } = device;
    return await db.update(devices)
        .set(device)
        .where(eq(devices.deviceId, deviceId))
        .returning();
}

const deleteDevice = async (deviceId:number) => {
    return await db.delete(devices)
        .where(eq(devices.deviceId, deviceId))
        .returning();
}

const deviceData = { 
    addDevice,
    deleteDevice,
    getDevice,
    getDevicesByType,
    getAllDevices,
    updateDevice
 }

export { deviceData }
