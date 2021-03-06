import * as React from "react";
import {If} from "./utils/If";
import {AModal} from "./antdwrap/antdwrap";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface OpenModalProps extends ClassAttributes<OpenModal> {

}

export interface OpenModalState {
    modalVisisble?: boolean;

}

export class OpenModal extends Component<OpenModalProps, OpenModalState> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    protected componentDidMount() {
    }

    protected componentWillUnmount() {
    }

    protected componentWillReceiveProps(props: OpenModalProps) {
    }

    public render() {
        const modalVisisble = this.state.modalVisisble;
        return <div>
            <button onClick={() => this.setState({modalVisisble:true})}>
                open Modal
            </button>
            <If cond={modalVisisble}>
                <AModal visible={modalVisisble}
                        onCancel={() => this.setState({modalVisisble:false})}>
                    <OpenModal/>
                </AModal>
            </If>
        </div>;
    }
}