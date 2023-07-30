const Cloud = require("@google-cloud/storage");
const path = require("path");
const CONFIG = require("../config/env-config");

const serviceKey = path.join(__dirname, CONFIG.SA_PATH);

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: CONFIG.GCP_PROJECT_ID,
});
const bucket = storage.bucket(CONFIG.GCP_BUCKET_NAME);

const deleteImage = async (imageUrl) => {
  try {
    const regex = /\/([^\/]+)$/;
    const matchResult = imageUrl.match(regex);
    const fileName = matchResult ? matchResult[1] : null;
    await bucket.file(fileName).delete();
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteImage;
