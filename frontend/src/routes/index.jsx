import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfoBars from "../components/InfoBars/InfoBars";
import AuthProvider from "../components/Auth/AuthProvider";
import Login from "../views/Login/Login";
import { ViewTypeProvider } from "../components/ViewType/ViewTypeProvider";
import MeetingList from "../views/MeetingList/MeetingList";

const RouterComponent = () => {
    return (
        <Router>
            <ViewTypeProvider>
                <Routes>
                    <Route path="/" element={<InfoBars />}>
                        <Route path="/" element={<AuthProvider />}>
                            <Route path="/" element={<Login />} />
                            <Route path="/meetings" element={<MeetingList />} />
                        </Route>
                    </Route>
                </Routes>
            </ViewTypeProvider>
        </Router>
    );
};
export default RouterComponent;
