import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref, update, get} from "firebase/database";
import Header from "./Header";
import "../StyleComponents/EventDisplay.css";
import { getStorage, ref as sref, getDownloadURL } from "firebase/storage";
import DisplayAttendees from "./DisplayAttendees";

function EventDisplay() {
  const storage = getStorage();

  // Create state to store the displayed user Data as well as the uploaded header image //

  const [displayData, setDisplayData] = useState([]);
  const [imageURL, setImageURL] = useState("");

  // Ultize useParams to create a flow of data of user inputs on the create event page to the event display page //

  const { EventID: Event_ID } = useParams();

  // Create a useEffect to retrive the Event Data that is linked to the Event_ID from the database

  useEffect(() => {
    const dbRef = ref(db);
    onValue(dbRef, (response) => {
      const newState = response.val();
      const newArray = Object.entries(newState);
      setDisplayData(newArray);
    });
    getDownloadURL(sref(storage, Event_ID)).then((url) => {
      setImageURL(url);
    });
  }, [storage, Event_ID]);

  // Store state for the RSVP data //

    const [rsvpData, setRsvpData] = useState([]);
    const [rsvpProps, setRsvpProps] = useState([]);

  // Create a function for the RSVP input and then store the EventAttendee data based on RSVP inputs //

  const rsvpInput = (e) => {
    setRsvpData(e.target.value);
  };

  const rsvpToDataBase = () => {
    const dbRef = ref(db, Event_ID);
    get(dbRef).then((response) => {
        const data = response.val();
        if (!data.EventAttendees) {
        update(dbRef, {
            EventAttendees: [rsvpData],  
        }).then(() => {
          get(dbRef).then(event => {
            const newData = event.val();
            setRsvpProps(newData.EventAttendees);
          })
        })   
      } else {
        data.EventAttendees.push(rsvpData);
            update(dbRef, data);
            setRsvpProps(data.EventAttendees);
        }
    });
  };

  useEffect(() => {

        const dbRef = ref(db, Event_ID);
        get(dbRef).then((response) => {
        const data = response.val();
        setRsvpProps(data.EventAttendees);
        });        
    },[Event_ID])

  
  return (
    <ul className="EventDisplay">
      {displayData
        .filter((data) => data[0] === Event_ID)
        .map((eventdata) => {
          return (
            <>
              <Header />
              <div className="event-display-container">
                <div className="event-title-and-image">
                  <div className="event-title-container">
                    <h1>{eventdata[1].EventTitle}</h1>
                     <div className="event-image-container">
                    <img src={imageURL} alt="" />
                  </div>
                    <div className="event-date-time-duration">
                      <p>
                        <div className="event-text">
                          <b>Date:</b>
                        </div>
                        <div>{eventdata[1].EventDate}</div>
                      </p>

                      <p>
                        <div className="event-text">
                          <b>Time:</b>{" "}
                        </div>
                        {eventdata[1].EventTime}
                      </p>

                      <p>
                        <div className="event-text">
                          <b>Duration:</b>
                        </div>
                        {eventdata[1].EventLength}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="event-location-container">
                  <p>
                    <b>Location: {eventdata[1].EventLocation}</b>
                  </p>
                  <iframe
                    id="event-map"
                    title="event-map"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCsCjDI9CzdRbLuqZJdjl8cYB09OZUDa48
                                        &q=${eventdata[1].EventLocation}`}
                  ></iframe>
                </div>
                <div className="event-details-container">
                  <p>
                    <div className="event-text">
                      <b>Event Details:</b>
                    </div>
                    <div className="event-details-text-container">
                      {eventdata[1].EventDetails}
                    </div>
                  </p>
                </div>
                <div className="rvsp-input-area">
                  <input
                    id="rsvp-input"
                    onChange={rsvpInput}
                    type="text"
                    value={rsvpData}
                    placeholder="Type in your name"
                  />
                </div>
                <div className="rsvp-button">
                  <button type="button" onClick={rsvpToDataBase}>
                    RSVP
                  </button>
                </div>
                {
                  rsvpProps &&
                  <DisplayAttendees rsvpData={rsvpProps} />
                }
              </div>
            </>
          );
        })}
    </ul>
  );
}

export default EventDisplay;
