import styled from 'styled-components';
import WMSLogoImage from '../../assets/logos/wms_white_logo.png';
import { Link } from 'react-router-dom';

export const StyledNavbar = styled.nav`
    position: relative;
    margin: 0;
    height: 6vh;
    width: 100%;
    background-color: #000000;
    display: flex;
    align-items: center;
    z-index: 999;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;

export const WMSLogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 0.5rem;
    height: 100%;
    width: 15rem;
`;
export const WMSLogo = styled.a`
    background-size: contain;
    background-repeat: no-repeat;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 3vh;
    width: 10vw;
    margin-bottom: 1vh;
    margin-left: 0;
    background-image: url(${WMSLogoImage});
    @media screen and (max-width: 1200px) {
        width: 300px;
    }
`;
export const PageContainer = styled.div`
    position: relative;
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const StyledFooter = styled.footer`
    height: 6vh;
    width: 100%;
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5vh;
    padding: 0 2rem;
    z-index: 999;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;

export const ViewLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 1.5vh;
    font-weight: 600;
    margin: 0 1rem;
    &:hover {
        color: #1e90ff;
    }
`;
