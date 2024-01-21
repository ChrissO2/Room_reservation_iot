import React from "react";
import { formatISODate } from "../../utils/date";

const MeetingItem = ({ meeting }) => {
    console.log(meeting);
    return (
        <tr style={{ marginBottom: "50px" }}>
            <td>{meeting.room}</td>
            <td>{meeting.name}</td>
            <td>{meeting.organizer}</td>
            <td>{formatISODate(meeting.start_time)}</td>
            <td>{formatISODate(meeting.end_time)}</td>
        </tr>
    );
};

export default MeetingItem;
