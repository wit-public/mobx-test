import {ObjTypes} from "./ObjType";
import {Objects} from "./Obj";


export interface Store {
    types: ObjTypes;
    objects: Objects;
}

export function getEmptyStore(): Store {
    return {
        types: [],
        objects: []
    }
}

