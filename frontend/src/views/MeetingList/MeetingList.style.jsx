import styled from "styled-components";
import Button from 'react-bootstrap/Button';

export const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 5vh;
`;

export const TableHeader = styled.h2`
    text-align: center;
    font-size: 2.3rem;
    margin-bottom: 15px;
`;

export const CreateButton = styled(Button)`
    margin: 10px;
`