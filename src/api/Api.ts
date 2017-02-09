import {Store, getEmptyStore} from "./Store";
import {ObjType, ObjTypes, TYPE_TYPE_ID} from "./ObjType";
import {Obj, Objects} from "./Obj";
import {findById, addOrReplace} from "../utils";
import * as shortid from "shortid";
import * as Bluebird from "bluebird";
import {getObjTypeId, setObjId, getObjId} from "./utils";


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

    public static getTypes = (store = Api.getStore(), timeout = API_TIMEOUT): Bluebird<ObjTypes> => {
        return timeoutPromise(store.objects.filter(obj =>
            getObjTypeId(obj) === TYPE_TYPE_ID
        ) as ObjTypes, timeout);
    }

    public static getObjects = (store = Api.getStore(), timeout = API_TIMEOUT): Bluebird<Objects> => {
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
        return timeoutPromise(this.addToObjStore(newObjects));
    }

    private static addToObjStore<T extends Obj>(newObjects: Array<T>): Array<T> {
        const store = this.getStore();
        const result = newObjects.map(obj => {
            setObjId(obj, getObjId(obj) || shortid.generate());
            delete obj.values.uuid;
            addOrReplace(store.objects, obj);
            return obj;
        });
        this.save(store);
        return result;
    }

    public static saveTypes(newTypes: ObjTypes): Bluebird<ObjTypes> {
        return timeoutPromise(this.addToObjStore(newTypes));
    }
}

(window as any).api = Api;