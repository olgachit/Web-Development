import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditEventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const navigate = useNavigate();

  const updateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      if (!response.ok) throw new Error("Failed to update event");
      return response.ok;
    } catch (err) {
      console.error(err.message);
      return false;
    }
  };

    useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const data = await response.json();
        setEvent(data);
        setTitle(data.title);
        setDate(new Date(data.date).toISOString().split("T")[0]);
        setLocation(data.location);
        setOrganizerName(data.organizer.name);
        setContactEmail(data.organizer.contactEmail);
        setContactPhone(data.organizer.contactPhone);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const submitForm = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      title,
      date,
      location,
      organizer: {
        name: organizerName,
        contactEmail,
        contactPhone,
      },
    };

    const success = await updateEvent(updatedEvent);
    if (success) {
      console.log("Event updated:", updatedEvent);
      navigate(`/events/${eventId}`);
    } else {
      console.error("Failed to update event");
    }
  };

  return (
    <div className="create">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {event && (
        <form onSubmit={submitForm}>
          <label>Event title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Date:</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label>Location:</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>Organizer Name:</label>
          <input
            type="text"
            required
            value={organizerName}
            onChange={(e) => setOrganizerName(e.target.value)}
          />
          <label>Contact Email:</label>
          <input
            type="email"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <label>Contact Phone:</label>
          <input
            type="tel"
            required
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
          <button type="submit">Update Event</button>
        </form>
      )}
    </div>
  );
};
export default EditEventPage;
