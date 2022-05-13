import React from "react";
import { createSmartappDebugger, createAssistant } from "@sberdevices/assistant-client";
import './App.css';


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
        console.log('calculate');
        // TODO: implement
    }

    render() {
        console.log('render');
        return (
            <h1>Test</h1>
        );
    }
}
