import React, { useState } from 'react';
import './EventForm.css'; // Import the stylesheet for styling

const EventForm = ({ onEventCreate }) => {
  const [eventName, setEventName] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [hasTickets, setHasTickets] = useState(false);
  const [ticketPrice, setTicketPrice] = useState('');
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [capacity, setCapacity] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [isMultiSession, setIsMultiSession] = useState(false);
  const [sessions, setSessions] = useState([]); // Array to store multiple sessions

  const handleCreateEvent = () => {
    const newEvent = {
      name: eventName,
      startDateTime: `${eventStartDate} ${eventStartTime}`,
      endDateTime: `${eventEndDate} ${eventEndTime}`,
      location: eventLocation,
      options: {
        hasTickets,
        ticketPrice: hasTickets ? (ticketPrice === '' ? null : parseFloat(ticketPrice)) : null,
        requiresApproval,
        capacity: capacity === '' ? null : parseInt(capacity, 10),
        visibility,
        isMultiSession,
        sessions: isMultiSession ? sessions : null,
      },
    };

    onEventCreate(newEvent);

    // Reset form fields
    setEventName('');
    setEventStartDate('');
    setEventStartTime('');
    setEventEndDate('');
    setEventEndTime('');
    setEventLocation('');
    setHasTickets(false);
    setTicketPrice('');
    setRequiresApproval(false);
    setCapacity('');
    setVisibility('public');
    setIsMultiSession(false);
    setSessions([]);
  };

  const handleAddSession = () => {
    const newSession = {
      sessionName: '',
      sessionStartDate: '',
      sessionStartTime: '',
      sessionEndDate: '',
      sessionEndTime: '',
    };

    setSessions([...sessions, newSession]);
  };

  const handleSessionChange = (index, key, value) => {
    const updatedSessions = [...sessions];
    updatedSessions[index][key] = value;
    setSessions(updatedSessions);
  };

  return (
    <div className="event-form">
      <h2>Create Event</h2>
      <form encType="multipart/form-data">
      <label>
        Event Name:
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
      </label>
      <br />
      <label>
        Start Date:
        <input type="date" value={eventStartDate} onChange={(e) => setEventStartDate(e.target.value)} />
      </label>
      <label>
        Start Time:
        <input type="time" value={eventStartTime} onChange={(e) => setEventStartTime(e.target.value)} />
      </label>
      <br />
      <label>
        End Date:
        <input type="date" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} />
      </label>
      <label>
        End Time:
        <input type="time" value={eventEndTime} onChange={(e) => setEventEndTime(e.target.value)} />
      </label>
      <br />
      <label className="event-form-checkbox">
        Multi-Session Event:
        <div className="switch">
          <input
            type="checkbox"
            checked={isMultiSession}
            onChange={() => setIsMultiSession(!isMultiSession)}
          />
          <span className="slider round"></span>
        </div>
      </label>
      {isMultiSession && (
        <div>
          <h3>Sessions</h3>
          {sessions.map((session, index) => (
            <div key={index}>
              <label>
                Session {index + 1} Name:
                <input
                  type="text"
                  value={session.sessionName}
                  onChange={(e) => handleSessionChange(index, 'sessionName', e.target.value)}
                />
              </label>
              <label>
                Session {index + 1} Start Date:
                <input
                  type="date"
                  value={session.sessionStartDate}
                  onChange={(e) => handleSessionChange(index, 'sessionStartDate', e.target.value)}
                />
              </label>
              <label>
                Session {index + 1} Start Time:
                <input
                  type="time"
                  value={session.sessionStartTime}
                  onChange={(e) => handleSessionChange(index, 'sessionStartTime', e.target.value)}
                />
              </label>
              <label>
                Session {index + 1} End Date:
                <input
                  type="date"
                  value={session.sessionEndDate}
                  onChange={(e) => handleSessionChange(index, 'sessionEndDate', e.target.value)}
                />
              </label>
              <label>
                Session {index + 1} End Time:
                <input
                  type="time"
                  value={session.sessionEndTime}
                  onChange={(e) => handleSessionChange(index, 'sessionEndTime', e.target.value)}
                />
              </label>
            </div>
          ))}
          <button onClick={handleAddSession}>Add Session</button>
        </div>
      )}
      <br />
      <label>
        Event Location:
        <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
      </label>
      <br />
      <label>
        Ticket Price (leave blank for free):
        <input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
      </label>
      <br />
      <label className="event-form-checkbox">
        Requires Approval:
        <div className="switch">
          <input
            type="checkbox"
            checked={requiresApproval}
            onChange={() => setRequiresApproval(!requiresApproval)}
          />
          <span className="slider round"></span>
        </div>
      </label>
      <br />
      <label>
        Capacity (leave blank for unlimited):
        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </label>
      <br />
      <label>
        Visibility:
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </label>
      <br />
      <button onClick={handleCreateEvent}>Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
