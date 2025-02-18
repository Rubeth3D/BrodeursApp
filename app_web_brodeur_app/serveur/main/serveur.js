import express from "express";
import cors from "cors";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "server.log" }),
  ],
});

function main() {
  const app = express();
  // const con = mysql.createConnection({
  //   host: "localhost",
  //   user: "scott",
  //   password: "oracle",
  //   database: "mybd",
  // });
  app.listen(8080, () => {
    logger.info("Le serveur roule sur le port 8080");
  });
}
main();
