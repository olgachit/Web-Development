const EventListing = ({ event }) => {
  return (
    <div className="job-preview">
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Organizer: {event.organizer.name}</p>
    </div>
  );
};

export default EventListing;
