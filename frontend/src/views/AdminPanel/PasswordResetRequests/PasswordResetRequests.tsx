import { useEffect, useState } from 'react';
import { NotificationContext } from '../../../components/Notification/NotifcationProvider';
import {
    CopyRequestLinkButton,
    DeleteRequestLinkButton,
    PasswordResetRequestsContainer,
    PasswordResetRequestsHeader,
} from './PasswordResetRequests.style';
import { useOutletContext } from 'react-router-dom';
import { deletePasswordResetRequest, getPasswordResetRequests } from '../../../apis/ldapManager';
import {
    PasswordResetRequestField,
    PasswordResetRequestFieldsWrapper,
} from './PasswordResetRequestRow/PasswordResetRequestRow.style';
import PasswordResetRequestRow from './PasswordResetRequestRow/PasswordResetRequestRow';
import Notification from '../../../components/Notification/Notification';

export interface PasswordResetRequest {
    id: string;
    userId: string;
    type: string;
    isActive: string;
    generatedAt: string;
    expiresAt: string;
    [key: string]: string;
}

// const passwordResetRequestFieldMapper: PasswordResetRequest = {
//     id: 'ID',
//     userId: 'User ID',
//     type: 'Type',
//     isActive: 'Active',
//     requestId: 'Request ID',
//     generatedAt: 'Generated At',
//     expiresAt: 'Expires At',
// };

const passwordResetRequestHeaders = ['User ID', 'Request ID', 'Generated At', 'Expires At'];

const PasswordResetRequests = () => {
    const [passwordResetRequests, setPasswordResetRequests] = useState<PasswordResetRequest[]>([]);
    const { token } = useOutletContext<{ token: string }>();
    const [message, setMessage] = useState<string>('');
    const [showDialog, setShowDialog] = useState(false);

    const handlePasswordResetRequestsFetch = () => {
        getPasswordResetRequests(token)
            .then((requests: PasswordResetRequest[]) => {
                console.log(requests);
                setPasswordResetRequests(requests);
            })
            .catch((error) => {
                console.log(error);
                setMessage(error.toString());
            });
    };

    const handlePasswordResetRequestDelete = (requestId: string) => async () => {
        try {
            const response = await deletePasswordResetRequest(token, requestId);
            if (response.error) {
                setMessage(response.error.toString());
            } else {
                setMessage(`Password restore link ${requestId} deactivated`);
            }
            handlePasswordResetRequestsFetch();
        } catch (error) {
            setMessage((error as Error).toString());
        }
    };

    const handlePasswordResetRequestCopy = (requestId: string) => () => {
        navigator.clipboard.writeText(`${window.location.origin}/reset-password/${requestId}`);
        setMessage('Password Change Request Link copied to clipboard');
    };

    useEffect(() => {
        if (token) {
            handlePasswordResetRequestsFetch();
        }
    }, [token, showDialog]);

    return (
        <NotificationContext.Provider value={{ message, setMessage }}>
            <Notification message={message} setMessage={setMessage} />
            <PasswordResetRequestsContainer>
                <PasswordResetRequestsHeader>
                    {passwordResetRequestHeaders.map((key: string) => (
                        <PasswordResetRequestField>{key}</PasswordResetRequestField>
                    ))}
                </PasswordResetRequestsHeader>
                {Array.isArray(passwordResetRequests)
                    ? passwordResetRequests.map((request) => (
                          <PasswordResetRequestFieldsWrapper>
                              <PasswordResetRequestRow request={request} />
                              <CopyRequestLinkButton onClick={handlePasswordResetRequestCopy(request.requestId)} />
                              <DeleteRequestLinkButton onClick={handlePasswordResetRequestDelete(request.requestId)} />
                          </PasswordResetRequestFieldsWrapper>
                      ))
                    : null}
            </PasswordResetRequestsContainer>
        </NotificationContext.Provider>
    );
};
export default PasswordResetRequests;
