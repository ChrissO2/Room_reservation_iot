import {
  ConfirmMeetingButton,
  CreateMeetingPageCointainer,
  FormContainer,
} from "./CreateMeeting.style";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { NewMeetingBannerContainer } from "./CreateMeeting.style";

const CreateMeeting = (props) => {
  return (
    <CreateMeetingPageCointainer>
      <NewMeetingBannerContainer>
        Stwórz nowe spotkanie
      </NewMeetingBannerContainer>
      <FormContainer>
        <FormGroup className="formGroup">
          <FormLabel>Nazwa</FormLabel>
          <FormControl
            placeholder="Podaj nazwę spotkania"
            className="formInput"
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <FormLabel>Godzina początku spotkania</FormLabel>
          <FormControl
            type="datetime-local"
            placeholder="Podaj godzinę początku spotkania"
            className="formInput"
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <FormLabel>Godzina końca spotkania</FormLabel>
          <FormControl
            type="datetime-local"
            placeholder="Podaj godzinę końca spotkania"
            className="formInput"
          />
        </FormGroup>
        <ConfirmMeetingButton>Potwierdz</ConfirmMeetingButton>
      </FormContainer>
    </CreateMeetingPageCointainer>
  );
  // return <div>Stwórz spotkanie</div>;
};
export default CreateMeeting;
