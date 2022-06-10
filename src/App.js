import React from "react";
import { createSmartappDebugger, createAssistant } from "@sberdevices/assistant-client";
import "./App.css";
import { InputForm } from "./components/InputForm";
import { Alert } from "./components/Alert";
import { Result } from "./components/Result";
import { check_base, check_number, convert } from "./utils";
import styled from "styled-components";


// TODO: check insets
const Main = styled.main`
    padding-bottom: 200px;
`;


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

        this.state = { base1: '10', base2: '2', num1: '0', num2: null, error: null };

        this.assistant = initializeAssistant(() => this.getStateForAssistant());
        this.assistant.on("data", (event/*: any*/) => {
            console.log(`assistant.on(data)`, event);
            const { smart_app_data } = event;
            this.dispatchAssistantData(smart_app_data);
        });
        this.assistant.on("start", (event) => {
            console.log(`assistant.on(start)`, event);
        });
    }

    getStateForAssistant() {
        console.log('getStateForAssistant: state:', this.state);
        return this.state;
    }

    dispatchAssistantData(data) {
        console.log('dispatchAssistantData', data);
        if (data) {
            switch (data.type) {
                case 'calculate':
                    if (this.calculate(data))
                        return this.sendAction('success');
                    return this.sendAction('error');

                case 'reset':
                    return this.setState({ base1: '10', base2: '2', num1: '0', num2: null, error: null });

                default:
                    throw new Error();
            }
        }
    }

    sendAction(action) {
        this.assistant.sendData({ action: { action_id: action } });
    }

    calculate(data) {
        console.log('calculate', data);
        let { num1, base1, base2 } = data;
        this.setState({ num2: null, error: null });

        if (!check_base(base1)) {
            this.setState({ error: `Ошибка: некорректное основание СС - ${ base1 }` });
            return false;
        }
        if (!check_base(base2)) {
            this.setState({ error: `Ошибка: некорректное основание СС - ${ base2 }` });
            return false;
        }
        if (base1 !== this.state.base1)
            this.setState({ base1: base1 });
        if (base2 !== this.state.base2)
            this.setState({ base2: base2 });
        base1 = parseInt(base1);
        base2 = parseInt(base2);

        if (!check_number(num1, base1)) {
            this.setState({ error: `Ошибка: некорректное число для СС-${ base1 }: ${ num1 }` });
            return false;
        }
        if (num1 !== this.state.num1)
            this.setState({ num1: num1 });

        const new_num2 = convert(num1, base1, base2);
        this.setState({ num2: new_num2 });
        return true;
    }

    render() {
        console.log('render');
        return (
            <Main>
                <InputForm
                    number = { this.state.num1 }
                    onNumberChange = {(new_num1) => this.setState({ num1: new_num1, num2: null, error: null })}
                    base1 = { this.state.base1 }
                    onBase1Change = {(new_base1) => this.setState({ base1: new_base1, num2: null, error: null })}
                    base2 = { this.state.base2 }
                    onBase2Change = {(new_base2) => this.setState({ base2: new_base2, num2: null, error: null })}
                    onSubmit = {() => this.calculate({
                        type: "calculate",
                        num1: this.state.num1,
                        base1: this.state.base1,
                        base2: this.state.base2
                    })}
                    onReset = {() => this.setState({ base1: '10', base2: '2', num1: '0', num2: null, error: null })}
                />
                <Alert text={ this.state.error } />
                <Result result={ this.state.num2 } />
            </Main>
        );
    }
}
