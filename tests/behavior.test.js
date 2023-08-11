const logger = require("../src/application/logging");
const {
  removeTestUser,
  createTestUser,
  deleteImagePortfolio,
  deletePortfolio,
  getPortfolioId,
  createPortfolio,
} = require("./test-util");
const supertest = require("supertest");
const app = require("../src/application/web");

// LIKE & UNLIKE
describe("POST /portfolios/likes/:portfolio_id", () => {
  beforeEach(async () => {
    await createTestUser();
    await createPortfolio();
  });

  afterEach(async () => {
    await removeTestUser();
    await deletePortfolio();
  });
  it("should can like portfolio", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/likes/portfolio-id-test")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success Like Portfolio");
  });

  it("should can unlike portfolio", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const like = await supertest(app)
      .post("/portfolios/likes/portfolio-id-test")
      .set("Authorization", `Bearer ${access_token}`);

    const result = await supertest(app)
      .post("/portfolios/likes/portfolio-id-test")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success Unlike Portfolio");
  });

  it("should reject if portfolio_id not found", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/likes/portfolio-id-testx")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(400);
    expect(result.body.message).toBe("Like Portfolio Error");
  });

  it("should reject if user unauthorized", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app).post(
      "/portfolios/likes/portfolio-id-testx"
    );
    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});

// BOOKMARK & UNBOOKMARK
describe("POST /portfolios/bookmarks/:portfolio_id", () => {
  beforeEach(async () => {
    await createTestUser();
    await createPortfolio();
  });

  afterEach(async () => {
    await removeTestUser();
    await deletePortfolio();
  });
  it("should can bookmark portfolio", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/bookmarks/portfolio-id-test")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success Add Bookmark");
  });

  it("should can unbookmark portfolio", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const like = await supertest(app)
      .post("/portfolios/bookmarks/portfolio-id-test")
      .set("Authorization", `Bearer ${access_token}`);

    const result = await supertest(app)
      .post("/portfolios/bookmarks/portfolio-id-test")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success UnBookmark Portfolio");
  });

  it("should reject if portfolio_id not found", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/bookmarks/portfolio-id-testx")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(400);
    expect(result.body.message).toBe("Bookmark Portfolio Error");
  });

  it("should reject if user unauthorized", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app).post(
      "/portfolios/bookmarks/portfolio-id-testx"
    );
    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});
