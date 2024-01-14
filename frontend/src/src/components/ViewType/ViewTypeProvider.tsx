import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export enum VIEW_TYPE {
    ADMIN = 'admin',
    STANDARD = 'standard',
}
const ViewTypeContext = React.createContext<VIEW_TYPE>(VIEW_TYPE.STANDARD);
export const useViewType = () => React.useContext(ViewTypeContext);

export const ViewTypeProvider = ({ children }: { children: React.ReactNode }) => {
    const [viewType, setViewType] = React.useState<VIEW_TYPE>(VIEW_TYPE.STANDARD);
    const location = useLocation();

    useLayoutEffect(() => {
        if (location.pathname.includes('admin')) {
            setViewType(VIEW_TYPE.ADMIN);
        } else {
            setViewType(VIEW_TYPE.STANDARD);
        }
    }, [location]);

    return <ViewTypeContext.Provider value={viewType}>{children}</ViewTypeContext.Provider>;
};
