import React from "react";


export const InputForm = (props) => {
    const { number, base1, base2, onNumberChange, onBase1Change, onBase2Change, onSubmit } = props;
    return (
        <form onSubmit={(event) => {
            console.log('onSubmit');
            onSubmit();
            event.preventDefault();
        }}>
            <input
                className = "num"
                type = "text"
                value = { number }
                onChange = {({ target: { value } }) => onNumberChange(value)}
                autoFocus
            />
            <input
                className = "base"
                type = "number"
                min = "2"
                max = "16"
                value = { base1 }
                onChange = {({ target: { value } }) => onBase1Change(value)}
            />
            <input
                className = "base"
                type = "number"
                min = "2"
                max = "16"
                value = { base2 }
                onChange = {({ target: { value } }) => onBase2Change(value)}
            />
            <input type="submit" value="Перевести" />
        </form>
    );
}
