import {
  ConfirmMeetingButton,
  CreateMeetingPageCointainer,
  FormContainer,
  Select,
} from "./CreateMeeting.style";
import { FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import { NewMeetingBannerContainer } from "./CreateMeeting.style";
import { createMeeting } from "../../apis/meetingRoomAxios";
import { useAuth } from "../../components/Auth/AuthProvider";
import { useState } from "react";
import Notification from "../../components/Notification/Notification";
const rooms = [1, 2, 3, 4];

const CreateMeeting = (props) => {
  const { token } = useAuth();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createMeeting(token, {
        startTime,
        endTime,
        name,
        room,
      });
      setMessage("Zgłoszono spotkanie");
    } catch (e) {
      setMessage("Niepowodzenie");
    }
  };

  return (
    <CreateMeetingPageCointainer>
      <Notification message={message} setMessage={setMessage} />
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
            onChange={setStartTime}
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <FormLabel>Godzina końca spotkania</FormLabel>
          <FormControl
            type="datetime-local"
            placeholder="Podaj godzinę końca spotkania"
            className="formInput"
            onChange={setEndTime}
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <FormLabel>Numer pomieszczenia</FormLabel>
          <Select onChange={setRoom}>
            <option>Wybierz pomieszczenie</option>
            {rooms.map((room) => (
              <option>{room}</option>
            ))}
          </Select>
        </FormGroup>
        <ConfirmMeetingButton onClick={handleSubmit}>
          Potwierdz
        </ConfirmMeetingButton>
      </FormContainer>
    </CreateMeetingPageCointainer>
  );
  // return <div>Stwórz spotkanie</div>;
};
export default CreateMeeting;
