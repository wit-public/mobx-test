import {ObjAttrs} from "./ObjAttr";
import {Obj, createObj, ObjFields} from "./Obj";
import {idNameToObj} from "./utils";

export const TYPE_TYPE_ID = "1";
export const TYPE_TYPE_NAME = "Тип объекта";

export const getTypeObj = () => idNameToObj(TYPE_TYPE_ID, TYPE_TYPE_NAME)
export const TYPE_ATTRS = "TYPE_ATTRS";

export interface ObjType extends Obj {
    values: ObjTypeFields;
}


export interface ObjTypeFields extends ObjFields {
    TYPE_ATTRS?: ObjAttrs;
    TYPE_ID: {
        values: {
            ID: "1"
        }
    };
}

export type ObjTypes = Array<ObjType>;

export function createType(name: string, ident: string, attrs: ObjAttrs): ObjType {
    const obj = createObj(name, ident, idNameToObj(TYPE_TYPE_ID, TYPE_TYPE_NAME)) as ObjType;
    obj.values.TYPE_ATTRS = attrs;
    return obj;
}