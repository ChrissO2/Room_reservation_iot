import { createContext, useContext } from "react";

export const NotificationContext = createContext({
  message: "TEST NOTIFICATION",
  setMessage: () => {},
});
export const useNotification = () => useContext(NotificationContext);
