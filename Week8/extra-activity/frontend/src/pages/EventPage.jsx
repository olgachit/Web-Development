import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const data = await response.json();
        setEvent(data);
        setIsPending(false);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      navigate("/");
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div className="job-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {event && (
        <div>
          <h2>{event.title}</h2>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Location: {event.location}</p>
          <p>Organizer: {event.organizer.name}</p>
          <p>Contact Email: {event.organizer.contactEmail}</p>
          <p>Contact Phone: {event.organizer.contactPhone}</p>
          <button onClick={handleDelete}>Delete Event</button>
        </div>
      )}
    </div>
  );
};

export default EventPage;
