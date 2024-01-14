import { createContext, useContext } from "react";

export const NotificationContext = createContext<NotificationProps>({
    message: "TEST NOTIFICATION",
    setMessage: () => { },
});
export const useNotification = () => useContext(NotificationContext);
