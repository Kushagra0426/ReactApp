import React from 'react';
import './EventList.css';

const EventList = ({ events }) => {
  const eventsByDate = events.reduce((acc, event) => {
    const date = new Date(event.startDateTime);
    const dateString = date.toDateString();

    if (!acc[dateString]) {
      acc[dateString] = [];
    }

    acc[dateString].push(event);

    return acc;
  }, {});

  return (
    <div className="event-list">
      {Object.keys(eventsByDate).map((dateString) => (
        <div key={dateString} className="event-list-item">
          <div className="date-info">
            <p className="date">{new Date(dateString).toLocaleDateString()}</p>
            <p className="day">{new Date(dateString).toLocaleDateString('en-us', { weekday: 'long' })}</p>
          </div>
          <div className="events-container">
            {eventsByDate[dateString].map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-details">
                  <p className="event-name">{event.name}</p>
                  <p className="event-time">{`${new Date(event.startDateTime).toLocaleTimeString()} - ${new Date(event.endDateTime).toLocaleTimeString()}`}</p>
                  <p className="event-location">{event.location}</p>
                  <p className="event-description">{event.description}</p>

                  {/* Display additional options */}
                  <p className="event-options">
                    {event.options && (
                      <span>
                        Tickets: {event.options.hasTickets ? 'Yes' : 'No'} |{' '}
                        Price: {event.options.ticketPrice !== null ? `$${event.options.ticketPrice.toFixed(2)}` : 'Free'} |{' '}
                        Approval Required: {event.options.requiresApproval ? 'Yes' : 'No'} |{' '}
                        Capacity: {event.options.capacity !== null ? event.options.capacity : 'Unlimited'} |{' '}
                        Visibility: {event.options.visibility} |{' '}
                        Multi-Session: {event.options.isMultiSession ? 'Yes' : 'No'}
                      </span>
                    )}
                  </p>
                </div>
                {event.eventImage && (
                  <div className="event-image">
                    <img src={event.eventImage} alt="Event Preview" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
