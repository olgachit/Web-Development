import EventListing from "./eventListing";

const EventListings = ({ events }) => {
  return (
    <div className="job-list">
      {events.map((event) => (
        <EventListing key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventListings;