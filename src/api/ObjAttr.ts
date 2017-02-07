import {Obj, createObj} from "./Obj";

export const OBJ_ATTR_TYPE_ID = "2";

export enum ObjAttrType {
    String,
    Number
}

export const ObjAttrTypeName = {
    [ObjAttrType.String]: "Строка",
    [ObjAttrType.Number]: "Число"
}

export interface ObjAttr extends Obj {
    type: ObjAttrType;
    isRequired?: boolean;
    typeId: "2";
}


export type ObjAttrs = Array<ObjAttr>;

export function createObjAttr(name: string, ident: string, type: ObjAttrType): ObjAttr {
    const attr = createObj(name, ident, OBJ_ATTR_TYPE_ID, {}) as ObjAttr;
    attr.type=type;
    return attr;
}
