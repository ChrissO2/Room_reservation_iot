import axios from "axios";

const API_URL = "62.171.156.180";

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
  // return { token: "hello" };
  return MeetingRoomAxios().post("/api/token", {
    username,
    password,
  });
};

export const getMeetingRooms = (token) => {
  return MeetingRoomAxios(token).get("/api/meetings");
};

export const createMeeting = (token, meetingParamaters) => {
  // return true;
  return MeetingRoomAxios(token).post("/new-meeting", meetingParamaters);
};
