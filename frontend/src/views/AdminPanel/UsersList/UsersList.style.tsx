import styled from 'styled-components';
import { UserField } from './UserRow/UserRow.style';
import { MaterialIcon } from '../../../components/MaterialIcon/MaterialIcon';
import globalColors from '../../../assets/globalColors';

export const UsersContainer = styled.div`
    height: 100%;
    width: 80vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
`;
export const UsersHeader = styled.div`
    position: relative;
    height: 3vh;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: white;
    margin-top: 1rem;
    border-style: solid;
    border-radius: 0.5rem;
    border-color: #375083;
    margin-bottom: 1rem;
    padding: 2rem;
    background-color: ${globalColors.blue};
`;

export const UsersHeaderField = styled(UserField)`
    font-weight: 600;
    font-size: 2vh;
`;

export const UserContainer = styled.div`
    height: 3vh;
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    border-radius: 0.5rem;
    background-color: #1a1b1d;
    color: white;
    align-items: center;
    padding: 2rem;
    font-weight: 300;
    cursor: pointer;
`;

export const AddButtonContainer = styled.button`
    height: 3vh;
    width: 3vh;
    margin: 3rem;
    display: flex;
    flex-direction: row;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    position: absolute;
    right: 0;
    border: none;
    :hover {
        transform: scale(1.1);
    }
`;

export const AddUserButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <AddButtonContainer onClick={onClick}>
            <MaterialIcon icon={'add'} size={'4vh'} color={'white'} />
        </AddButtonContainer>
    );
};
