import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import {ObjType} from "../api/ObjType";
import * as React from "react";
import {Menu} from "antd";

export interface TypeItemProps extends ClassAttributes<TypeItem> {
    type?: ObjType;
}

export interface TypeItemState {

}

export class TypeItem extends Component<TypeItemProps, TypeItemState> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    protected componentDidMount() {
    }

    protected componentWillUnmount() {
    }

    protected componentWillReceiveProps(props: TypeItemProps) {
    }

    public render() {
        const {type} = this.props;
        return  <Menu.Item key={this.props.key}>{type.name}</Menu.Item>;
    }
}