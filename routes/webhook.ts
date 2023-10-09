import express, { Request, Response } from "express";
const router = express.Router();
require("dotenv").config();
import { chatCompletion } from "../services/openAIServise";
import { sendMessage } from "../services/messangerService";

router.get("/", (req: Request, res: Response) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    let body = req.body;
    let requestType = body.object;
    let senderId = body.entry[0].messaging[0].sender.id;
    let query = body.entry[0].messaging[0].message.text;
    let result = await chatCompletion(query);
    if (result.response !== null) {
      await sendMessage(senderId, result.response);
    }
  } catch (error) {
    console.log(error);
  }
  res.status(200).send("OK");
});

export default router;
