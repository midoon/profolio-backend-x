const prismaClient = require("../src/application/database");
const bcrypt = require("bcrypt");
const deleteImageInGCS = require("../src/util/deleteImage");
const { v4 } = require("uuid");

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "usernameTest",
    },
  });
};

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      user_id: "id-test-1",
      username: "usernameTest",
      password: await bcrypt.hash("12345678", 10),
      email: "test@gmail.com",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  await prismaClient.biodata.create({
    data: {
      biodata_id: v4().toString(),
      user_id: "id-test-1",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  await prismaClient.address.create({
    data: {
      address_id: v4().toString(),
      user_id: "id-test-1",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  await prismaClient.contact.create({
    data: {
      contact_id: v4().toString(),
      user_id: "id-test-1",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
};

const deleteImage = async () => {
  const biodata = await prismaClient.biodata.findFirst({
    where: {
      user_id: "id-test-1",
    },
  });
  await deleteImageInGCS(biodata.image);
};

const deleteImagePortfolio = async () => {
  const portFolio = await prismaClient.portfolio.findFirst({
    where: {
      user_id: "id-test-1",
    },
  });
  await deleteImageInGCS(portFolio.image);
};

const deletePortfolio = async () => {
  await prismaClient.portfolio.deleteMany({
    where: {
      user_id: "id-test-1",
    },
  });
};

const getPortfolioId = async () => {
  const portfolio = await prismaClient.portfolio.findFirst({
    where: {
      user_id: "id-test-1",
    },
  });

  return portfolio.portfolio_id;
};

const createPortfolio = async () => {
  await prismaClient.portfolio.create({
    data: {
      portfolio_id: "portfolio-id-test",
      title: "test-title",
      tag: "test,tag",
      link: "test.com",
      user_id: "id-test-1",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
};

module.exports = {
  removeTestUser,
  createTestUser,
  deleteImage,
  deleteImagePortfolio,
  deletePortfolio,
  getPortfolioId,
  createPortfolio,
};
