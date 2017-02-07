import {StringMap, IdNameIdent} from "../utils";
import {ObjAttr} from "./ObjAttr";
import * as shortid from "shortid";

export type ObjFieldValue = string|number| Array<ObjAttr> | Array<Obj>;

export const OBJ_TYPE_ID = "3";

export interface Obj extends IdNameIdent {
    typeId: string;
    fields: ObjFields;
}

export type Objects = Array<Obj>;

export interface ObjFields extends StringMap<ObjFieldValue> {
}


export function createObj(name: string, ident: string, typeId: string, fields: ObjFields): Obj {
    const uuid = shortid.generate();
    return {uuid, ident, name, fields, typeId};
}