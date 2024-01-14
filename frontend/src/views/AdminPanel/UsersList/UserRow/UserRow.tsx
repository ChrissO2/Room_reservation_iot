import UserMapper from '../../../../lib/UserMapper';
import { UserField } from './UserRow.style';

const UserRow = ({ user }: { user: UserMapper }) => {
    return (
        <>
            {Object.values(user.userFields).map((userProperty, index) => {
                return <UserField key={userProperty + index}>{userProperty}</UserField>;
            })}
        </>
    );
};

export default UserRow;
