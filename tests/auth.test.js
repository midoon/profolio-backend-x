const supertest = require("supertest");
const app = require("../src/application/web");
const { removeTestUser, createTestUser } = require("./test-util");
const logger = require("../src/application/logging");

//REGISTRATION TEST
describe("POST /auth/register", () => {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(app).post("/auth/register").send({
      username: "usernameTest",
      password: "12345678",
      email: "test@gmail.com",
    });

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success Registration");
  });

  it("should reject if request null", async () => {
    const result = await supertest(app).post("/auth/register").send({
      username: "",
      password: "",
      email: "",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation Error");
  });

  it("should reject if request not an email", async () => {
    const result = await supertest(app).post("/auth/register").send({
      username: "usernameTest",
      password: "12345678",
      email: "iniemail",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation Error");
  });

  it("should reject if request duplicate user", async () => {
    let result = await supertest(app).post("/auth/register").send({
      username: "usernameTest",
      password: "12345678",
      email: "test@gmail.com",
    });

    result = await supertest(app).post("/auth/register").send({
      username: "usernameTest",
      password: "12345678",
      email: "test@gmail.com",
    });

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(400);
    expect(result.body.message).toBe("User already exists");
  });
});

//LOGIN TEST
describe("POST /auth/login", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login user", async () => {
    const result = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success login");
    expect(result.body.data.access_token).toBeDefined();
    expect(result.body.data.refresh_token).toBeDefined();
    expect(result.body.data.user_id).toBeDefined();
  });

  it("should reject login if password null", async () => {
    const result = await supertest(app).post("/auth/login").send({
      password: "",
      email: "test@gmail.com",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation Error");
  });

  it("should reject login if email null", async () => {
    const result = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation Error");
  });

  it("should reject login if wrong email", async () => {
    const result = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "testX@gmail.com",
    });

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(404);
    expect(result.body.message).toBe("Wrong email or password");
  });

  it("should reject login if wrong password", async () => {
    const result = await supertest(app).post("/auth/login").send({
      password: "12345678x",
      email: "test@gmail.com",
    });

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(404);
    expect(result.body.message).toBe("Wrong email or password");
  });
});

//REFRESH TEST
describe("POST /auth/refresh", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get access token", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const refresh_token = logedUser.body.data.refresh_token;

    const result = await supertest(app).post("/auth/refresh").send({
      refresh_token: refresh_token,
    });

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success Get Access Token");
    expect(result.body.data.access_token).toBeDefined();
  });

  it("should reject if refresh token wrong", async () => {
    const result = await supertest(app).post("/auth/refresh").send({
      refresh_token: "token salah",
    });

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(400);
    expect(result.body.message).toBe("Refresh Error");
  });

  it("should reject if refresh token null", async () => {
    const result = await supertest(app).post("/auth/refresh").send({});

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation Error");
  });
});

//LOGOUT TEST
describe("POST /auth/logout", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can logout", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        user_id: user_id,
      });

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success logout");
  });

  it("should reject logout if wrong user_id", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        user_id: "id salah",
      });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should reject logout if when have logout in the begening", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result1 = await supertest(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        user_id: user_id,
      });

    const result = await supertest(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        user_id: user_id,
      });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });

  it("should reject logout if wrong access token", async () => {
    const result = await supertest(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer x`)
      .send({
        user_id: "id-test-1",
      });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });

  it("should reject logout if request not contain access token", async () => {
    const result = await supertest(app).post("/auth/logout").send({
      user_id: "id-test-1",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});
