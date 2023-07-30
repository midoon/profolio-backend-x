const logger = require("../src/application/logging");
const { removeTestUser, createTestUser } = require("./test-util");
const supertest = require("supertest");
const app = require("../src/application/web");

// GET USER TEST
describe("GET /users/:user_id", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get user by user_id", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .get(`/users/${user_id}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success get user data");
    expect(result.body.data).toBeDefined();
    expect(result.body.data.user_id).toBeDefined();
    expect(result.body.data.username).toBeDefined();
    expect(result.body.data.email).toBeDefined();
    expect(result.body.data.biodata).toBeDefined();
    expect(result.body.data.contact).toBeDefined();
    expect(result.body.data.address).toBeDefined();
  });

  it("should reject get user if user_id wrong", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .get(`/users/${user_id}x`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(400);
    expect(result.body.message).toBe("Get User Error");
  });

  it("should reject get user if not authenticated ", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app).get(`/users/${user_id}`);

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});

//get list user
describe("GET /users/", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get list with query name", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const result = await supertest(app)
      .get("/users/")
      .set("Authorization", `Bearer ${access_token}`);

    logger.info("GET LIST USER WITH QUERY SHOULD USING MANUAL TESTING");

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success get list user");
    expect(result.body.data).toBeDefined();
  });

  it("should reject get list user if not authenticated ", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app).get(`/users`);

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});

// edit user
describe("PUT /users/:user_id", () => {});
