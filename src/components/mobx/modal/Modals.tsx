import * as React from "react";
import {ModallStore} from "./ModalsStore";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import {observer} from "mobx-react";

export interface ModalsProps extends ClassAttributes<Modals> {
    store?: ModallStore;
}

export interface ModalsState {

}

@observer
export class Modals extends Component<ModalsProps, ModalsState> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    protected componentDidMount() {
    }

    protected componentWillUnmount() {
    }

    protected componentWillReceiveProps(props: ModalsProps) {
    }

    public render() {
        return <div></div>;
    }
}