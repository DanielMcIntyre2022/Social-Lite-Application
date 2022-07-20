import "../StyleComponents/CreateEvent.css";
import { useState } from 'react';
import { db } from '../firebase';
import { uid } from "uid";
import { set, ref } from "firebase/database";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import { getStorage, ref as sref, uploadBytes } from "firebase/storage";
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';

function CreateEvent() {

    // store user inputs in state //

    const [titleUserInput, setTitleUserInput] = useState('');
    const [dateUserInput, setDateUserInput] = useState('');
    const [timeUserInput, setTimeUserInput] = useState('');
    const [address, setAddress] = useState('');
    const [setCoordinates] = useState({
        lat: null,
        lng: null,
    })
    const [headerUserInput, setHeaderUserInput] = useState('');
    const [detailsUserInput, setDetailsUserInput] = useState('');
    const [lengthUserInput, setLengthUserInput] = useState('');
    const [emailUserInput, setEmailUserInput] = useState('');
    const [userSubmit, setUserSubmit] = useState('');
    const [error, setError] = useState(false);

    // Create a root reference for storing event photos //

    const storage = getStorage();

    // handle changing user input data //

    const handleTitleChange = (e) => {
        setTitleUserInput(e.target.value);
    }
    const handleDateChange = (e) => {
        setDateUserInput(e.target.value);
    }
    const handleTimeChange = (e) => {
        setTimeUserInput(e.target.value);
    }

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
    }

    const handleDetailsChange = (e) => {
        setDetailsUserInput(e.target.value);
    }
    const handleLengthChange = (e) => {
        setLengthUserInput(e.target.value);
    }
    const handleHeaderChange = (e) => {
        // Create a root reference for storing event photos //
        setHeaderUserInput(e.target.files[0]);
    }

    const handleEmailChange = (e) => {
        setEmailUserInput(e.target.value);
    }

    const navigate = useNavigate();

    // submit user data to database with unique ID for each event //

    const writeToDataBase = () => {
        let uuid = uid()
        if (titleUserInput.length === 0 || dateUserInput.length === 0 || timeUserInput.length === 0 || address.length === 0 || emailUserInput.length === 0) {
            setError(true);
        }
        if (titleUserInput && dateUserInput && timeUserInput && address && emailUserInput) {
            const storageRef = sref(storage, uuid);
            set(ref(db, `/${uuid}`), {
                EventPhoto: headerUserInput,
                EventTitle: titleUserInput,
                EventDate: dateUserInput,
                EventTime: timeUserInput,
                EventLength: lengthUserInput,
                EventLocation: address,
                EventDetails: detailsUserInput,
            });
            setUserSubmit('');
            uploadBytes(storageRef, headerUserInput).then(() => {
                navigate(`/EventCreated/${uuid}`);
            });
        }
    }

    // make call to the backend database to send email user input data //

    const url = 'https://localhost:4000';

    const getEmailInput = () => {
        axios.post(url, { body: { emailUserInput } })
    }
   
    return (
           <>
            < Header />
    <div className="event-creation-container">
            <h1>Create a New Event</h1>
                <form>
            <div className="event-name-container event-input">
        <label for="eventTitle">Name of Event<span>*</span></label>
                        <input type="text" id="EventTitle" value={titleUserInput} onChange={handleTitleChange} /> 
                        {error && titleUserInput === '' ?
                            <label id="form-validation-label">Event name must be filled</label> : ""}
                    </div>
                    <div className="date-time-length">
            <div className="date-input-container event-input">      
                <label for="Date">Date<span>*</span></label>
                            <input type="date" id="EventDate" value={dateUserInput} onChange={handleDateChange} />   
                            {error && dateUserInput === '' ? <label id="form-validation-label">Event date must be filled</label>: ""}
                    </div>    
            <div className="time-input-container event-input">       
                <label for="Time">Time<span>*</span></label>
                <input id="EventTime" type="time" name="time" timezone="timezone" value={timeUserInput} onChange={handleTimeChange} /> 
                        </div>
                        {error && timeUserInput === '' ? <label id="form-validation-label">Event time must be filled</label> : ""}
                    <div className="length-input-container event-input">
                        <label for="Length">Length</label>
                        <input id="EventLength" type="text" value={lengthUserInput} onChange={handleLengthChange} />
                        </div>
                    </div>
            <div className="location-input-container event-input">
                        <label for="Location">Location<span>*</span></label>
                        <PlacesAutocomplete onChange={setAddress} value={address} onSelect={handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (       
                                <div>
                                    <input id="EventLocation" {...getInputProps()} />
                                    <div className="location-suggestions">
                                        {loading ? <div>...loading</div> : null}
                                        {suggestions.map((suggestion) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                            };
                                            return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                                        })}
                                    </div>
                                </div>
                            )}
                            </PlacesAutocomplete>
                    </div> 
                    {error && address ==='' ? <label id="form-validation-label">Event location must be filled</label> : ""}
            <div className="details-input-container event-input">
        <label for="Event_Details">Event Details</label>
                    <textarea type="text" id="EventDetails" value={detailsUserInput} onChange={handleDetailsChange} />
                    </div>
                    <div className="header-input-container event-input">
             <div className="upload-image-flex-container">
        <label for="header_image">Upload Header Image  (optional)</label>
                        <input className="upload-input" type="file" id="
                        EventImage" name="filename" accept="image/png, image/jpeg" onChange={handleHeaderChange} />
                        </div>
                    </div>
                    <div className="orangizer-email-container">
                        <label for="organizer-email">Organizer's Email<span>*</span></label>
                        <p>The event page link will be sent to your email</p>
                        <input id="EventEmail" type="email" name="email" value={emailUserInput} onChange={handleEmailChange} />
                        {error && emailUserInput === '' ? <label id="form-validation-label">Event organizer's email must be entered</label> : ""}
            </div>
                <div className="create-event-btn-container">
                        <button className="event-create-button" type="button" value={userSubmit} onClick={writeToDataBase} onSubmit={getEmailInput}>Create Event</button>
                </div>
        </form>  
    </div>
</>
)}

export default CreateEvent;