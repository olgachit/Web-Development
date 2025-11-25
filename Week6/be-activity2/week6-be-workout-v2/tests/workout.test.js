const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("when there is initially some workouts saved", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0])
      .send(workouts[1]);
  });

  it("should return workouts as json", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should add a new workout successfully", async () => {
    const newWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(newWorkout)
      .expect(201);
  });

  it("should delete a workout successfully", async () => {
    const workoutsAtStart = await workoutsInDb();
    const workoutToDelete = workoutsAtStart[0];

    await api
      .delete(`/api/workouts/${workoutToDelete._id}`)
      .set("Authorization", "bearer " + token)
      .expect(204);

    const workoutsAtEnd = await workoutsInDb();
    expect(workoutsAtEnd).toHaveLength(workoutsAtStart.length - 1);

    const contents = workoutsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(workoutToDelete.title);
  });

  it("should update a workout successfully", async () => {
    const workoutsAtStart = await workoutsInDb();
    const workoutToUpdate = workoutsAtStart[0];

    const updatedWorkoutData = {
      title: "updated title",
      reps: 20,
      load: 200,
    };

    await api
      .put(`/api/workouts/${workoutToUpdate._id}`)
      .set("Authorization", "bearer " + token)
      .send(updatedWorkoutData)
      .expect(200);

    const updatedWorkout = await Workout.findById(workoutToUpdate._id);
    expect(updatedWorkout.title).toBe(updatedWorkoutData.title);
    expect(updatedWorkout.reps).toBe(updatedWorkoutData.reps);
    expect(updatedWorkout.load).toBe(updatedWorkoutData.load);
  });

  it("should retrieve a specific workout by id successfully", async () => {
    const workoutsAtStart = await Workout.find({});
    const workoutToRetrieve = workoutsAtStart[0];

    const response = await api
      .get(`/api/workouts/${workoutToRetrieve._id}`)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(workoutToRetrieve.title);
    expect(response.body.reps).toBe(workoutToRetrieve.reps);
    expect(response.body.load).toBe(workoutToRetrieve.load);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
