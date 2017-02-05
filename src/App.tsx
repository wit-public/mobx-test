import "./App.less";
import * as React from "react";
import {Layout, Tabs} from "antd";
import {TypesList} from "./components/TypesList";
import Component = React.Component;

// import Button from "antd/lib/button/button";
// const Button = require("antd/lib/button")

const TabPane = Tabs.TabPane;
const {Header, Content, Footer, Sider} = Layout;
export interface AppState {
    menuOpen?: boolean;
}

export interface AppProps {

}


export class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <Layout style={{height:"100%"}}>
            <Header className="header">Header</Header>
            <Layout style={{height:"100%"}}>
                <Sider width={400} style={{ background: '#fff' }}>
                    <TypesList/>
                </Sider>
                <Content style={{height:"100%"}}>
                    <Tabs defaultActiveKey="1" style={{height:"100%"}}>
                        <TabPane tab="Tab 1" key="1" style={{height:"100%",padding:45}}>
                            <TypesList/>
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Content>
            </Layout>
        </Layout>;
    }
}