import React from "react";
import { DsplS } from "@salutejs/plasma-ui";
import { colorValues } from "@salutejs/plasma-tokens";
import styled from "styled-components";


const TextAlert = styled(DsplS)`
    color: ${colorValues.critical};
    text-align: center;
    padding: 35px 20px 20px;
`;


export const Alert = (props) => {
    if (props.text === null)
        return;
    return (
        <TextAlert>
            { props.text }
        </TextAlert>
    );
}
