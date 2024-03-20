import styled from "styled-components";
import { buttonProps } from "../interfaces";

export const ButtonMaker = styled.button<buttonProps>`
    display: flex;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    margin-top: ${(props) => props.margintop}px;
    margin-left: ${(props) => props.marginleft}px;

    padding: 15px;
    background-color: ${(props) => props.background_color};
    flex-direction: column;
    color: white;
    &:hover {
        background-color: ${(props) => props.background_hover_color};
    }
`;
