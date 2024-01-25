import { ViewLink } from '../InfoBars.style';
import { LogoutButtonWrapper } from './LogoutButton.style';
const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <LogoutButtonWrapper>
            <ViewLink to={'/'} onClick={handleLogout}>
                Wyloguj
            </ViewLink>
        </LogoutButtonWrapper>
    );
};
export default LogoutButton;
