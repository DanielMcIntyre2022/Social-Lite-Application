import "../StyleComponents/DisplayAttendees.css";
import { useEffect } from 'react';
import { useState } from "react";

function DisplayAttendees(props) {

    console.log(props.rsvpData);

    const [rsvpDataDatabase, setRsvpDataDatabase] = useState([]);

    useEffect(() => {

        setRsvpDataDatabase(props.rsvpData);
    }, [props.rsvpData])

    return (

        <div className="rsvp-display-container">
            <h3>RSVP List</h3>
            <ol>
            {
               rsvpDataDatabase?.map(rsvpData => {
                   return (
                       <div className="attendees-container">
                           <li>{rsvpData}</li>
                        </div>
                    )
                })}
             </ol>
        </div>
    )
}

export default DisplayAttendees;