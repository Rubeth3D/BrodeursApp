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
var mongoClient;
try {
  mongoClient = new MongoClient(url);
  logger.info("Connexion à la BD Mongo...");
  await mongoClient.connect();
  logger.info("Connecté à la BD Mongo!");
} catch (err) {
  if (err instanceof AggregateError) {
    console.error("Plusieurs erreurs de bd Mongo détectées :");
    for (const error of err.errors) {
      console.error(`- Erreur: ${error.message}`);
    }
  } else {
    console.error(`Erreur unique : ${err}`);
  }
  process.exit(1);
}

export default mongoClient;
