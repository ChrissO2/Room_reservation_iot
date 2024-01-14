import React from "react";
import { MainDiv, TableHeader, CreateButton } from "./MeetingList.style";
import MeetingItem from "../../components/MeetingList/MeetingItem";
import MeetingTable from "../../components/MeetingList/MeetingTable"
import { useNavigate } from 'react-router-dom'


const mockData = [
    {
        start_time: '09:00',
        end_time: '10:30',
        date: '15-01-2024',
        room: 'Conference Room A',
        organizer: 'Alice Johnson',
        description: 'Discuss marketing strategy',
    },
    {
        start_time: '11:00',
        end_time: '12:30',
        date: '15-01-2024',
        room: 'Conference Room B',
        organizer: 'Bob Smith',
        description: 'Product development meeting',
    },
    {
        start_time: '14:00',
        end_time: '15:30',
        date: '15-01-2024',
        room: 'Conference Room C',
        organizer: 'Charlie Brown',
        description: 'Team building workshop',
    },
    {
        start_time: '16:00',
        end_time: '17:30',
        date: '15-01-2024',
        room: 'Conference Room D',
        organizer: 'David Miller',
        description: 'Financial review and planning',
    },
];

const MeetingList = () => {
    const meetings = mockData;
    const navigate = useNavigate();

    const onCreateClick = () => {
        navigate('/create-meeting');
    }

    return (
        <MainDiv>
            <TableHeader>Upcoming meetings</TableHeader>
            <MeetingTable meetings={meetings}></MeetingTable>
            <CreateButton variant="success" onClick={onCreateClick}>Create meeting</CreateButton>
        </MainDiv>
    )
};

export default MeetingList;
