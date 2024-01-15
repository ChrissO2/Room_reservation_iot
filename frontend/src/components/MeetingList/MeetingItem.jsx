import React from "react";

const MeetingItem = ({ meeting }) => {
    return (
        <tr style={{marginBottom: '50px'}}>
            <td>{ meeting.start_time }</td>
            <td>{ meeting.end_time }</td>
            <td>{ meeting.room }</td>
            <td>{ meeting.organizer }</td>
        </tr>
    )
};

export default MeetingItem;