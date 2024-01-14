import { useAuth } from "../../components/Auth/AuthProvider";
import AdminPanel from "../AdminPanel/AdminPanel";
import Login from "../Login/Login";

const HomePage = () => {
    const { token } = useAuth();
    return (
       <>
       {token?<AdminPanel/>:<Login/>} 
       </>    
       );

};

export default HomePage;
