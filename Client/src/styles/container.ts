import styled from "styled-components";
import { IContainerProps } from "../interfaces";

export const Container = styled.div<IContainerProps>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: ${(props) => props.$minheight || 100}vh;
    background-color: ${(props) => props.$background_color};
`;
