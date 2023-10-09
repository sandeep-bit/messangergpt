import axios from "axios";
import { sendMessageOptions } from "../interfaces/messagerInterface";
require("dotenv").config();
const TOKEN = process.env.TOKEN;
const PAGE_ID = process.env.PAGE_ID;
export const sendMessage = async (
  senderId: number,
  message: string
): Promise<any> => {
  let options: sendMessageOptions = {
    method: "POST",
    url: `https://graph.facebook.com/v11.0/${PAGE_ID}/messages`,
    params: {
      access_token: TOKEN,
      recipient: JSON.stringify({
        id: senderId,
      }),
      messaging_type: "RESPONSE",
      message: JSON.stringify({
        text: message,
      }),
    },
  };

  let response = await axios.request(options);
  if (response["status"] == 200 && response["data"]["recipient_id"]) {
    return true;
  } else {
    return false;
  }
};
