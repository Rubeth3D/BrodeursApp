process.removeAllListeners("warning");
import { google } from "googleapis";
import { config } from "dotenv";
config();
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

const jwtClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  SCOPES,
  process.env.GMAIL_USER_AUTORISE
);
jwtClient.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
export default jwtClient;
