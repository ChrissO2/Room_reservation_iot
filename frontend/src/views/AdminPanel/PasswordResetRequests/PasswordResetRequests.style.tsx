import styled from 'styled-components';
import globalColors from '../../../assets/globalColors';
import { MaterialIcon } from '../../../components/MaterialIcon/MaterialIcon';

export const PasswordResetRequestsContainer = styled.div`
    height: 100%;
    width: 80vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
`;
export const PasswordResetRequestsHeader = styled.div`
    position: relative;
    height: 3vh;
    margin: auto;
    width: 97%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 600;
    text-align: center;
    color: white;
    margin-top: 1rem;
    border-style: solid;
    border-radius: 0.5rem;
    border-color: ${globalColors.blue};
    margin-bottom: 1rem;
    padding: 2rem;
    background-color: ${globalColors.blue};
`;

export const PasswordResetRequestContainer = styled.div`
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

const MaterialButtonContainer = styled.button`
    height: 3vh;
    width: 3vh;
    margin: 3rem;
    display: flex;
    flex-direction: row;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    background-color: #1a1b1d;
    z-index: 9999;
    color: white;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    :hover {
        transform: scale(1.1);
    }
`;

const DeleteRequestLinkContainer = styled(MaterialButtonContainer)`
    right: -1vw;
`;

const CopyRequestLinkContainer = styled(MaterialButtonContainer)`
    right: 1vw;
`;
export const DeleteRequestLinkButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <DeleteRequestLinkContainer onClick={onClick}>
            <MaterialIcon icon={'delete'} size={'2vh'} color={'white'} />
        </DeleteRequestLinkContainer>
    );
};

export const CopyRequestLinkButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <CopyRequestLinkContainer onClick={onClick}>
            <MaterialIcon icon={'content_copy'} size={'2vh'} color={'white'} />
        </CopyRequestLinkContainer>
    );
};
