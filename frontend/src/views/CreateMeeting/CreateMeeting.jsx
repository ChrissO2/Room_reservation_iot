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
import { useState, useEffect } from "react";
import Notification from "../../components/Notification/Notification";
import { getMeetingRooms } from "../../apis/meetingRoomAxios";
// const rooms = [1, 2, 3, 4];

const CreateMeeting = (props) => {
  const { token } = useAuth();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(getMeetingRooms(localStorage.getItem('token')));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createMeeting(token, {
        start_time: startTime,
        end_time: endTime,
        name,
        room,
      });
      setMessage("Zgłoszono spotkanie");
    } catch (e) {
      console.log(e);
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
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <FormLabel>Godzina końca spotkania</FormLabel>
          <FormControl
            type="datetime-local"
            placeholder="Podaj godzinę końca spotkania"
            className="formInput"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <FormLabel>Numer pomieszczenia</FormLabel>
          <Select onChange={(e) => setRoom(e.target.value)}>
            <option>Wybierz pomieszczenie</option>
            {rooms.map((room) => (
              <option>{room}</option>
            ))}
          </Select>
        </FormGroup>
        <ConfirmMeetingButton onClick={handleSubmit}>
          Potwierdź
        </ConfirmMeetingButton>
      </FormContainer>
    </CreateMeetingPageCointainer>
  );
  // return <div>Stwórz spotkanie</div>;
};
export default CreateMeeting;
