import * as React from "react";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import {ATable} from "../antdWrap/AntdWrap";

export interface BigTableRow {
    [index: string]: any;
    id: string;
    children?: Array<BigTableRow>;
}

export class BigTable extends ATable<BigTableRow> {

}