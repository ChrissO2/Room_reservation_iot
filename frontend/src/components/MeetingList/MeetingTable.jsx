import React, { useEffect, useState } from "react";
import MeetingItem from "./MeetingItem";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { getUpcomingMeetings } from "../../apis/meetingRoomAxios";

const MeetingTable = ({ meetings }) => {
    return (
        <Table striped bordered hover variant="dark" responsive>
            <thead>
                <tr>
                    <th>Nr pokoju</th>
                    <th>Nazwa spotkania</th>
                    <th>Prowadzący</th>
                    <th>Data</th>
                    <th>Godzina rozpoczęcia</th>
                    <th>Godzina zakończenia</th>
                </tr>
            </thead>
            <tbody>
                {meetings.map((meeting) => (
                    <MeetingItem key={meeting.id} meeting={meeting} />
                ))}
            </tbody>
        </Table>
    );
};

export default MeetingTable;
