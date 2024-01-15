import React, { useEffect, useState } from "react";
import MeetingItem from "./MeetingItem";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const apiURL = 'http://localhost:8000/api/';

const getMeetings = async () => {

}

const MeetingTable = ({meetings}) => {
    const [meetingList, setMeetingList] = useState([]);

    useEffect(() => {
        axios
        .get(apiURL + 'meetings/')
        .then((res) => setMeetingList(res.data))
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <Table striped bordered hover variant="dark" responsive>
            <thead>
                <tr>
                    <th>Start time</th>
                    <th>End time</th>
                    <th>Room number</th>
                    <th>Organizer</th>
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