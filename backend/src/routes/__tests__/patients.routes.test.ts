import request from "supertest";
import app from "../..";

describe("Patients API", () => {
  it("GET /patients should return a list of patients", async () => {
    const res = await request(app).get("/api/patients");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.patients) || Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /patients/:patientId should return a patient or 404", async () => {
    const patientId = "testPatientId"; // Replace with a real or mock ID
    const res = await request(app).get(`/api/patients/${patientId}`);
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty("patient_id");
    }
  });

  it("GET /patients/:patientId/:testId should return lab results or 404", async () => {
    const patientId = "testPatientId"; // Replace with a real or mock ID
    const testId = "testTestId"; // Replace with a real or mock test ID
    const res = await request(app).get(`/aoi/patients/${patientId}/${testId}`);
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body)).toBe(true);
    }
  });
});