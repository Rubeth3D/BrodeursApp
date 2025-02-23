import express from "express";
import cors from "cors";
import winston from "winston";
import pkg from "pg";

const {Client} = pkg;

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
client.connect();

const app = express();

app.use(cors());
app.use(express.json());
logger.info("Connecte a la bd!")

app.get("/cours", async (req, res) => {
  try {
  const cours = await client.query("SELECT * FROM cours");
  res.json(descriptionTables.rows);
  } 
  catch (error) {
    logger.error(error.message);
  }
});

app.get("/cours/:idCours", async (req,res) => {
  try {
    const {idCours} = req.params.id;
    const cours = await client.query("SELECT * FROM cours WHERE id_cours = $1",[id_cours]);
    logger.info("Requete effectue avec succes!");
    res.json(cours.rows)
  } catch (error) {
    logger.error(error);
  }
})

app.post("/cours", async (req,res) =>{
  try {
    const { id_cours, code_cours, description_cours, etat_cours, session_id_session } = req.body;    
    logger.info(req.body.rows);
    const nouveauCours = await client.query("INSERT INTO cours (id_cours, code_cours, description_cours, etat_cours, session_id_session) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_cours, code_cours, description_cours, etat_cours, session_id_session]
    );
    
    logger.info("Insert effectue avec succes!");
    logger.info(`Nouveau Cours : ${requete.rows}`);
  } catch (error) {
    logger.error(error);
  }
})

app.put("/cours/:idCours", async (req,res) =>{
  try{
    const {idCours} = req.params.id;
    const {code_cours, description_cours, etat_cours, session_id_session } = req.body;
  }catch(error){
    logger.error(err);
  }
});


app.listen(3000, () => {
  logger.info("Le serveur roule sur le port 3000");
});
