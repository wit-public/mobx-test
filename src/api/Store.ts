import {TYPE_TYPE_ID, getTypeObj} from "./ObjType";
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
                values: {
                    ID: TYPE_TYPE_ID,
                    NAME: "Тип объекта",
                    IDENT: "OBJ_TYPE",
                    TYPE_ID: getTypeObj()
                }
            },
            {
                values: {
                    ID: OBJ_TYPE_ID,
                    NAME: "Объект",
                    IDENT: "OBJECT",
                    TYPE_ID: getTypeObj()
                }
            },
            {
                values: {
                    ID: OBJ_ATTR_TYPE_ID,
                    NAME: "Атрибут объекта",
                    IDENT: "OBJ_ATTR",
                    TYPE_ID: getTypeObj()
                }
            }
        ]
    }
}

