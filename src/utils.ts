export type StringMap<T> = {[index: string]: T}

export type NumberMap<T> = {[index: number]: T}

export interface Id {
    id?: string;
    uuid?: string;
}

export interface IdName extends Id {
    name?: string;
}

export interface IdNameIdent extends IdName {
    ident?: string;
}

export function findById<T extends Id>(objects: Array<T>, id: string) {
    return objects.find(obj => obj.id === id);
}

export function findIndexById<T extends Id>(objects: Array<T>, id: string) {
    return objects.findIndex(obj => obj.id === id);
}

export function addOrReplace<T extends Id>(objects: Array<T>, obj: T) {
    const id = obj.id;
    const idx = findIndexById(objects, id);
    if (idx !== -1) {
        objects.splice(idx, 1, obj)
    }
    else {
        objects.push(obj);
    }
}

export class EnumEx {
    static getNamesAndValues<T extends number>(e: any) {
        return EnumEx.getNames(e).map(n => ({name: n, value: e[n] as T}));
    }

    static getNames(e: any) {
        return EnumEx.getObjValues(e).filter(v => typeof v === "string") as string[];
    }

    static getValues<T extends number>(e: any) {
        return EnumEx.getObjValues(e).filter(v => typeof v === "number") as T[];
    }

    private static getObjValues(e: any): (number | string)[] {

        return e && Object.keys(e).map(k => e[k]) || [];
    }
}