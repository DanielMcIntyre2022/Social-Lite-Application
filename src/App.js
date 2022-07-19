import './App.css';
import CreateEvent from './Components/CreateEvent';
import { Routes, Route } from 'react-router-dom';
import EventCreated from './Components/EventCreated';
import EventDisplay from './Components/EventDisplay';
import DisplayAttendees from './Components/DisplayAttendees';

function App() {
  return (
    <div className="App">
      <Routes>
        < Route path="/CreateEvent" element={<CreateEvent/>} />
        < Route path="/EventCreated/:uniqueID" element={<EventCreated />} />
        <Route path="/EventDisplay/:EventID" element={<EventDisplay />} />
        <Route path="/EventDisplay/:EventID" element={<DisplayAttendees />} />
        </Routes>
    </div>
  );
}

export default App;
