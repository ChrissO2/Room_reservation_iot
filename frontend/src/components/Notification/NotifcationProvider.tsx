import { createContext, useContext } from 'react';

interface NotificationProps {
    message: string;
    setMessage: (arg: string) => void;
}

export const NotificationContext = createContext<NotificationProps>({
    message: 'TEST NOTIFICATION',
    setMessage: () => {},
});
export const useNotification = () => useContext(NotificationContext);
