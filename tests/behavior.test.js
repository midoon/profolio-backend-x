const logger = require("../src/application/logging");
const {
  removeTestUser,
  createTestUser,
  createTestUser2,
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

//COMENT
describe("POST /portfolios/comment/:portfolio_id", () => {
  beforeEach(async () => {
    await createTestUser();
    await createPortfolio();
  });

  afterEach(async () => {
    await removeTestUser();
    await deletePortfolio();
  });
  it("should can create comment", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/comments/portfolio-id-test")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        comment: "test comment",
      });

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success Add Comment");
  });

  it("should reject if comment not string value", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/comments/portfolio-id-test")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        comment: 0,
      });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation Error");
  });

  it("should reject if wrong portfolio id", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/comments/x")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        comment: "test",
      });

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(400);
    expect(result.body.message).toBe("Comment Portfolio Error");
  });

  it("should reject if user unauthorized", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/comments/portfolio-id-test")
      .send({
        comment: "test",
      });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});

//FOLLOW
describe("POST /follows/:user_id", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestUser2();
    await createPortfolio();
  });

  afterEach(async () => {
    await removeTestUser();
    await deletePortfolio();
  });
  it("should can follow other user", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/follows/id-test-2")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success follow");
  });

  it("should can unfollow other user", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const follow = await supertest(app)
      .post("/follows/id-test-2")
      .set("Authorization", `Bearer ${access_token}`);

    const result = await supertest(app)
      .post("/follows/id-test-2")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success unfollow");
  });

  it("should reject follow if user not found", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/follows/x")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(404);
    expect(result.body.message).toBe("User Not Found");
  });
});
