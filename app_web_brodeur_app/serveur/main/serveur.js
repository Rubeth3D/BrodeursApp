import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "winston";
import cours from "../routes/cours.js";
import utilisateur from "../routes/utilisateur.js";
import session from "../routes/session.js";
import verificationCookie from "../routes/verify-cookie.js";

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

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/cours", cours);
app.use("/utilisateur", utilisateur);
app.use("/session", session);
app.use("/verify-cookie", verificationCookie);
app.listen(8080, () => {
  logger.info("Le serveur roule sur le port 8080");
});
