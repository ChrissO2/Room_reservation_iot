import React from "react";
import { MainDiv, TableHeader, CreateButton } from "./MeetingList.style";
import MeetingItem from "../../components/MeetingList/MeetingItem";
import MeetingTable from "../../components/MeetingList/MeetingTable";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/Auth/AuthProvider";
import { getUpcomingMeetings, getCurrentMeetings } from "../../apis/meetingRoomAxios";

const MeetingList = () => {
    const navigate = useNavigate();
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [currentMeetings, setCurrentMeetings] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        getUpcomingMeetings(token)
            .then((res) => {setUpcomingMeetings(res.data)
            console.log(res.data)})
            .catch((err) => console.log(err));
        getCurrentMeetings(token)
            .then((res) => setCurrentMeetings(res.data))
            .catch((err) => console.log(err));
    }, []);

    const onCreateClick = () => {
        navigate("/create-meeting");
    };

    return (
        <MainDiv>
            <TableHeader>Obecne spotkania</TableHeader>
            <MeetingTable meetings={currentMeetings} />

            <TableHeader>Nadchodzące spotkania</TableHeader>
            <MeetingTable meetings={upcomingMeetings}></MeetingTable>

            <CreateButton variant="success" onClick={onCreateClick}>
                Utwórz spotkanie
            </CreateButton>
        </MainDiv>
    );
};

export default MeetingList;
