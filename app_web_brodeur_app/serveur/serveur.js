import express from "express";
import cors from "cors";
//import logger from "./logger.mjs";




function main(){
const app = express();
app.use(cors());
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "scott",
//   password: "oracle",
//   database: "mybd",
// });



app.listen(8080, () => {
  console.log("Le serveur roule sur le port 8080");
});

}


