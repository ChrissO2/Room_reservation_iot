import { Outlet } from 'react-router-dom';
import { PageContainer, StyledFooter, StyledNavbar, ViewLink, WMSLogo, WMSLogoContainer } from './InfoBars.style';
import LogoutButton from './LogoutButton/LogoutButton';
import { VIEW_TYPE, useViewType } from '../ViewType/ViewTypeProvider';
const WMS_URL = 'https://www.wmsdev.pl';

const InfoBars = () => {
    const viewType = useViewType();

    const isAdminView = () => viewType === VIEW_TYPE.ADMIN;

    return (
        <PageContainer>
            <StyledNavbar>
                <WMSLogoContainer>
                    <WMSLogo href={isAdminView() ? window.location.origin : WMS_URL} />
                </WMSLogoContainer>
                {/* <ViewLink to={'/'}>Home</ViewLink> */}
                {isAdminView() && <ViewLink to={'/admin/users'}>Users</ViewLink>}
                {isAdminView() && <ViewLink to={'/admin/password-reset-requests'}>Password Resets</ViewLink>}
                {isAdminView() && <LogoutButton />}
            </StyledNavbar>
            <Outlet />
            <StyledFooter>LDAP User Managment Tool © 2023 by WMS_DEV</StyledFooter>
        </PageContainer>
    );
};
export default InfoBars;
