import styled from "styled-components";

export const SuccessButton = styled.button`
    display: inline-block;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    padding: 15px;
    background-color: #4caf50;
    color: white;
    &:hover {
        background-color: #3e8e41;
    }
`;
