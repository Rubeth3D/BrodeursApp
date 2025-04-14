import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "winston";
import passport from "passport";
import sessionExpress from "express-session";
import { config } from "dotenv";
import index from "../routes/index.js";
import "../strategies/local-strategie.js";
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
const corsConfig = {
  credentials: true,
  origin: true,
};
config();
const app = express();
app.use(
  sessionExpress({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);
//initialisation du passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use("/index", index);
app.listen(8080, () => {
  logger.info("Le serveur roule sur le port 8080");
});
