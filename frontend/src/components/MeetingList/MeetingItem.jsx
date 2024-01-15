import React from "react";

const MeetingItem = ({ meeting }) => {
    return (
        <tr style={{marginBottom: '50px'}}>
            <td>{ meeting.room }</td>
            <td>{ meeting.organizer }</td>
            <td>{ meeting.date }</td>
            <td>{ meeting.start_time }</td>
            <td>{ meeting.end_time }</td>
        </tr>
    )
};

export default MeetingItem;