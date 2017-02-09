import {observable} from "mobx";
import ComponentClass = React.ComponentClass;


export class ModallStore {
    @observable
    modals: Array<StoreModal> [];
}

export class StoreModal {
    content: ComponentClass<any>;
}