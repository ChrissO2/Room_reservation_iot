import { Toast } from "react-bootstrap";
import "./Notification.css";
import { useEffect } from "react";

const NOTIFICATION_TIMEOUT = 5000;

function Notification({ message, setMessage }) {
    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, NOTIFICATION_TIMEOUT);
    }, [message, setMessage]);
    return (
        <>
            {message && (
                <Toast className="notification-container">
                    <Toast.Body className="notification-body">{message}</Toast.Body>
                </Toast>
            )}
        </>
    );
}
export default Notification;
