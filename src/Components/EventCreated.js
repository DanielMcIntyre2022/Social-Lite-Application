import { db } from '../firebase';
import { onValue, ref } from "firebase/database";
import { useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import "../StyleComponents/EventCreated.css";

function EventCreated() {

const [eventData, setEventData] = useState([]);

function Copy() {
    var Url = document.getElementById("copy-link-container");
    const copyText = Url.firstElementChild.href;
    navigator.clipboard.writeText(copyText).then(()=> {
        alert('copied');
    });
}

// retireve data from database, including the uid code for the event //
    
    useEffect(() => {
        
        const dbRef = ref(db)
        onValue(dbRef, (response) => {
            const newState = response.val();  
            setEventData(newState);
            const newArray = Object.entries(newState);
            setEventData(newArray);
        })  
    }, [])

    const { uniqueID: unique_ID } = useParams();

    return (

        <ul className='EventData'>
            {
                eventData.filter((data => data[0] === unique_ID)).map((data) => {
                    let eventlink = data[0];

                    return (
                        <>
                            < Header />
                            <div className="event-created-header">
                                <h1>Event Created!</h1>
                                <Link to={`/EventDisplay/${eventlink}`}>View Event</Link>
                            </div>
                            <div className="event-created-container">
                                <p>Your event has been created - a unique link has been generated below that you can share with others </p>
                                <div className="copy-link-button-container">
                                    <div id="copy-link-container">
                                        <Link to={`/EventDisplay/${eventlink}`}>Event Link</Link>
                                    </div>
                                <button className='copy-link-button' onClick={Copy}>Copy Link</button>
                                </div>
                            </div>
                        </>
                    )
                })   
            }
        </ul>
    )
}
    
export default EventCreated;
