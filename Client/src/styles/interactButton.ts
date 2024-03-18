import styled from "styled-components";
import { marginProps } from "../interfaces";

export const InteractButton = styled.button<marginProps>`
    display: inline-block;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    padding: 15px;
    margin-top: ${(props) => props.margintop}px;
    color: white;
    background-color: #3498db;
    &:hover {
        background-color: #2980b9;
    }
`;
