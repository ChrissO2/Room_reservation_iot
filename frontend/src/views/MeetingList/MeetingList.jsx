import React from "react";
import { MainDiv, TableHeader, CreateButton } from "./MeetingList.style";
import MeetingItem from "../../components/MeetingList/MeetingItem";
import MeetingTable from "../../components/MeetingList/MeetingTable";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/Auth/AuthProvider";
import { getUpcomingMeetings } from "../../apis/meetingRoomAxios";

const MeetingList = () => {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]);
    const { token } = useOutletContext();

    useEffect(() => {
        getUpcomingMeetings(token)
            .then((res) => setMeetings(res.data))
            .catch((err) => console.log(err));
    }, []);

    const onCreateClick = () => {
        navigate("/create-meeting");
    };

    return (
        <MainDiv>
            <TableHeader>Upcoming meetings</TableHeader>
            <MeetingTable meetings={meetings}></MeetingTable>
            <CreateButton variant="success" onClick={onCreateClick}>
                Create meeting
            </CreateButton>
        </MainDiv>
    );
};

export default MeetingList;
