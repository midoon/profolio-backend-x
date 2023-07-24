require("dotenv").config();

const app = require("./application/web");
const logger = require("./application/logging");

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  logger.info("App start...");
});
