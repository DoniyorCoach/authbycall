import ky from "ky";
import queryString from "query-string";
import { config } from "dotenv";

config();

import ResponseTexts from "../constants/responseTexts.js";
import notifyByTelegram from "./notifyByTelegram.js";

const { API_ID, API_URL } = process.env;

const responseTexts = new ResponseTexts();

const makeCallService = async (number) => {
  try {
    if (!API_ID || !API_URL) {
      return { status: 500, data: responseTexts.invalidEnv };
    }

    // Сервис принимает без символа "+"
    number = number.substring(1);

    const postData = queryString.stringify({
      phone: number,
      ip: -1,
      api_id: API_ID,
    });
    const response = await ky
      .post(API_URL, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: postData,
        timeout: 10000,
      })
      .json();

    return response;
  } catch (error) {
    await notifyByTelegram(error.stack);
    return { status: 500, data: responseTexts.internalError };
  }
};

export default makeCallService;
