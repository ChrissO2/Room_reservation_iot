import { Toast } from 'react-bootstrap';
import './Notification.css';
import { useEffect } from 'react';
interface NotificationProps {
    message: string;
    setMessage: (arg: string) => void;
}
const NOTIFICATION_TIMEOUT = 5000;

function Notification({ message, setMessage }: NotificationProps) {
    useEffect(() => {
        setTimeout(() => {
            setMessage('');
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
