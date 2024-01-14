import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import { DialogTypes, Group } from '../UsersList';
import {
    ButtonsContainer,
    CloseDialogButton,
    CloseDialogButtonContainer,
    DeleteUserButton,
    RestorePasswordButton,
    SaveButton,
    UserDialogContainer,
} from './UserDialog.style';
import './UserDialog.css';
import { postAddUser, deleteUser, postGenerateRestorePasswordLink, postModifyUser } from '../../../../apis/ldapManager';
import { useOutletContext } from 'react-router-dom';
import { useNotification } from '../../../../components/Notification/NotifcationProvider';
import UserMapper from '../../../../lib/UserMapper';

interface UserDialogProps {
    user: UserMapper | null;
    groups: Group[];
    dialogType: { openDialog: DialogTypes; setOpenDialog: (dialogType: DialogTypes) => void };
}

export const UserDialog = ({ user, groups, dialogType: { openDialog, setOpenDialog } }: UserDialogProps) => {
    const [currentUser, setCurrentUser] = useState<UserMapper | null>(user);
    const { token } = useOutletContext<{ token: string }>();
    const [requestGenerated, setRequestGenerated] = useState(false);
    const { message, setMessage } = useNotification();

    const handleSave = async () => {
        let result;
        if (openDialog === 'modify' && currentUser) {
            result = await postModifyUser(token, currentUser?.userFieldIDs);
        } else if (openDialog === 'add' && currentUser) {
            result = await postAddUser(token, currentUser?.userFieldIDs);
        }
        if (result.hasOwnProperty('error')) {
            setMessage('Error when making changes: ' + result.error.toString());
        } else {
            setMessage('Changes saved');
        }
        setOpenDialog(null);
    };

    const handleGenereteRestorePasswordLink = async () => {
        const { requestId } = await postGenerateRestorePasswordLink(token, {
            userId: currentUser?.Email,
            type: 'password',
        });
        navigator.clipboard.writeText(`${window.location.origin}/reset-password/${requestId}`);
        setMessage('Password reset link was copied to clipboard');
        setRequestGenerated(true);
        setOpenDialog(null);
    };

    const handleDeleleUser = async () => {
        setOpenDialog(null);
        if (!currentUser?.Email) {
            setMessage('Error when deleting user: Email not found');
            setOpenDialog(null);
            return;
        }
        try {
            const response = await deleteUser(token, currentUser?.Email);
            if (response.error) {
                setMessage('Error when deleting user: ' + response.error.toString());
                return;
            } else {
                setMessage('User deleted');
            }
        } catch (e) {
            setMessage('Error when deleting user: ' + e);
        } finally {
            setOpenDialog(null);
        }
    };
    const handleUserModification =
        (key: string) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
            setCurrentUser((currentUser: UserMapper | null) =>
                currentUser
                    ? (() => {
                          currentUser[key] = e.target.value;
                          return currentUser;
                      })()
                    : null
            );
        };
    useEffect(() => {
        if (currentUser && groups.length > 0 && !currentUser.Group) {
            currentUser.Group = groups[0].cn;
        }
    }, []);

    return (
        <UserDialogContainer>
            <Form className="dialogform">
                {user &&
                    Object.entries(user.userFields).map(([key, value], index) => (
                        <FormGroup className="dialogformGroup" key={index}>
                            <FormLabel>{key}</FormLabel>
                            {key === 'Group' ? (
                                <FormSelect className="dialogformInput" onChange={handleUserModification(key)}>
                                    {groups
                                        .sort((a, b) => (a.cn === currentUser?.Group ? -1 : 1))
                                        .map((group, index) => (
                                            <option value={group.cn} className="dialogformInput" key={index}>
                                                {group.cn}
                                            </option>
                                        ))}
                                </FormSelect>
                            ) : (
                                <FormControl
                                    className="dialogformInput"
                                    defaultValue={value}
                                    onChange={
                                        handleUserModification(key) as (e: React.ChangeEvent<HTMLInputElement>) => void
                                    }
                                />
                            )}
                        </FormGroup>
                    ))}
                <ButtonsContainer>
                    <SaveButton onClick={handleSave}>Save</SaveButton>
                    {openDialog !== 'add' && (
                        <RestorePasswordButton onClick={handleGenereteRestorePasswordLink}>
                            Restore Password
                        </RestorePasswordButton>
                    )}
                    {openDialog !== 'add' && (
                        <DeleteUserButton onClick={handleDeleleUser}>Delete User</DeleteUserButton>
                    )}
                </ButtonsContainer>
                <CloseDialogButton
                    onClick={() => {
                        setOpenDialog(null);
                    }}
                />
            </Form>
        </UserDialogContainer>
    );
};
