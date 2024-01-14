import React from "react";
import styled from "styled-components";

const meetingsData = [
    {
        start_time: '10:00 15-01-2024',
        end_time: '11:00 15-01-2024',
        room: 'Conference Room A',
        organizer: 'John Doe',
        description: 'Planning session for upcoming project',
    },
    {
        start_time: '10:00 15-01-2024',
        end_time: '10:00 15-01-2024',
        room: 'Conference Room A',
        organizer: 'John Doe',
        description: 'Planning session for upcoming project',
    },
    {
        start_time: '10:00 15-01-2024',
        end_time: '10:00 15-01-2024',
        room: 'Conference Room A',
        organizer: 'John Doe',
        description: 'Planning session for upcoming project',
    },
    {
        start_time: '10:00 15-01-2024',
        end_time: '10:00 15-01-2024',
        room: 'Conference Room A',
        organizer: 'John Doe',
        description: 'Planning session for upcoming project',
    }
];

const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
`;

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const MeetingItem = ({ meeting }) => {
    return (
        <RowDiv>
            <p>{ meeting.start_time }</p>
            <hr/>
            <p>{ meeting.end_time }</p>
            <hr/>
            <p>{ meeting.room }</p>
            <hr/>
            <p>{ meeting.organizer }</p>
            <hr/>
            <p>{ meeting.description }</p>
        </RowDiv>
    )
};

const MeetingList = () => {
    const meetings = meetingsData;
    return (
        <MainDiv>
            <h2>Upcoming meetings</h2>
            {meetings.map((meeting, index) => {
                <MeetingItem key={index} meeting={meeting} />
            })}
        </MainDiv>
    )
};

export default MeetingList;
