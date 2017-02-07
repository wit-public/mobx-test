import {Api} from "../api/Api";
import {TypeCreate} from "./TypeCreate";
import * as React from "react";
import * as Bluebird from "bluebird";
import {Menu, Button, Layout} from "antd";
import {SelectParam} from "antd/lib/menu";
import {ObjTypes, createType, ObjType} from "../api/ObjType";
const {Header, Content, Footer, Sider} = Layout;
import ClassAttributes = React.ClassAttributes;
import Component = React.Component;


export interface TypesListProps extends ClassAttributes<TypesList> {
    onTypeSelect: (typeId: string) => Bluebird<boolean>;
}

export interface TypesListState {
    loading?: boolean;
    types?: ObjTypes;
    changes?: ObjTypes;
    addModalOpen?: boolean;
    selectedType?: Array<string>;
    saveLoading?: boolean;
}

export class TypesList extends Component<TypesListProps, TypesListState> {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            types: [],
            selectedType: []
        };
    }

    protected componentDidMount() {
        this.update();
    }

    private update() {
        this.setState({loading: true, types: []});
        Api.getTypes().then(types =>
            this.setState({
                types,
                loading: false,
                changes: []
            })
        )

    }

    private save() {
        this.setState({saveLoading: true});
        Api.saveTypes(this.state.changes)
            .then(() => {
                this.setState({saveLoading: false});
                this.update()
            })
    }

    private onRefreshClick = () => this.update();

    private onSaveClick = () => this.save();

    private onAddClick = () => {
        this.setState({addModalOpen: true})
    }

    private closeModal = () => {
        this.setState({addModalOpen: false});
    }

    private onRandomClick = () => {
        for (let i = 1; i <= 100; i++) {
            const type = createType(`type${i}`, `type${i}`, []);
            this.addType(type);
        }
    }

    private getButtons() {
        const {loading, saveLoading} = this.state;
        return <div>
            <Button size="large"
                    onClick={this.onRefreshClick}
                    icon={loading && "loading" || "reload"}
                    disabled={loading||saveLoading}/>
            <Button size="large"
                    onClick={this.onAddClick}
                    icon="plus"
                    disabled={loading||saveLoading}/>
            <Button size="large"
                    onClick={this.onSaveClick}
                    icon={saveLoading && "loading" || "save"}
                    disabled={loading || saveLoading}/>
            <Button size="large"
                    onClick={this.onRandomClick}
                    disabled={loading || saveLoading}>
                Random
            </Button>
        </div>
    }

    private onSelectType = (param: SelectParam) => {
        let promise = Bluebird.resolve(true);
        if (this.props.onTypeSelect) {
            promise = this.props.onTypeSelect(param.selectedKeys[0])
        }
        promise.then(confirm => confirm && this.setState({selectedType: param.selectedKeys}));
    }

    public getContent() {
        const {types, selectedType} = this.state;
        return<Menu mode="inline"
                    selectedKeys={selectedType}
                    style={{ minHeight: '100%' }}
                    onSelect={this.onSelectType}>
            {types.map(type => <Menu.Item key={type.id || type.uuid}>{type.name}</Menu.Item>)}
        </Menu>;
    }

    private onTypeCreate = (type: ObjType) => {
        return new Bluebird<void>(res => {
            this.addType(type, res);
        });
    }

    private addType(type: ObjType, res?: () => void) {
        const {types, changes} = this.state;
        types.push(type);
        changes.push(type);
        this.setState({types, changes, addModalOpen: false}, res);
    }

    private getAddControl() {
        return <TypeCreate visible={this.state.addModalOpen}
                           onCreate={this.onTypeCreate}
                           onCancel={this.closeModal}/>
    }

    public render() {
        return <Layout style={{height: "100%"}}>
            <Header style={{paddingLeft:10, background:"#fff",    borderRight: "1px solid #e9e9e9"}}>
                {this.getButtons()}
            </Header>
            <Layout style={{height: "100%"}}>
                <Content style={{height: "100%"}}>
                    {this.getContent()}
                    {this.getAddControl()}
                </Content>
            </Layout>
        </Layout >;
    }
}