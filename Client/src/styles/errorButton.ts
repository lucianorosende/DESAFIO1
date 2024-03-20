import styled from "styled-components";
import { marginProps } from "../interfaces";

export const ErrorButton = styled.button<marginProps>`
    display: flex;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    margin-top: ${(props) => props.margintop}px;
    padding: 15px;
    background-color: #f03e3e;
    flex-direction: column;
    color: white;
    &:hover {
        background-color: #c23636;
    }
`;
