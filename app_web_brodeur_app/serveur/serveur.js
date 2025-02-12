import express from "express";
import logger from "./logger.mjs";
const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "scott",
  password: "oracle",
  database: "mybd",
});

// app.get("/",(req,res) =>{
    
// });

app.listen(8080, () => {
    logger.log("info","Le serveur roule sur le port 8080");
} 

);
