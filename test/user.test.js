import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { removeTestUser, createTestUser, getTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "rahasia",
      name: "test",
      role_id: "1",
      email: "test@mail.com",
      phone: "085783323182",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.email).toBe("test@mail.com");
    expect(result.body.data.phone).toBe("085783323182");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if username already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "rahasia",
      name: "test",
      role_id: "1",
      email: "test@mail.com",
      phone: "085783323182",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.email).toBe("test@mail.com");
    expect(result.body.data.phone).toBe("085783323182");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "rahasia",
      name: "test",
      role_id: "1",
      email: "test@mail.com",
      phone: "085783323182",
    });

    // logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
      role_id: "",
      email: "",
      phone: "",
    });

    // logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

// describe("POST /api/users/login", function () {
//   beforeEach(async () => {
//     await createTestUser();
//   });

//   afterEach(async () => {
//     await removeTestUser();
//   });

//   it("should can login", async () => {
//     const result = await supertest(web).post("/api/users/login").send({
//       username: "test",
//       password: "rahasia",
//     });

//     logger.info(result.body);
//     expect(result.status).toBe(200);
//     expect(result.body.data.token).toBeDefined();
//     expect(result.body.data.token).not.toBe("test");
//   });

//   it("should reject login if requet is invalid", async () => {
//     const result = await supertest(web).post("/api/users/login").send({
//       username: "",
//       password: "",
//     });

//     logger.info(result.body);
//     expect(result.status).toBe(400);
//     expect(result.body.errors).toBeDefined();
//   });

//   it("should reject login if password is wrong", async () => {
//     const result = await supertest(web).post("/api/users/login").send({
//       username: "test",
//       password: "wrong",
//     });

//     logger.info(result.body);
//     expect(result.status).toBe(401);
//     expect(result.body.errors).toBeDefined();
//   });

//   it("should reject login if username is wrong", async () => {
//     const result = await supertest(web).post("/api/users/login").send({
//       username: "wrong",
//       password: "rahasia",
//     });

//     logger.info(result.body);
//     expect(result.status).toBe(401);
//     expect(result.body.errors).toBeDefined();
//   });
// });

// describe("GET /api/users/current", function () {
//   beforeEach(async () => {
//     await createTestUser();
//   });
//   afterEach(async () => {
//     await removeTestUser();
//   });

//   it("should can get current user", async () => {
//     const result = await supertest(web)
//       .get("/api/users/current")
//       .set("Authorization", "test");

//     logger.info(result.body);

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("test");
//   });

//   it("should reject if token is invalid", async () => {
//     const result = await supertest(web)
//       .get("/api/users/current")
//       .set("Authorization", "wrong");

//     logger.info(result.body);

//     expect(result.status).toBe(401);
//     expect(result.body.errors).toBeDefined();
//   });
// });

// describe("PATCH /api/users/current", function () {
//   beforeEach(async () => {
//     await createTestUser();
//   });

//   afterEach(async () => {
//     await removeTestUser();
//   });

//   it("should can update user", async () => {
//     const result = await supertest(web)
//       .patch("/api/users/current")
//       .set("Authorization", "test")
//       .send({
//         name: "Updated",
//         password: "rahasiaupdated",
//       });

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("Updated");

//     const user = await getTestUser();
//     expect(await bcrypt.compare("rahasiaupdated", user.password)).toBe(true);
//   });

//   it("should can update username only", async () => {
//     const result = await supertest(web)
//       .patch("/api/users/current")
//       .set("Authorization", "test")
//       .send({
//         name: "Updated",
//       });

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("Updated");
//   });

//   it("should can update password only", async () => {
//     const result = await supertest(web)
//       .patch("/api/users/current")
//       .set("Authorization", "test")
//       .send({
//         password: "rahasiaupdated",
//       });

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("test");

//     const user = await getTestUser();
//     expect(await bcrypt.compare("rahasiaupdated", user.password)).toBe(true);
//   });

//   it("should reject if request is invalid", async () => {
//     const result = await supertest(web)
//       .patch("/api/users/current")
//       .set("Authorization", "wrong")
//       .send({});

//     expect(result.status).toBe(401);
//   });
// });

// describe("DELETE /api/users/logout", function () {
//   beforeEach(async () => {
//     await createTestUser();
//   });
//   afterEach(async () => {
//     await removeTestUser();
//   });

//   it("should can logout", async () => {
//     const result = await supertest(web)
//       .delete("/api/users/logout")
//       .set("Authorization", "test");

//     logger.info(result.body);

//     expect(result.status).toBe(200);
//     expect(result.body.data).toBe("OK");

//     const user = await getTestUser();
//     expect(user.token).toBeNull();
//   });

//   it("should reject logout if token is invalid", async () => {
//     const result = await supertest(web)
//       .delete("/api/users/logout")
//       .set("Authorization", "wrong");

//     logger.info(result.body);

//     expect(result.status).toBe(401);
//   });
// });
