import express from "express";
import cors from "cors";
import winston from "winston";
import { Client } from "pg";

const client = new Client({
  user: "placeholder",
  password: "placeholder",
  post: "placeholder",
  port: 5000,
  database: "placeholder",
});

client.connect();
const app = express();
app.use(cors());
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

app.get("/cours", async (req, res) => {
  try {
    
  } catch (error) {
    logger.error(error.message);
  }
});

app.get("/cours/:id", async (req,res) => {
  try {
    
  } catch (error) {
    logger.error(error);
  }
})