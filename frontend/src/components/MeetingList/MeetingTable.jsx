import React, { useEffect, useState } from "react";
import MeetingItem from "./MeetingItem";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { getUpcomingMeetings } from "../../apis/meetingRoomAxios";


const MeetingTable = ({meetings}) => {
    const [meetingList, setMeetingList] = useState([]);

    useEffect(() => {
        getUpcomingMeetings(localStorage.getItem('token'))
        .then(res => setMeetingList(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
        <Table striped bordered hover variant="dark" responsive>
            <thead>
                <tr>
                    <th>Room number</th>
                    <th>Host</th>
                    <th>Date</th>
                    <th>Start time</th>
                    <th>End time</th>
                </tr>
            </thead>
            <tbody>
                {meetingList.map((meeting) => (
                    <MeetingItem key={meeting.id} meeting={meeting} />
                ))}
            </tbody>
        </Table>
    )
};

export default MeetingTable;