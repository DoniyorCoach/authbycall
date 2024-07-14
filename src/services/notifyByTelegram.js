import ky from "ky";
import { config } from "dotenv";

config();

const { BOT_TOKEN, CHAT_ID } = process.env;

const notifyByTelegram = async (text) => {
  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      return;
    }

    await ky.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      json: {
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default notifyByTelegram;
