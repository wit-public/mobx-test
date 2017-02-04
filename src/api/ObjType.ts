import {IdNameIdent} from "../utils";
import {ObjAttr} from "./ObjAttr";
import * as shortid from "shortid";


export interface ObjType extends IdNameIdent {
    attrs: Array<ObjAttr>;
}

export type ObjTypes = Array<ObjType>;

export function createType(name: string, ident: string, attrs: Array<ObjAttr> = []): ObjType {
    const uuid = shortid.generate();
    return {uuid, ident, name, attrs};
}