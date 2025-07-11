process.removeAllListeners("warning");
import { google } from "googleapis";
import { config } from "dotenv";
config();
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
export default oAuth2Client;
