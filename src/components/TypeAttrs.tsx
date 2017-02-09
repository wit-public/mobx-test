import * as React from "react";
import {ObjAttrTypeName} from "../api/ObjAttr";
import {ObjType} from "../api/ObjType";
import {Api} from "../api/Api";
import {TypeAttrsTable} from "./TypeAttrsTable";
import {LOCALE} from "./tablecontants";
import {CreateAttrModal} from "./CreateAttrModal";
import * as Bluebird from "bluebird";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import {AButton, ALayout, AHeader, AContent} from "./antdWrap/AntdWrap";


export interface TypeAttrsProps extends ClassAttributes<TypeAttrs> {
    typeId: string;
}

export interface TypeAttrsState {
    loading?: boolean;
    type?: ObjType;
    createModalVisible?: boolean;
    saveLoading?: boolean;
}

export class TypeAttrs extends Component<TypeAttrsProps, TypeAttrsState> {

    private columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: 'uuid',
        dataIndex: 'uuid',
        key: 'uuid'
    }, {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Тип',
        dataIndex: 'type',
        key: 'address',
        render: type => ObjAttrTypeName[type]
    }];

    constructor(props) {
        super(props);
        this.state = {};
    }

    protected componentDidMount() {
        this.update()
    }

    private update(typeId: string = this.props.typeId) {
        if (!typeId) {
            this.setState({type: null});
            return;
        }
        this.setState({loading: true});
        Api.getTypeById(typeId).then(type =>
            this.setState({loading: false, type})
        );
    }

    protected componentWillReceiveProps(props: TypeAttrsProps) {
        if (props.typeId !== this.props.typeId && (this.props.typeId || props.typeId)) {
            this.update(props.typeId);
        }
    }

    private closeModal = () => {
        this.setState({createModalVisible: false});
    }

    private saveAttr = () => {
        this.setState({createModalVisible: false});
        return Bluebird.resolve();
    }

    private onRefreshClick = () => this.update();

    private onSaveClick = () => {
    };

    private onAddClick = () => {
        this.setState({createModalVisible: true})
    }

    private getButtons() {
        const {loading, saveLoading} = this.state;
        return <div>
            <AButton size="large"
                     onClick={this.onRefreshClick}
                     icon={loading && "loading" || "reload"}
                     disabled={loading||saveLoading}/>
            <AButton size="large"
                     onClick={this.onAddClick}
                     icon="plus"
                     disabled={loading||saveLoading}/>
            <AButton size="large"
                     onClick={this.onSaveClick}
                     icon={saveLoading && "loading" || "save"}
                     disabled={loading || saveLoading}/>
        </div>
    }

    public render() {
        const {type, loading, createModalVisible}= this.state;
        const dataSource = type && type.values.TYPE_ATTRS || [];
        return <ALayout>
            <AHeader>{this.getButtons()}</AHeader>
            <AContent>
                <TypeAttrsTable loading={loading}
                                columns={this.columns}
                                dataSource={dataSource}
                                locale={LOCALE}/>
                <CreateAttrModal visible={createModalVisible}
                                 onCancel={this.closeModal}
                                 onCreate={this.saveAttr}/>
            </AContent>
        </ALayout>;
    }
}