import {StringMap, IdNameIdent} from "../utils";

export type ObjFieldValue = string|number;


export interface Obj extends IdNameIdent {
    fields?: StringMap<ObjFieldValue>;
}

export type Objects = Array<Obj>;
