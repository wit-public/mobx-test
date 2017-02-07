import {TYPE_TYPE_ID} from "./ObjType";
import {Objects, OBJ_TYPE_ID} from "./Obj";
import {OBJ_ATTR_TYPE_ID} from "./ObjAttr";


export interface Store {
    // types: ObjTypes;
    objects: Objects;
}

export function getEmptyStore(): Store {
    return {
        // types: [],
        objects: [
            {
                id: TYPE_TYPE_ID,
                name: "Тип объекта",
                ident: "OBJ_TYPE",
                fields: {},
                typeId: TYPE_TYPE_ID
            },
            {
                id: OBJ_TYPE_ID,
                name: "Объект",
                ident: "OBJECT",
                fields: {},
                typeId: "1"
            },
            {
                id: OBJ_ATTR_TYPE_ID,
                name: "Атрибут объекта",
                ident: "OBJ_ATTR",
                fields: {},
                typeId: "1"
            }
        ]
    }
}

