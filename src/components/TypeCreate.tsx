import * as React from "react";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import {ObjType, createType} from "../api/ObjType";
import * as Bluebird from "bluebird";
import FormEvent = React.FormEvent;

export interface TypeCreateProps extends ClassAttributes<TypeCreate> {
    onCreate: (type: ObjType) => Bluebird<void>;
}

export interface TypeCreateState {
    name?: string;
    ident?: string;
}

export class TypeCreate extends Component<TypeCreateProps, TypeCreateState> {

    constructor(props) {
        super(props);
        this.state = this.getClearState();
    }

    private getClearState(): TypeCreateState {
        return {
            name: "",
            ident: ""
        };
    }

    private clearState() {
        this.setState(this.getClearState());
    }

    protected componentDidMount() {
    }

    protected componentWillUnmount() {
    }

    protected componentWillReceiveProps(props: TypeCreateProps) {
    }

    private onNameChange = (ev: FormEvent<HTMLInputElement>) => {
        const name = ev.currentTarget.value;
        this.setState({name});
    }

    private onIdentChange = (ev: FormEvent<HTMLInputElement>) => {
        const ident = ev.currentTarget.value;
        this.setState({ident});
    }

    private onCreateClick = () => {
        const {ident, name} = this.state;
        const {onCreate} = this.props;
        if (!name || !ident || !onCreate) {
            return;
        }
        onCreate(createType(name, ident))
            .then(() => this.clearState())
    }

    public render() {
        const {ident, name} = this.state;
        return <div className="form-horizontal">
            <div className="form-group">
                <input type="text"
                       className="form-control"
                       value={name}
                       onChange={this.onNameChange}
                       placeholder="Наименование"/>
            </div>
            <div className="form-group">
                <input type="text"
                       className="form-control"
                       value={ident}
                       onChange={this.onIdentChange}
                       placeholder="Идент"/>
            </div>
            <div className="form-group">
                <button onClick={this.onCreateClick}>
                    Создать тип
                </button>
            </div>
        </div>;
    }
}