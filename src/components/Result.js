import React from "react";


export const Result = (props) => {
    if (props.result === null)
        return;
    return (
        <div>
            <p>Результат:</p>
            <b>{ props.result }</b>
        </div>
    );
}
