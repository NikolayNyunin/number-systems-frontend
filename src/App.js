import React from "react";
import { createSmartappDebugger, createAssistant } from "@sberdevices/assistant-client";
import "./App.css";
import { InputForm } from "./components/InputForm";
import { Result } from "./components/Result";
import { check_base, check_number, convert } from "./utils";


const initializeAssistant = (getState/*: any*/) => {
    if (process.env.NODE_ENV === "development") {
        return createSmartappDebugger({
            token: process.env.REACT_APP_TOKEN ?? "",
            initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
            getState,
        });
    }
    return createAssistant({ getState });
};


export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');

        this.state = { base1: '10', base2: '2', num1: '0', num2: null };

        this.assistant = initializeAssistant(() => this.getStateForAssistant() );
        this.assistant.on("data", (event/*: any*/) => {
            console.log(`assistant.on(data)`, event);
            const { action } = event;
            this.dispatchAssistantAction(action);
        });
        this.assistant.on("start", (event) => {
            console.log(`assistant.on(start)`, event);
        });
    }

    getStateForAssistant() {
        console.log('getStateForAssistant: this.state:', this.state);
        const state = {};  // TODO: generate state
        console.log('getStateForAssistant: state:', state);
        return state;
    }

    dispatchAssistantAction(action) {
        console.log('dispatchAssistantAction', action);
        if (action) {
            switch (action.type) {
                case 'calculate':
                    return this.calculate(action);

                default:
                    throw new Error();
            }
        }
    }

    calculate(action) {
        console.log('calculate', action);
        let { num1, base1, base2 } = action;
        this.setState({ num2: null });

        if (!check_base(base1)) {
            alert('Ошибка: некорректное основание первой системы счисления');
            return;
        }
        if (!check_base(base2)) {
            alert('Ошибка: некорректное основание второй системы счисления');
            return;
        }
        base1 = parseInt(base1);
        base2 = parseInt(base2);

        if (!check_number(num1, base1)) {
            alert(`Ошибка: некорректное число для системы счисления ${ base1 }`);
            return;
        }
        const new_num2 = convert(num1, base1, base2);
        this.setState({ num2: new_num2 });
    }

    render() {
        console.log('render');
        return (
            <main>
                <InputForm
                    number = { this.state.num1 }
                    onNumberChange = {(new_num1) => this.setState({ num1: new_num1 })}
                    base1 = { this.state.base1 }
                    onBase1Change = {(new_base1) => this.setState({ base1: new_base1 })}
                    base2 = { this.state.base2 }
                    onBase2Change = {(new_base2) => this.setState({ base2: new_base2 })}
                    onSubmit = {() => this.calculate({
                        type: "calculate",
                        num1: this.state.num1,
                        base1: this.state.base1,
                        base2: this.state.base2
                    })}
                />
                <br/>
                <Result result={ this.state.num2 } />
            </main>
        );
    }
}
