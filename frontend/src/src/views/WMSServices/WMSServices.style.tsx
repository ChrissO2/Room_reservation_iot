import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const WMSServicesContainer = styled.div`
    height: 100%;
    width: 80vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    overflow-y: scroll;
`;

export const WMSServicesHeader = styled.div`
    position: relative;
    height: 3vh;
    margin: auto;
    width: 97%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 600;
    text-align: center;
    color: white;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 2rem;
    font-size: 5rem;
`;

export const WMSServiceImagesContainer = styled.div`
    margin-top: -4vh;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    align-items: space-evenly;
    :hover {
        opacity: 0.9;
        transform: scale(1.1);
    }
`;

export const WMSServiceImage = styled.img`
    width: 10vh;
    margin: 1rem;
    cursor: pointer;
`;

export const WMSServiceImageLink = styled.a`
    height: 10vh;
    width: 10vh;
    margin: 1rem;
    cursor: pointer;
`;
