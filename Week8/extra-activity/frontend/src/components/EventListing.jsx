import { Link } from "react-router-dom";

const EventListing = ({ event }) => {
  return (
    <div className="job-preview">
      <Link to={`/events/${event._id}`}>
      <h2>{event.title}</h2>
      </Link>
      <p>Date: {(new Date(event.date)).toLocaleDateString()}</p>
      <p>Organizer: {event.organizer.name}</p>
    </div>
  );
};

export default EventListing;
