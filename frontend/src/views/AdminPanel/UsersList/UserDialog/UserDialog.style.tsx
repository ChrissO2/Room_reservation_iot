import styled from 'styled-components';
import globalColors from '../../../../assets/globalColors';
import { MaterialIcon } from '../../../../components/MaterialIcon/MaterialIcon';

export const UserDialogContainer = styled.div`
    position: fixed;
    height: 80vh;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
`;

export const SaveButton = styled.div`
    height: 3vh;
    width: 20vh;
    display: flex;
    color: white;
    flex-direction: row;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-size: 2vh;
    border-style: none;
    background-color: #5dd233;
    cursor: pointer;
`;

export const RestorePasswordButton = styled.div`
    height: 3vh;
    width: 20vh;
    display: flex;
    color: white;
    flex-direction: row;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    font-size: 2vh;
    padding: 1rem;
    border-style: none;
    background-color: ${globalColors.blue};
    cursor: pointer;
`;

export const DeleteUserButton = styled.div`
    height: 3vh;
    width: 20vh;
    display: flex;
    color: white;
    flex-direction: row;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    font-size: 2vh;
    padding: 1rem;
    border-style: none;
    background-color: #d23333;
    cursor: pointer;
`;
export const ButtonsContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

export const CloseDialogButtonContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
    cursor: pointer;
    :hover {
        opacity: 0.5;
        transform: scale(1.1);
    }
`;
export const CloseDialogButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <CloseDialogButtonContainer onClick={onClick}>
            <MaterialIcon icon="close" size="2rem" color={'white'} />
        </CloseDialogButtonContainer>
    );
};
