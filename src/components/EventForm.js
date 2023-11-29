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
  const [sessions, setSessions] = useState([]);
  const [eventImage, setEventImage] = useState(null); // New state for the event image
  const [imageTheme, setImageTheme] = useState('light'); // New state for image theme
  const [imageColor, setImageColor] = useState('#ffffff'); // New state for image color
  const [imageTypeface, setImageTypeface] = useState('sans-serif'); // New state for image typeface

  const handleCreateEvent = () => {
    const newEvent = {
      name: eventName,
      startDateTime: `${eventStartDate} ${eventStartTime}`,
      endDateTime: `${eventEndDate} ${eventEndTime}`,
      location: eventLocation,
      options: {
        hasTickets,
        ticketPrice: ticketPrice === '' ? null : parseFloat(ticketPrice),
        requiresApproval,
        capacity: capacity === '' ? null : parseInt(capacity, 10),
        visibility,
        isMultiSession,
        sessions: isMultiSession ? sessions : null,
        eventImage,
        imageTheme,
        imageColor,
        imageTypeface,
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
    setEventImage(null);
    setImageTheme('light');
    setImageColor('#ffffff');
    setImageTypeface('sans-serif');
  
    // Show success alert
    alert("Event created Successfully!")
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="event-form">
      <h2>Create Event</h2>
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
      <label>
        Event Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {eventImage && <img className="preview-image" src={eventImage} alt="Event Preview" />}
      </label>
      <label>
        Image Theme:
        <select value={imageTheme} onChange={(e) => setImageTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label>
        Image Color:
        <input type="color" value={imageColor} onChange={(e) => setImageColor(e.target.value)} />
      </label>
      <label>
        Image Typeface:
        <select value={imageTypeface} onChange={(e) => setImageTypeface(e.target.value)}>
          <option value="sans-serif">Sans-serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>
      </label>
      <br />
      <button onClick={handleCreateEvent}>Create Event</button>
    </div>
  );
};

export default EventForm;
