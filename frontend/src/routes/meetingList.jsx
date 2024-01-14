import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MeetingList from "../views/MeetingList/MeetingList";

const RouterComponent = () => {
    return (
        <Router>
            <ViewTypeProvider>
                <Routes>
                    <Route path="/meetings" element={<MeetingList />} />
                </Routes>
            </ViewTypeProvider>
        </Router>
    );
};
export default RouterComponent;
