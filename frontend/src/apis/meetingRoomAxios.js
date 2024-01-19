import axios from "axios";

const API_URL = "http://62.171.156.180:8000/";

// API_URL.port = "8000";

export const MeetingRoomAxios = (token) => {
  return axios.create({
    baseURL: API_URL,
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
  return MeetingRoomAxios(token).get("/api/rooms");
};

export const getMeetings = (token) => {
  return MeetingRoomAxios(token).get("/api/meetings");
};

export const getUpcomingMeetingRooms = (token) => {
  return MeetingRoomAxios(token).get("/api/meetings/upcoming");
};

export const createMeeting = (token, meetingParamaters) => {
  // return true;
  return MeetingRoomAxios(token).post("/api/new_meeting", meetingParamaters);
};
