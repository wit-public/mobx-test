import "./App.less";
import * as React from "react";
import {MobxTest} from "./components/mobx/MobxTest";
import {Obj, TestObj} from "./components/mobx/Obj";
import {Provider} from "mobx-react";
import {OpenModal} from "./components/openmodal";
import {BigTableTest} from "./components/bigTable/BigTableTest";
import {columns, rows} from "./components/bigTable/data";
import {ALayout, ATabs, AHeader, AContent, ATabPane} from "./components/antdWrap/AntdWrap";
import {TypesView} from "./components/typesView/TypesView";
import Component = React.Component;

export interface AppState {

}

export interface AppProps {

}

const o1: Obj = {
    values: {
        id: {value: 1},
        name: {value: "123"}
    }
};


const obj = new TestObj(o1);


export class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <Provider obj={obj}>
            <ALayout style={{height:"100%"}}>
                <AHeader className="header">Header</AHeader>
                <ALayout style={{height:"100%"}}>
                    <AContent style={{height:"100%"}}>
                        <ATabs defaultActiveKey="1" style={{height:"100%"}}>
                            <ATabPane tab="Big hier table test" key="1">
                                <TypesView/>
                            </ATabPane>
                            <ATabPane tab="Mobx test" key="2">
                                <MobxTest showAlert={() => alert("123")}/>
                            </ATabPane>
                            <ATabPane tab="Nested Modals test" key="3">
                                <OpenModal/>
                            </ATabPane>
                            <ATabPane tab="Big hier table test" key="4">
                                <BigTableTest columns={columns} dataSource={rows}/>
                            </ATabPane>

                        </ATabs>
                    </AContent>
                </ALayout>
            </ALayout>
        </Provider> ;
    }
}