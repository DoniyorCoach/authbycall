import { phone } from "phone";
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

export { checkNumber };
