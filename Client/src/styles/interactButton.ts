import styled from "styled-components";

export const InteractButton = styled.button`
    display: inline-block;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    padding: 15px;
    color: white;
    background-color: #3498db;
    &:hover {
        background-color: #2980b9;
    }
`;
