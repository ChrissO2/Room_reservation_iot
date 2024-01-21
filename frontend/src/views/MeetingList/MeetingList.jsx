import React from "react";
import { MainDiv, TableHeader, CreateButton } from "./MeetingList.style";
import MeetingItem from "../../components/MeetingList/MeetingItem";
import MeetingTable from "../../components/MeetingList/MeetingTable";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/Auth/AuthProvider";
import { getUpcomingMeetings } from "../../apis/meetingRoomAxios";
const mockData = [
    {
        start_time: "09:00",
        end_time: "10:30",
        date: "15-01-2024",
        room: "Conference Room A",
        organizer: "Alice Johnson",
        description: "Discuss marketing strategy",
    },
    {
        start_time: "11:00",
        end_time: "12:30",
        date: "15-01-2024",
        room: "Conference Room B",
        organizer: "Bob Smith",
        description: "Product development meeting",
    },
    {
        start_time: "14:00",
        end_time: "15:30",
        date: "15-01-2024",
        room: "Conference Room C",
        organizer: "Charlie Brown",
        description: "Team building workshop",
    },
    {
        start_time: "16:00",
        end_time: "17:30",
        date: "15-01-2024",
        room: "Conference Room D",
        organizer: "David Miller",
        description: "Financial review and planning",
    },
];

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
