import { Outlet, useOutletContext } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <>
            <Outlet context={useOutletContext()} />
        </>
    );
};

export default AdminPanel;
