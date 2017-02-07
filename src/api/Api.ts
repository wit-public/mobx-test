import {Store, getEmptyStore} from "./Store";
import {ObjType, ObjTypes, TYPE_TYPE_ID} from "./ObjType";
import {Obj, Objects} from "./Obj";
import {findById, addOrReplace} from "../utils";
import * as shortid from "shortid";
import * as Bluebird from "bluebird";


export const API_TIMEOUT = 2000;

export const LOCAL_STORAGE_FIELD = "OBJ_STORE";

export function timeoutPromise<T>(result: T, timeout = API_TIMEOUT): Bluebird<T> {
    return new Bluebird<T>(res => setTimeout(() => res(result), timeout))
}

export class Api {


    private static getStore() {
        const item = localStorage.getItem(LOCAL_STORAGE_FIELD);
        let store: Store;
        try {
            store = item && JSON.parse(item) || getEmptyStore();
        }
        catch (ignored) {
            store = getEmptyStore();
        }
        return store;
    }

    public static getTypes(store = this.getStore(), timeout = API_TIMEOUT): Bluebird<ObjTypes> {
        return timeoutPromise(store.objects.filter(obj =>
            obj.typeId === TYPE_TYPE_ID
        ) as ObjTypes, timeout);
    }

    public static getObjects(store = this.getStore(), timeout = API_TIMEOUT): Bluebird<Objects> {
        return timeoutPromise(store.objects, timeout);
    }

    public static getTypeById(id: string, timeout = API_TIMEOUT): Bluebird<ObjType> {
        return this.getObjects().then(objects => findById(objects, id) as ObjType);
    }

    public static getObjById(id: string, timeout = API_TIMEOUT): Bluebird<Obj> {
        return this.getObjects().then(objects => findById(objects, id));
    }

    private static save(store: Store) {
        localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(store));
    }

    public static saveObjects(newObjects: Objects): Bluebird<Objects> {
        const store = this.getStore();
        return this.getObjects(store).then(objects =>
            newObjects.map(obj => {
                obj.id = obj.id || shortid.generate();
                delete obj.uuid;
                addOrReplace(objects, obj);
                this.save(store);
                return obj;
            })
        );
    }

    public static saveTypes(newTypes: ObjTypes): Bluebird<ObjTypes> {
        const store = this.getStore();
        return this.getTypes(store).then(types =>
            newTypes.map(type => {
                type.id = type.id || shortid.generate();
                delete type.uuid;
                addOrReplace(types, type);
                this.save(store);
                return type;
            })
        )
    }
}

(window as any).api = Api;