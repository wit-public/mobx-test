import * as React from "react";
import {ObjType, createType} from "../api/ObjType";
import * as Bluebird from "bluebird";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import FormEvent = React.FormEvent;
import {AModal, AForm, AFormItem, AInput} from "./antdWrap/AntdWrap";


export interface TypeCreateProps extends ClassAttributes<TypeCreate> {
    onCreate: (type: ObjType) => Bluebird<void>;
    onCancel: () => void;
    visible: boolean;
}

export interface TypeCreateState {
    name?: string;
    ident?: string;
    loading?: boolean;
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

    private onNameChange = (ev: FormEvent<HTMLInputElement>) => {
        const name = ev.currentTarget.value;
        this.setState({name});
    }

    private onIdentChange = (ev: FormEvent<HTMLInputElement>) => {
        const ident = ev.currentTarget.value;
        this.setState({ident});
    }

    private onCreate = () => {
        const {ident, name} = this.state;
        const {onCreate} = this.props;
        if (!name || !ident || !onCreate) {
            return;
        }
        onCreate(createType(name, ident, []))
            .then(() => this.clearState())
    }

    public render() {
        const {visible} = this.props;
        if (!visible) {
            return null;
        }
        const {ident, name} = this.state;
        return <AModal title="Новый тип"
                       visible={visible}
                       onOk={this.onCreate}
                       onCancel={this.props.onCancel}
                       okText="OK"
                       cancelText="Отмена"
                       confirmLoading={this.state.loading}>
            <AForm vertical>
                <AFormItem wrapperCol={{offset:6,span:12}}>
                    <AInput value={name}
                            onChange={this.onNameChange}
                            placeholder="Наименование"/>
                </AFormItem>
                <AFormItem wrapperCol={{offset:6,span:12}}>
                    <AInput type="text"
                            className="form-control"
                            value={ident}
                            onChange={this.onIdentChange}
                            placeholder="Идент"/>
                </AFormItem>
            </AForm>
        </AModal>;
    }
}