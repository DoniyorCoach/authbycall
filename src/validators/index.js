import { phone } from "phone";
import { isIP } from "is-ip";

import notifyByTelegram from "../services/notifyByTelegram.js";

const checkNumber = async (number) => {
  try {
    const regex = /^[0-9+]+$/;
    if (!regex.test(number)) {
      return false;
    }

    const { isValid } = phone(number);
    return isValid;
  } catch (error) {
    await notifyByTelegram(error.stack);
    return false;
  }
};

const checkIp = async (ip) => {
  try {
    return isIP(ip);
  } catch (error) {
    await notifyByTelegram(error.stack);
    return false;
  }
};
export { checkNumber, checkIp };
