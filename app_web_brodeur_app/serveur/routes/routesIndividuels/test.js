import express, { json, query } from "express";
import cors from "cors";
import winston from "winston";
import client from "../../bd/postgresBD/Connexion.js";
import bcrypt from "bcrypt";
import passport from "passport";
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
const router = express.Router();
router.use(express.json());
router.post(
  "/auth",
  passport.authenticate("local", { failureRedirect: "/index/fail" }),
  (req, res) => {
    return res.status(200).json;
  }
);
router.get("/fail", (req, res) => {
  res.status(401).json({ message: "Échec d'authentification" });
});
export default router;
