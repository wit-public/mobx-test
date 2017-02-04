import {Api} from "../api/Api";
import {ObjTypes, ObjType} from "../api/ObjType";
import {TypeCreate} from "./TypeCreate";
import * as React from "React";
import * as Bluebird from "bluebird";
import {Menu} from "antd/lib";
import {TypeItem} from "./TypeItem";
import ClassAttributes = React.ClassAttributes;
import Component = React.Component;


export interface TypesListProps extends ClassAttributes<TypesList> {

}

export interface TypesListState {
    loading?: boolean;
    types?: ObjTypes;
    changes?: ObjTypes;
}

export class TypesList extends Component<TypesListProps, TypesListState> {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            types: []
        };
    }

    protected componentDidMount() {
        this.update();
    }

    private update() {
        this.setState({loading: true});
        Api.getTypes().then(types =>
            this.setState({
                types,
                loading: false,
                changes: []
            })
        )

    }

    private save() {
        Api.saveTypes(this.state.changes)
            .then(() => this.update())
    }

    protected componentWillUnmount() {
    }

    protected componentWillReceiveProps(props: TypesListProps) {
    }

    private onRefreshClick = () => this.update();

    private onSaveClick = () => this.save();

    private getButtons() {
        return [<button onClick={this.onRefreshClick}>Обновить</button>,
            <button onClick={this.onSaveClick}>Сохранить</button>]
    }

    public getContent() {
        const {loading, types} = this.state;
        if (loading) {
            return <div>Загрузка</div>
        }
        if (!types.length) {
            return <div>Нет данных</div>
        }
        return <Menu mode="inline"
                     defaultSelectedKeys={['1']} style={{ height: '100%' }}>
            {types.map(type => <TypeItem key={type.id || type.uuid} type={type}/>)}
        </Menu>;
    }

    private onTypeCreate = (type: ObjType) => {
        const {types, changes} = this.state;
        types.push(type);
        changes.push(type);
        this.setState({types, changes});
        return Bluebird.resolve();
    }

    private getAddControl() {
        return <TypeCreate onCreate={this.onTypeCreate}/>
    }

    public render() {
        return <aside>
            {this.getButtons()}
            <br/>
            {this.getContent()}
            <br/>
            {this.getAddControl()}
        </aside>
    }
}