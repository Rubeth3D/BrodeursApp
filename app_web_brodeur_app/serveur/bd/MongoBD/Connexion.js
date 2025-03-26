import { MongoClient } from "mongodb";
import { config } from "dotenv";
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
config();
const url = process.env.MONGO_URL;
console.log(url);
var mongoClient;
try {
  mongoClient = new MongoClient(url);
  logger.info("Connexion à la BD Mongo...");
  await mongoClient.connect();
  logger.info("Connecté à la BD Mongo!");
} catch (err) {
  console.error(`Erreur lors de la connexion à la BD Mongo : ${err}`);
  process.exit(1);
}

export default mongoClient;
