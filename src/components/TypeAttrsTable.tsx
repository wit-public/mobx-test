import * as React from "react";
import {Table} from "antd";
import {ObjAttr} from "../api/ObjAttr";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface TypeAttrsTableProps extends ClassAttributes<TypeAttrsTable> {

}

export interface TypeAttrsTableState {

}

export class TypeAttrsTable extends Table<ObjAttr> {

}