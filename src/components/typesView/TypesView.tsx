import * as React from "react";
import {ALayout, ASider, AContent, AModal, AConfirm} from "../antdWrap/AntdWrap";
import {TypesList} from "../TypesList";
import {TypeAttrs} from "../TypeAttrs";
import * as Bluebird from "bluebird";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface TypesViewProps extends ClassAttributes<TypesView> {

}

export interface TypesViewState {
    selectedTypeId?: string;
}

export class TypesView extends Component<TypesViewProps, TypesViewState> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    private onTypeSelect = (selectedTypeId: string) => {
        return new Bluebird<boolean>(res => {
            AConfirm({
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

    public render() {
        const {selectedTypeId} = this.state;
        return <ALayout style={{height:"100%"}}>
            <ASider width={400} style={{ background: '#fff' }}>
                <TypesList onTypeSelect={this.onTypeSelect}/>
            </ASider>
            <AContent style={{height:"100%"}}>
                <TypeAttrs typeId={selectedTypeId}/>
            </AContent>
        </ALayout>;
    }
}