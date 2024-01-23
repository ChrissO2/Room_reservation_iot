import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfoBars from "../components/InfoBars/InfoBars";
import AuthProvider, { PrivateRoute } from "../components/Auth/AuthProvider";
import Login from "../views/Login/Login";
import { ViewTypeProvider } from "../components/ViewType/ViewTypeProvider";
import MeetingList from "../views/MeetingList/MeetingList";
import CreateMeeting from "../views/CreateMeeting/CreateMeeting";
import Reports from "../views/Reports/Reports";

const RouterComponent = () => {
  return (
    <AuthProvider>
      <Router>
        <ViewTypeProvider>
          <Routes>
            <Route element={<InfoBars />}>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/meetings" element={<MeetingList />} />
                <Route path="/create-meeting" element={<CreateMeeting />} />
                <Route path="/reports" element={<Reports />} />
              </Route>
            </Route>
          </Routes>
        </ViewTypeProvider>
      </Router>
    </AuthProvider>
  );
};
export default RouterComponent;
