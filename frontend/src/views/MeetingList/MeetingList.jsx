import React from "react";
import styled from "styled-components";
import Table from 'react-bootstrap/Table';


const mockData = [
    {
        start_time: '09:00 AM 15-01-2024',
        end_time: '10:30 AM 15-01-2024',
        room: 'Conference Room A',
        organizer: 'Alice Johnson',
        description: 'Discuss marketing strategy',
    },
    {
        start_time: '11:00 AM 15-01-2024',
        end_time: '12:30 PM 15-01-2024',
        room: 'Conference Room B',
        organizer: 'Bob Smith',
        description: 'Product development meeting',
    },
    {
        start_time: '02:00 PM 15-01-2024',
        end_time: '03:30 PM 15-01-2024',
        room: 'Conference Room C',
        organizer: 'Charlie Brown',
        description: 'Team building workshop',
    },
    {
        start_time: '04:00 PM 15-01-2024',
        end_time: '05:30 PM 15-01-2024',
        room: 'Conference Room D',
        organizer: 'David Miller',
        description: 'Financial review and planning',
    },
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

const MeetingPar = styled.p`
    margin: 10px;
`

const MeetingItem = ({ meeting }) => {
    // return (
    //     <RowDiv>
    //         <MeetingPar>{ meeting.start_time }</MeetingPar>
    //         <MeetingPar>{ meeting.end_time }</MeetingPar>
    //         <MeetingPar>{ meeting.room }</MeetingPar>
    //         <MeetingPar>{ meeting.organizer }</MeetingPar>
    //         <MeetingPar>{ meeting.description }</MeetingPar>
    //     </RowDiv>
    // )
    return (
        <tr style={{marginBottom: '50px'}}>
            <td>{ meeting.start_time }</td>
            <td>{ meeting.end_time }</td>
            <td>{ meeting.room }</td>
            <td>{ meeting.organizer }</td>
            <td>{ meeting.description }</td>
        </tr>
    )
};

const MeetingList = () => {
    const meetings = mockData;
    console.log(meetings);

    // return (
    //     <MainDiv>
    //         <h2>Upcoming meetings</h2>
    //         {meetings.map((meeting, index) => (
    //             <MeetingItem key={index} meeting={meeting} />
    //         ))}
    //     </MainDiv>
    // )
    return (
        <>
        <h2 style={{textAlign: 'center'}}>Upcoming meetings</h2>
        <Table striped bordered hover size="lg">
            <thead>
                <tr>
                    <th>Start time</th>
                    <th>End time</th>
                    <th>Room</th>
                    <th>Organizer</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {meetings.map((meeting) => (
                    <MeetingItem meeting={meeting} />
                ))}
            </tbody>
        </Table>
        </>
    )
};

export default MeetingList;
