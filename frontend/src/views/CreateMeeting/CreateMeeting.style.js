import { styled } from "styled-components";
import globalColors from "../../assets/globalColors";
import { FormSelect } from "react-bootstrap";
export const FormContainer = styled.div`
  margin: auto;
  padding: 2rem;
  border-radius: 3rem;
  background-color: ${globalColors.darkBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 1rem;
  width: 40vw;
`;

export const CreateMeetingPageCointainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ConfirmMeetingButton = styled.button`
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 10px 20px;
  font-size: 16px;
  width: 75%;
  font-weight: 600;
  margin-top: 3rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  @media only screen and (min-width: 2160px) {
    font-size: 2rem;
  }
  &:hover {
    background-color: #1e90ff;
    opacity: 0.8;
  }
`;

export const NewMeetingBannerContainer = styled.div`
  height: 5vh;
  font-size: 3rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2vh;
`;

export const Select = styled(FormSelect)`
  color: white;
  background-color: #24292d;
  border-radius: 1rem;
  border-style: solid;
  border-color: rgb(17, 18, 18);
  font-size: 1rem;
  padding: 0.5rem;
  width: 100%;
`;
