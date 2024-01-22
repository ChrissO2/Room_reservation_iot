import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const VIEW_TYPE = {
    STANDARD: "standard",
    ADMIN: "admin",
};
const ViewTypeContext = React.createContext(VIEW_TYPE.STANDARD);
export const useViewType = () => React.useContext(ViewTypeContext);

export const ViewTypeProvider = ({ children }) => {
    const [viewType, setViewType] = React.useState(VIEW_TYPE.STANDARD);
    const location = useLocation();

    useLayoutEffect(() => {
        if (
            location.pathname.includes("meeting") ||
            location.pathname.includes("reports")
        ) {
            setViewType(VIEW_TYPE.ADMIN);
        } else {
            setViewType(VIEW_TYPE.STANDARD);
        }
    }, [location]);

    return (
        <ViewTypeContext.Provider value={viewType}>
            {children}
        </ViewTypeContext.Provider>
    );
};
