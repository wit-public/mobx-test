import {StringMap} from "../../utils";
import {observable, ObservableMap, action} from "mobx/lib/mobx";
export interface Obj {
    values: StringMap<Field>;
    changed?: boolean;
}

export interface Field {
    value?: ValueType;
}

type ValueType= number|string;

export class TestObj {
    constructor(obj: Obj) {
        this.values = observable.map(obj.values);
    };

    @observable
    changed: boolean;

    @observable
    values: ObservableMap<Field>;

    private i = 1;

    @action
    addMapField() {
        this.values.set(`i${this.i}`, {value: this.i});
        this.i++;
    }

    @action
    addNullField() {
        this.values.set(`i${this.i}`, {});
        this.i++;
    }

    @action
    incField(field: string) {
        let value = this.values.get(field).value as number || 0;
        value = value + 1;
        this.values.set(field, {value});
    }
}