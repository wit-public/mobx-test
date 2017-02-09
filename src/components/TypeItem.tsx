import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import {ObjType} from "../api/ObjType";
import * as React from "react";
import {AMenuItem} from "./antdWrap/AntdWrap";

export interface TypeItemProps extends ClassAttributes<TypeItem> {
    type?: ObjType;
}

export interface TypeItemState {

}

export class TypeItem extends Component<TypeItemProps, TypeItemState> {

    public render() {
        const {type} = this.props;
        return  <AMenuItem key={this.props.key}>{type.values.NAME}</AMenuItem>;
    }
}