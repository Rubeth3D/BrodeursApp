import pkg from "pg";
const { Client } = pkg;
import winston from "winston";
const client = new Client({
  user: "postgres",
  password: "oracle",
  host: "localhost",
  port: 5000,
});

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

client
  .connect()
  .then(() => logger.log("Connecté à la base de données"))
  .catch((err) => logger.error(err));

export default client;
