import {StringMap} from "../utils";
import {ObjAttr} from "./ObjAttr";
import * as shortid from "shortid";

export type ObjFieldValue = string|number| Array<ObjAttr> | Array<Obj> | Obj;

export const OBJ_TYPE_ID = "3";
export const ID = "ID";


export const NAME = "NAME";
export const IDENT = "IDENT";
export const UUID = "UUID";
export const TYPE_ID = "TYPE_ID";

export interface Obj {
    values: ObjFields;
}

export type Objects = Array<Obj>;

export interface ObjFields extends StringMap<ObjFieldValue> {
    UUID?: string;
    ID?: string;
    NAME?: string;
    TYPE_ID?: Obj;
    IDENT?: string;
}


export function createObj(name: string, ident: string, type: Obj): Obj {
    const uuid = shortid.generate();
    return {
        values: {
            UUID: uuid,
            NAME: name,
            IDENT: ident,
            TYPE_ID: type
        }
    };
}