import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useAuth } from "../../components/Auth/AuthProvider";
import { getRoomsReport, getMeetingsReport } from "../../apis/meetingRoomAxios";
import { useOutletContext } from "react-router";
import { MainDiv, TableDiv } from "./Reports.styles";

const Reports = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [lastMeetings, setLastMeetings] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        getRoomsReport(token)
            .then((res) => setRoomsData(res.data))
            .catch((err) => console.log(err));

        getMeetingsReport(token)
            .then((res) => setLastMeetings(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <MainDiv>
            <TableDiv>
                <h2>Number of meetings in each room</h2>
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                        <tr>
                            <th>Room number</th>
                            <th>No. meetings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomsData.map((room) => (
                            <tr key={room.room_id}>
                                <td>{room.room_id}</td>
                                <td>{room.total_meetings}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableDiv>

            <TableDiv>
                <h2>Meetings in previous 30 days</h2>
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                        <tr>
                            <th>Room number</th>
                            <th>Date</th>
                            <th>Start time</th>
                            <th>End time</th>
                            <th>Host</th>
                            <th>No. partiipants</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lastMeetings.map((meeting) => (
                            <tr>
                                <td>{meeting.room}</td>
                                <td>{meeting.date}</td>
                                <td>{meeting.start_time}</td>
                                <td>{meeting.end_time}</td>
                                <td>{meeting.organizer_name}</td>
                                <td>{meeting.participants}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableDiv>
        </MainDiv>
    );
};

export default Reports;
