import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import * as React from "react";
import {ObjAttr, ObjAttrType, ObjAttrTypeName, createObjAttr} from "../api/ObjAttr";
import * as Bluebird from "bluebird";
import {EnumEx} from "../utils";
import {AModal, AForm, AFormItem, AInput, ASelect, AOption} from "./antdWrap/AntdWrap";
import FormEvent = React.FormEvent;

export interface CreateAttrModalProps extends ClassAttributes<CreateAttrModal> {
    visible?: boolean;
    onCreate: (attr: ObjAttr) => Bluebird<void>;
    onCancel: () => void;
}

export interface CreateAttrModalState {
    name?: string;
    ident?: string;
    type?: ObjAttrType;
    loading?: boolean;
}

export class CreateAttrModal extends Component<CreateAttrModalProps, CreateAttrModalState> {

    constructor(props) {
        super(props);
        this.state = this.getClearState();
    }

    private onNameChange = (ev: FormEvent<HTMLInputElement>) => {
        const name = ev.currentTarget.value;
        this.setState({name});
    }

    private onIdentChange = (ev: FormEvent<HTMLInputElement>) => {
        const ident = ev.currentTarget.value;
        this.setState({ident});
    }

    private getClearState(): CreateAttrModalState {
        return {
            name: "",
            ident: ""
        };
    }

    private clearState() {
        this.setState(this.getClearState());
    }

    private onTypeSelect = (value: string) => {
        const type: ObjAttrType = parseInt(value);
        this.setState({type});
    }

    private onCreate = () => {
        const {ident, name, type} = this.state;
        const {onCreate} = this.props;
        if (!name || !ident || !onCreate || !type) {
            return;
        }
        onCreate(createObjAttr(name, ident, type))
            .then(() => this.clearState())
    }

    public render() {
        const {visible} = this.props;
        if (!visible) {
            return null;
        }
        const {ident, name, loading} = this.state;
        return <AModal visible={visible}
                       title="Новый атрибут"
                       onOk={this.onCreate}
                       onCancel={this.props.onCancel}
                       okText="OK"
                       cancelText="Отмена"
                       confirmLoading={loading}>
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
                <AFormItem wrapperCol={{offset:6,span:12}}>
                    <ASelect onChange={this.onTypeSelect}>
                        {EnumEx.getValues<ObjAttrType>(ObjAttrType).map(type =>
                            <AOption key={type.toString()}
                                     value={type.toString()}>
                                {ObjAttrTypeName[type]}
                            </AOption>)}
                    </ASelect>
                </AFormItem>
            </AForm>
        </AModal>;
    }
}