import React from "react";
import { Button, Col, Container, H1, Row, TextField } from "@salutejs/plasma-ui";
import styled from "styled-components";


const SContainer = styled(Container)`
    padding-top: 20px;
`;
const SRow = styled(Row)`
    margin: 35px 5px;
`;
const SCol = styled(Col)`
    display: flex;
`;
const SH1 = styled(H1)`
    margin: auto;
    width: 100%;
`;
const Input = styled(TextField)`
    font-size: 2rem;
    margin: auto;
    width: 100%;
`;
const Submit = styled(Button)`
    font-size: 2rem;
    font-weight: normal;
    height: 3rem;
    border-radius: 1rem;
`;


export const InputForm = (props) => {
    const { number, base1, base2, onNumberChange, onBase1Change, onBase2Change, onSubmit } = props;

    return (
        <SContainer>
            <form onSubmit={(event) => {
                console.log('onSubmit');
                onSubmit();
                event.preventDefault();
            }}>
                <SRow>
                    <SCol sizeS={2} sizeM={3} sizeL={4} sizeXL={6}>
                        <SH1>Введите число:</SH1>
                    </SCol>
                    <SCol sizeS={2} sizeM={3} sizeL={4} sizeXL={6}>
                        <Input
                            className = "num"
                            type = "text"
                            size = "m"
                            value = { number }
                            onChange = {({ target: { value } }) => onNumberChange(value)}
                            autoFocus
                            required
                        />
                    </SCol>
                </SRow>
                <SRow>
                    <SCol sizeS={2} sizeM={4} sizeL={6} sizeXL={10}>
                        <SH1>Первая система счисления:</SH1>
                    </SCol>
                    <SCol sizeS={2} sizeM={2} sizeL={2} sizeXL={2}>
                        {/*TODO: align the text to the center*/}
                        <Input
                            className = "base"
                            type = "number"
                            size = "m"
                            min = "2"
                            max = "16"
                            value = { base1 }
                            onChange = {({ target: { value } }) => onBase1Change(value)}
                            required
                        />
                    </SCol>
                </SRow>
                <SRow>
                    <SCol sizeS={2} sizeM={4} sizeL={6} sizeXL={10}>
                        <SH1>Вторая система счисления:</SH1>
                    </SCol>
                    <SCol sizeS={2} sizeM={2} sizeL={2} sizeXL={2}>
                        <Input
                            className = "base"
                            type = "number"
                            size = "m"
                            min = "2"
                            max = "16"
                            value = { base2 }
                            onChange = {({ target: { value } }) => onBase2Change(value)}
                            required
                        />
                    </SCol>
                </SRow>
                <SRow>
                    <SCol sizeS={4} offsetS={0} sizeM={4} offsetM={1} sizeL={4} offsetL={2} sizeXL={6} offsetXL={3}>
                        <Submit type="submit" stretch >
                            Перевести
                        </Submit>
                    </SCol>
                </SRow>
            </form>
        </SContainer>
    );
}
