import * as React from "react";
import {BigTable, BigTableRow} from "./BigTable";
import {LOCALE} from "../TableContants";
import {ALayout, AContent} from "../antdwrap/AntdWrap";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface BigTableTestProps extends ClassAttributes<BigTableTest> {
    columns: Array<any>;
    dataSource: Array<BigTableRow>;
}


export interface BigTableTestState {
}


export class BigTableTest extends Component<BigTableTestProps, BigTableTestState> {

    constructor(props) {
        super(props);
        this.state = {dataSource: []};
    }

    public render() {
        const {dataSource, columns} = this.props;
        return  <ALayout style={{height:"100%"}}>
            <AContent style={{height:"100%"}}>
                <BigTable columns={columns}
                          dataSource={dataSource}
                          locale={LOCALE}
                          pagination={false}/>
            </AContent>
        </ALayout>;
    }
}