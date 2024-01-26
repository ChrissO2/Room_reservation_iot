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
                    <th>Room number</th>
                    <th>Meeting name</th>
                    <th>Host</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
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
