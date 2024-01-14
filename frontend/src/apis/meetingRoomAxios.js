import axios from "axios";

const API_URL = "localhost";

export const MeetingRoomAxios = (token) => {
  return axios.create({
    baseUrl: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
};

export const login = (username, password) => {
  // throw new Error();
  return { token: "hello" };
  return MeetingRoomAxios().post("/login", {
    username,
    password,
  });
};

export const getMeetingRooms = (token) => {
  return MeetingRoomAxios(token).get("/meetings");
};

export const createMeeting = (token, meetingParamaters) => {
  return true;
  return MeetingRoomAxios(token).post("/create-meeting", meetingParamaters);
};
