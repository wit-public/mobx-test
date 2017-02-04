import "./App.less";
import * as React from "react";
import {Button, Layout} from "antd";
import Component = React.Component;
const {Header, Content, Footer, Sider} = Layout;
// import Button from "antd/lib/button/button";
// const Button = require("antd/lib/button")


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
                <Sider width={200} style={{ background: '#fff' }}> sider</Sider>
                <Content style={{height:"100%"}}>
                    <div style={{ background: '#fff', padding: 24, height:"100%"}}>
                        Content
                        <Button type="primary">
                            Loadingasdasd
                        </Button>
                    </div>
                </Content>
            </Layout>
        </Layout>;
    }
}