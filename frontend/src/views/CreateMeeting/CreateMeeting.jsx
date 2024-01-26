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
import { useOutletContext } from "react-router";

const CreateMeeting = (props) => {
  const { token } = useAuth();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // debugger;
    getMeetingRooms(token)
      .then((res) => {
        setRooms(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
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
      if (e.response && e.response.status) {
        const statusCode = e.response.status;
        if (statusCode === 400) {
          setMessage('Invalid data');
        }
        else if (statusCode === 409) {
          setMessage('Room is taken in given time');
        }
        else if(statusCode === 401) {
          setMessage('Authorization error. Try to login again');
        }
      } else {
        setMessage("Error");
      }
      
    }
  };

  return (
    <CreateMeetingPageCointainer>
      <Notification message={message} setMessage={setMessage} />
      <NewMeetingBannerContainer>
        Create new meeting
      </NewMeetingBannerContainer>
      <FormContainer>
        <FormGroup className="formGroup">
          <FormLabel>Name</FormLabel>
          <FormControl
            onChange={(e) => setName(e.target.value)}
            placeholder="Podaj nazwę spotkania"
            className="formInput"
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <FormLabel>Meeting start hour</FormLabel>
          <FormControl
            type="datetime-local"
            placeholder="Podaj godzinę początku spotkania"
            className="formInput"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <FormLabel>Meeting end hour</FormLabel>
          <FormControl
            type="datetime-local"
            placeholder="Podaj godzinę końca spotkania"
            className="formInput"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <FormLabel>Room number</FormLabel>
          <Select onChange={(e) => setRoom(e.target.value)}>
            <option>Choose a room</option>
            {rooms && rooms.map((room) => <option>{room.id}</option>)}
          </Select>
        </FormGroup>
        <ConfirmMeetingButton onClick={handleSubmit}>
          Create
        </ConfirmMeetingButton>
      </FormContainer>
    </CreateMeetingPageCointainer>
  );
};
export default CreateMeeting;
