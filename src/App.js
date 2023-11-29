import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import './App.css'; // Import the main stylesheet for styling

const App = () => {
  const [events, setEvents] = useState([]);

  const handleEventCreate = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/">
            <button className="events-button">Create Event</button>
          </Link>
          <Link to="/events">
            <button className="events-button">Events</button>
          </Link>
        </nav>

        {/* Content */}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<EventForm onEventCreate={handleEventCreate} />}
            />
            <Route path="/events" element={<EventList events={events} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
