import styled from "styled-components";

export const ErrorButton = styled.button`
    display: inline-block;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    padding: 15px;
    background-color: #f03e3e;
    color: white;
    &:hover {
        background-color: #c23636;
    }
`;
