require("dotenv").config();

const CONFIG = {
  JWT_KEY: process.env.JWT_KEY,
  SA_PATH: process.env.SA_PATH,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
  GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME,
};

module.exports = CONFIG;
