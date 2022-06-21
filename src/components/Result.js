import React from "react";
import { Container, DsplM, H1 } from "@salutejs/plasma-ui";
import styled from "styled-components";


const SContainer = styled(Container)`
    text-align: center;
    padding: 35px 20px 20px;
`;
const SDsplM = styled(DsplM)`
    margin-top: 20px;
    word-break: break-word;
`;


export const Result = (props) => {
    if (props.result === null)
        return;
    return (
        <SContainer>
            <H1>Результат:</H1>
            <SDsplM>{ props.result }</SDsplM>
        </SContainer>
    );
}
