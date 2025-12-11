const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Event = require("../models/eventModel");

const Events = [
  {
    title: "Test Event 1",
    date: new Date(),
    location: "Test Location 1",
    organizer: {
      name: "Organizer 1",
      contactEmail: "organizer1@example.com",
      contactPhone: "1234567890",
    },
  },
  {
    title: "Test Event 2",
    date: new Date(),
    location: "Test Location 2",
    organizer: {
      name: "Organizer 2",
      contactEmail: "organizer2@example.com",
      contactPhone: "0987654321",
    },
  },
];

describe("Event Controller", () => {
  beforeEach(async () => {
    await Event.deleteMany({});
    await Event.insertMany(Events);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  // ---------GET /events---------
  it("should fetch all events", async () => {
    const response = await api.get("/api/events").expect(200);
    expect(response.body).toHaveLength(Events.length);
  });

  // ---------GET /events/:eventId---------
  it("should fetch a single event by ID", async () => {
    const eventsAtStart = await Event.find({});
    const eventToFetch = eventsAtStart[0];

    const response = await api
      .get(`/api/events/${eventToFetch._id}`)
      .expect(200);

    expect(response.body.title).toBe(eventToFetch.title);
  });
  it("should return 404 for non-existing event ID", async () => {
    const nonExistingId = new mongoose.Types.ObjectId();
    await api.get(`/api/events/${nonExistingId}`).expect(404);
  });

  // ---------DELETE /events/:eventId---------
  it("should delete an event by ID", async () => {
    const eventsAtStart = await Event.find({});
    const eventToDelete = eventsAtStart[0];

    await api.delete(`/api/events/${eventToDelete._id}`).expect(200);

    const eventsAtEnd = await Event.find({});
    expect(eventsAtEnd).toHaveLength(eventsAtStart.length - 1);
  });
  it("should return 404 when deleting non-existing event ID", async () => {
    const nonExistingId = new mongoose.Types.ObjectId();
    await api.delete(`/api/events/${nonExistingId}`).expect(404);
  });

  // ---------POST /events---------
  it("should create a new event", async () => {
    const newEvent = {
      title: "New Test Event",
      date: new Date(),
      location: "New Test Location",
      organizer: {
        name: "New Organizer",
        contactEmail: "neworganizer@example.com",
        contactPhone: "1122334455",
      },
    };

    await api.post("/api/events").send(newEvent).expect(201);

    const eventsAtEnd = await Event.find({});
    expect(eventsAtEnd).toHaveLength(Events.length + 1);
  });
  it("should return 400 for invalid event data", async () => {
    const invalidEvent = {
      title: "", // Title is required
      date: "invalid-date", // Invalid date format
      location: "Some Location",
      organizer: {
        name: "Organizer",
        contactEmail: "invalid-email", // Invalid email format
        contactPhone: "1234567890",
      },
    };

    await api.post("/api/events").send(invalidEvent).expect(400);
  });

  // ---------PUT /events/:eventId---------
  it("should update an existing event", async () => {
    const eventsAtStart = await Event.find({});
    const eventToUpdate = eventsAtStart[0];

    const updatedData = {
      title: "Updated Test Event",
      location: "Updated Test Location",
    };

    await api
      .put(`/api/events/${eventToUpdate._id}`)
      .send(updatedData)
      .expect(200);

    const updatedEvent = await Event.findById(eventToUpdate._id);
    expect(updatedEvent.title).toBe(updatedData.title);
    expect(updatedEvent.location).toBe(updatedData.location);
  });
  it("should return 404 when updating non-existing event ID", async () => {
    const nonExistingId = new mongoose.Types.ObjectId();
    const updatedData = {
      title: "Updated Test Event",
      location: "Updated Test Location",
    };

    await api.put(`/api/events/${nonExistingId}`).send(updatedData).expect(404);
  });
  it("should return 500 for invalid update data", async () => {
    const eventsAtStart = await Event.find({});
    const eventToUpdate = eventsAtStart[0];

    const invalidData = {
      date: "invalid-date", // Invalid date format
      organizer: {
        contactEmail: "invalid-email", // Invalid email format
      },
    };

    await api
      .put(`/api/events/${eventToUpdate._id}`)
      .send(invalidData)
      .expect(500);
  });
});
