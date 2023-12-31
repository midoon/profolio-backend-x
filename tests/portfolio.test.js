const logger = require("../src/application/logging");
const {
  removeTestUser,
  createTestUser,
  deleteImagePortfolio,
  deletePortfolio,
  getPortfolioId,
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

//GET PORTFOLIO BY ID
describe("GET /portfolios/:portfolios_id", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
    await deletePortfolio();
  });

  it("should can get portfolio data", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const portfolios_id = await getPortfolioId();

    const result = await supertest(app)
      .get(`/portfolios/${portfolios_id}`)
      .set("Authorization", `Bearer ${access_token}`);
    await deleteImagePortfolio();

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.data).toBeDefined();
  });

  it("shoud not found portfolio if wrong portfolio_id", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;
    const result = await supertest(app)
      .get(`/portfolios/salah`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(404);
    expect(result.body.message).toBe("Portfolio Not Found");
  });

  it("should can reject if user aunautorized", async () => {
    const result = await supertest(app).get(`/portfolios/salah`);

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});

//EDIT PORTFOLIO
describe("PUT /portfolios/:portfolio_id", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
    await deletePortfolio();
  });

  it("should can update portfolio with image and other data", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const portfolios_id = await getPortfolioId();

    const fileCOntent2 = fs.readFileSync(
      path.join(__dirname, "/assetsTesting/testImg2.png")
    );

    const result = await supertest(app)
      .put(`/portfolios/${portfolios_id}`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileCOntent2, "testImg2.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);
    await deleteImagePortfolio();

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success update portfolio");
    expect(result.body.data.portfolio_id).toBeDefined();
  });

  it("should can update portfolio without image", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const portfolios_id = await getPortfolioId();

    const fileCOntent2 = fs.readFileSync(
      path.join(__dirname, "/assetsTesting/testImg2.png")
    );

    const result = await supertest(app)
      .put(`/portfolios/${portfolios_id}`)
      .set("Authorization", `Bearer ${access_token}`)
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);
    await deleteImagePortfolio();

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success update portfolio");
    expect(result.body.data.portfolio_id).toBeDefined();
  });

  it("should reject if user unauhtorized", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const portfolios_id = await getPortfolioId();

    const fileCOntent2 = fs.readFileSync(
      path.join(__dirname, "/assetsTesting/testImg2.png")
    );

    const result = await supertest(app)
      .put(`/portfolios/${portfolios_id}`)
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);
    await deleteImagePortfolio();

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });

  it("should reject if portfolio not found in DB", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const portfolios_id = await getPortfolioId();

    const fileCOntent2 = fs.readFileSync(
      path.join(__dirname, "/assetsTesting/testImg2.png")
    );

    const result = await supertest(app)
      .put(`/portfolios/x`)
      .set("Authorization", `Bearer ${access_token}`)
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);
    await deleteImagePortfolio();

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(400);
    expect(result.body.message).toBe("Update Portfolio Error");
  });
});

//LIST PORTFOLIO

describe("GET /portfolios/", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
    await deletePortfolio();
  });

  it("should can get list porto with default page=1", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const result = await supertest(app)
      .get(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`);

    await deleteImagePortfolio();

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.data.portfolios).toBeDefined();
    expect(result.body.data.paging).toBeDefined();
  });

  it("shoud can show portfolio with test tag from query params", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const result = await supertest(app)
      .get(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .query({ tag: "test" });

    await deleteImagePortfolio();

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.data.portfolios).toBeDefined();
    expect(result.body.data.paging).toBeDefined();
  });

  it("should reject if user anauthorized", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const result = await supertest(app).get(`/portfolios/`);

    await deleteImagePortfolio();

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});

describe('DELETE /portfolios/"portfolio_id', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
    //await deletePortfolio();
  });

  it("should can delete portfolio that contains image", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .attach("image", fileContent, "testImg.png")
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const portfolios_id = await getPortfolioId();

    const result = await supertest(app)
      .delete(`/portfolios/${portfolios_id}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success Delete Portfolio");
  });

  it("should can delete portfolio that contain without image", async () => {
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

    const createPortfolio = await supertest(app)
      .post(`/portfolios/`)
      .set("Authorization", `Bearer ${access_token}`)
      .field("title", jsonData.title)
      .field("tag", jsonData.tag)
      .field("link", jsonData.link)
      .field("description", jsonData.description);

    const portfolios_id = await getPortfolioId();

    const result = await supertest(app)
      .delete(`/portfolios/${portfolios_id}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success Delete Portfolio");
  });

  it("should reject if portfolio id not found or wrong id", async () => {
    const logedUser = await supertest(app).post("/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;
    const user_id = logedUser.body.data.user_id;

    const result = await supertest(app)
      .delete(`/portfolios/x`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(400);
    expect(result.body.message).toBe("Delete Portfolio Error");
  });

  it("should reject if user unauthorized", async () => {
    const result = await supertest(app)
      .delete(`/portfolios/x`)
      .set("Authorization", `Bearer`);

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});
