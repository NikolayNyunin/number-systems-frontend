import { createGlobalStyle } from "styled-components";
import { darkSber } from "@salutejs/plasma-tokens/themes";
import { text, background, gradient } from "@salutejs/plasma-tokens";

const DocumentStyle = createGlobalStyle`
    html {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;

const ThemeStyle = createGlobalStyle(darkSber);

export const GlobalStyle = () => (
    <>
        <DocumentStyle />
        <ThemeStyle />
    </>
);
