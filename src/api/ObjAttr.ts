import {Obj, createObj, ObjFields} from "./Obj";
import {idNameToObj} from "./utils";

export const OBJ_ATTR_TYPE_ID = "2";
export const OBJ_ATTR_TYPE_NAME = "Атрибут";

export enum ObjAttrType {
    String,
    Number
}

export const ObjAttrTypeName = {
    [ObjAttrType.String]: "Строка",
    [ObjAttrType.Number]: "Число"
}

export interface ObjAttr extends Obj {
    values: ObjAttrField;
}


export interface ObjAttrField extends ObjFields {
    ATTR_TYPE: ObjAttrType;
    TYPE_ID: {
        values: {ID: "2"}
    };
}

export type ObjAttrs = Array<ObjAttr>;

export function createObjAttr(name: string, ident: string, type: ObjAttrType): ObjAttr {
    const attr = createObj(name, ident, idNameToObj(OBJ_ATTR_TYPE_ID, OBJ_ATTR_TYPE_NAME)) as ObjAttr;
    attr.values.ATTR_TYPE = type;
    return attr;
}
