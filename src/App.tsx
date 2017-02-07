import "./App.less";
import * as React from "react";
import {Layout, Tabs, Modal} from "antd";
import {TypesList} from "./components/TypesList";
import {TypeAttrs} from "./components/typeattrs";
import * as Bluebird from "bluebird";
import {MobxTest} from "./components/mobx/MobxTest";
import {Obj, TestObj} from "./components/mobx/Obj";
import {Provider} from "mobx-react";
import {OpenModal} from "./components/openmodal";
import Component = React.Component;
const confirm = Modal.confirm;

// import Button from "antd/lib/button/button";
// const Button = require("antd/lib/button")

const TabPane = Tabs.TabPane;
const {Header, Content, Footer, Sider} = Layout;

export interface AppState {
    selectedTypeId?: string;
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

    private onTypeSelect = (selectedTypeId: string) => {
        return new Bluebird<boolean>(res => {
            confirm({
                title: 'Изменения будут потеряны',
                content: 'Прдолжить?',
                onOk: () => {
                    res(true);
                    this.setState({selectedTypeId});
                },
                onCancel() {
                    res(false);
                },
                okText: "Продожить",
                cancelText: "Отмена"
            });

        })
    }

    render() {
        const {selectedTypeId} = this.state;
        return <Provider obj={obj}>
            <Layout style={{height:"100%"}}>
                <Header className="header">Header</Header>
                <Layout style={{height:"100%"}}>
                    <Sider width={400} style={{ background: '#fff' }}>
                        <TypesList onTypeSelect={this.onTypeSelect}/>
                    </Sider>
                    <Content style={{height:"100%"}}>
                        <Tabs defaultActiveKey="1" style={{height:"100%"}}>
                            <TabPane tab="Атрибуты" key="1" style={{height:"100%"}}>
                                <MobxTest showAlert={() => alert("123")}/>
                                <h1>asdasdasdasdsad</h1>
                                <MobxTest showAlert={() => alert("321")}/>
                            </TabPane>
                            <TabPane tab="Tab 2" key="2">
                                <TypeAttrs typeId={selectedTypeId}/>
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                <OpenModal/>
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        </Provider> ;
    }
}