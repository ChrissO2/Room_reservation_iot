import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import InfoBars from '../components/InfoBars/InfoBars';
import MissingPage from '../views/MissingPage/MissingPage';
import AuthProvider from '../components/Auth/AuthProvider';
import UsersList from '../views/AdminPanel/UsersList/UsersList';
import Login from '../views/Login/Login';
import PasswordResetRequests from '../views/AdminPanel/PasswordResetRequests/PasswordResetRequests';
import { ViewTypeProvider } from '../components/ViewType/ViewTypeProvider';
import WMSServices from '../views/WMSServices/WMSServices';
import WMSAuth from '../views/WMSAuth/WMSAuth';

const RouterComponent = () => {
    return (
        <Router>
            <ViewTypeProvider>
                <Routes>
                    <Route path="/" element={<InfoBars />}>
                        <Route path="/" element={<AuthProvider />}>
                            <Route path="/" element={<Login />} />
                            <Route path="/admin/users" element={<UsersList />} />
                            <Route path="/admin/password-reset-requests" element={<PasswordResetRequests />} />
                        </Route>
                        <Route path="/reset-password/:requestId" element={<ResetPassword />} />
                        <Route path="/our-services" element={<WMSServices />} />
                        <Route path="/wms-auth/:target" element={<WMSAuth />} />
                        <Route path="*" element={<MissingPage />} />
                    </Route>
                </Routes>
            </ViewTypeProvider>
        </Router>
    );
};
export default RouterComponent;
