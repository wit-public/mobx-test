import {IdNameIdent} from "../utils";

export enum ObjAttrType {
    String,
    Number
}

export interface ObjAttr extends IdNameIdent {
    type: ObjAttrType;
}
