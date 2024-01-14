import { Outlet } from "react-router-dom";
import {
    PageContainer,
    StyledFooter,
    StyledNavbar,
    ViewLink,
    WMSLogo,
    WMSLogoContainer,
} from "./InfoBars.style";
import LogoutButton from "./LogoutButton/LogoutButton";
import { VIEW_TYPE, useViewType } from "../ViewType/ViewTypeProvider";
const WMS_URL = "https://www.wmsdev.pl";

const InfoBars = () => {
    const viewType = useViewType();

    const isAdminView = () => viewType === VIEW_TYPE.ADMIN;

    return (
        <PageContainer>
            <StyledNavbar>
                <WMSLogoContainer></WMSLogoContainer>
                {/* <ViewLink to={'/'}>Home</ViewLink> */}
                {isAdminView() && <ViewLink to={"/admin/users"}>Users</ViewLink>}
                {isAdminView() && (
                    <ViewLink to={"/admin/password-reset-requests"}>
                        Password Resets
                    </ViewLink>
                )}
                {isAdminView() && <LogoutButton />}
            </StyledNavbar>
            <Outlet />
            <StyledFooter>Meeting Room System © 2023 by PIWO</StyledFooter>
        </PageContainer>
    );
};
export default InfoBars;
