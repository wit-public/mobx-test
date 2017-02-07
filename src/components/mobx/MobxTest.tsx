import * as React from "react";
import {extendObservable} from "mobx";
import {observer} from "mobx-react";
import {TestObj} from "./obj";
import DevTools from "mobx-react-devtools";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;


export interface MobxTestProps extends ClassAttributes<MobxTest> {
    obj?: TestObj;
    showAlert?: () => void;
}

@observer(["obj"])
export class MobxTest extends Component<MobxTestProps, {}> {

    private onClick = () => {
        this.props.obj.addNullField();
    }

    private onClick2 = () => {
        this.props.obj.addMapField();
    }

    private onClick3 = () => {
        extendObservable(this.props.obj, {changed: !this.props.obj.changed});
    }

    public render() {
        const obj = this.props.obj;
        return <div>
            <DevTools />
            <div>
                {obj.values.keys().map(key => {
                        return <FieldValue key={key} field={key} obj={this.props.obj}/>
                    }
                )}
            </div>
            <br/>
            <IsChanged obj={obj}/>
            <br/>
            <button onClick={this.onClick}>add null</button>
            <button onClick={this.onClick2}>add field</button>
            <button onClick={this.onClick3}>toggle changed</button>
            <button onClick={this.props.showAlert}>show alert</button>
        </div>;
    }
}

export const IsChanged = observer<{obj: TestObj}>((props) => {
    return <span>changed : {props.obj.changed && "true" || "false"}</span>
})

export interface FieldValueProps {
    obj: TestObj;
    field: string;
}

export const FieldValue = observer<FieldValueProps>((props: FieldValueProps) => {
    const {field, obj} = props;
    return <div>
        {field}: {obj.values.get(field).value}
        <button onClick={() => obj.incField(field)}> incr</button>
    </div>
})



