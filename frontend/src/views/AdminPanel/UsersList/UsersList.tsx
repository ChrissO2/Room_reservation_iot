import { useEffect, useState } from 'react';
import { getGroups, getUsers } from '../../../apis/ldapManager';
import { AddUserButton, UserContainer, UsersContainer, UsersHeader, UsersHeaderField } from './UsersList.style';
import { useOutletContext } from 'react-router-dom';
import UserRow from './UserRow/UserRow';
import { UserDialog } from './UserDialog/UserDialog';
import { NotificationContext } from '../../../components/Notification/NotifcationProvider';
import Notification from '../../../components/Notification/Notification';
import UserMapper from '../../../lib/UserMapper';

export interface User {
    objectName: any;
    uid: string;
    givenName: string;
    sn: string;
    gidNumber: string;
}

export interface Group {
    cn: string;
    gidNumber: string;
}

export type DialogTypes = 'add' | 'modify' | null;
const USERS_FIELDS = ['Given Name', 'Surname', 'Email', 'Group'];

const UsersList = () => {
    const [users, setUsers] = useState<UserMapper[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserMapper | null>(null);
    const [openDialog, setOpenDialog] = useState<DialogTypes>(null);
    const { token } = useOutletContext<{ token: string; setToken: (arg: string) => void }>();
    const [notificationMessage, setNotificationMessage] = useState<string>('');
    const handleUserSelect = (user: UserMapper) => () => {
        setSelectedUser(user);
        setOpenDialog('modify');
    };
    const handleAddUserButton = () => {
        setSelectedUser(new UserMapper({ uid: '', givenName: '', sn: '', gidNumber: '', objectName: '' }, groups));
        setOpenDialog('add');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setOpenDialog(null);
        }
    };

    const handleUsersAndGroupsFetch = () => {
        Promise.all([getUsers(token), getGroups(token)]).then(([users, groups]) => {
            if (!users.error && !groups.error) {
                const mappedUsers = users.map((user: User) => new UserMapper(user, groups));
                setUsers(mappedUsers);
                setGroups(groups);
                console.log(mappedUsers);
            }
        });
    };

    useEffect(() => {
        if (token) {
            setTimeout(() => {
                handleUsersAndGroupsFetch();
            }, 500);
        }
    }, [token, openDialog, notificationMessage]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <NotificationContext.Provider value={{ message: notificationMessage, setMessage: setNotificationMessage }}>
            <Notification message={notificationMessage} setMessage={setNotificationMessage} />
            <UsersContainer>
                {openDialog && (
                    <UserDialog user={selectedUser} groups={groups} dialogType={{ openDialog, setOpenDialog }} />
                )}
                {users && (
                    <UsersHeader>
                        {USERS_FIELDS.map((key) => (
                            <UsersHeaderField key={key}>{key}</UsersHeaderField>
                        ))}
                        <AddUserButton onClick={handleAddUserButton} />
                    </UsersHeader>
                )}
                {Array.isArray(users)
                    ? users.map((user, index) => (
                          <UserContainer key={index} onClick={handleUserSelect(user)}>
                              <UserRow user={user} />
                          </UserContainer>
                      ))
                    : null}
            </UsersContainer>
        </NotificationContext.Provider>
    );
};
export default UsersList;
