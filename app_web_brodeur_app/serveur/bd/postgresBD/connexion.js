import pkg from "pg";
const { Client } = pkg;
import winston from "winston";
import { config } from "dotenv";

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
config();
const url = process.env.POSTGRES_URL;
console.log(url);
const client = new Client(url);

try {
  logger.info("Connexion à la BD Postgres...");
  await client.connect();
  logger.info("Connecté à la BD Postgres!");
} catch (err) {
  logger.error(`Erreur de BD Postgres : ${err}`);
  process.exit(1);
}

export default client;
