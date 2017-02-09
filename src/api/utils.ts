import {Obj, TYPE_ID, ObjFieldValue, ID} from "./Obj";

export const getAttrValue = (obj: Obj, field: string) => {
    return obj && obj.values && obj.values[field] || undefined;
}

export const getObjId = (obj: Obj) => {
    return obj && obj.values && obj.values.ID || undefined;
}

export const getObjName = (obj: Obj) => {
    return obj && obj.values && obj.values.NAME || undefined;
}

export const getObjKey = (obj: Obj) => {
    return obj && obj.values && (obj.values.ID || obj.values.UUID ) || undefined;
}


export const setAttrValue = (obj: Obj, field: string, value: ObjFieldValue) => {
    obj.values = obj.values || {};
    obj.values[field] = value;
    return obj;
}

export const setObjId = (obj: Obj, id: string) => {
    return setAttrValue(obj, ID, id);
}

export const getObjTypeId = (obj: Obj) => {
    return getObjId(getAttrValue(obj, TYPE_ID) as Obj);
}

export const idNameToObj = (id: string, name: string) => {
    return {
        values: {
            ID: id,
            NAME: name
        }
    }  as Obj;
}