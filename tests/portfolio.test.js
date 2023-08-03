const logger = require("../src/application/logging");
const {
  removeTestUser,
  createTestUser,
  deleteImage,
  deleteImagePortfolio,
  deletePortfolio,
} = require("./test-util");
const supertest = require("supertest");
const app = require("../src/application/web");

//CREATE PORTFOLIO
describe("POST /portfolios/", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
    await deletePortfolio();
  });

  it("should can create new porto with image", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const jsonData = {
      title: "test title",
      tag: "tag,test",
      link: "test.com",
      description: "test desc",
    };

    // Baca konten file sebagai buffer
    const fs = require("fs");
    const path = require("path");
    const fileContent = fs.readFileSync(
      path.join(__dirname, "/assetsTesting/testImg.png")
    );

    const result = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);
    await deleteImagePortfolio();

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success Create Portfolio Data");
  });

  it("should can create portfolio without image", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        title: "test title",
        tag: "tag,test",
        link: "test.com",
        description: "test desc",
      });

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success Create Portfolio Data");
  });

  it("should reject create portfolio if the http body contain empty property ", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .post("/portfolios/")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        title: "test title",
      });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation Error");
  });

  it("should reject if user unauthorized", async () => {
    const result = await supertest(app).post("/portfolios/").send({
      title: "test title",
      tag: "tag,test",
      link: "test.com",
      description: "test desc",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});
