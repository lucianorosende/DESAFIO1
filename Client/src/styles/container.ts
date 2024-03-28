import styled from "styled-components";
import { IContainerProps } from "../interfaces";

export const Container = styled.div<IContainerProps>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: ${(props) => props.$flexDirection || "column"};
    align-items: center;
    min-height: ${(props) => props.$minheight || 100}vh;
    background-color: ${(props) => props.$background_color};
`;
