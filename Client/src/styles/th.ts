import { styled } from "styled-components";

interface THProps {
    $display?: string;
}

export const TH = styled.th<THProps>`
    padding: 10px;
    display: ${(props) => props.$display || ""};
    border: 1px solid #ddd;
    text-align: center;
    font-weight: bold;
`;
