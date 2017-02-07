import {ObjAttrs} from "./ObjAttr";
import {Obj, createObj} from "./Obj";

export const TYPE_TYPE_ID = "1";

export interface ObjType extends Obj {
    attrs: ObjAttrs;
    typeId: "1";
}

export type ObjTypes = Array<ObjType>;

export function createType(name: string, ident: string, attrs: ObjAttrs): ObjType {
    const obj = createObj(name, ident, TYPE_TYPE_ID, {}) as ObjType;
    obj.attrs = attrs;
    return obj;
}