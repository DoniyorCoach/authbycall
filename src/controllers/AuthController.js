import ResponseTexts from "../constants/responseTexts.js";
import makeCallService from "../services/makeCallService.js";
import notifyByTelegram from "../services/notifyByTelegram.js";
import { checkNumber } from "../validators/index.js";

const responseTexts = new ResponseTexts();

const getAuthCodeController = async (req, res) => {
  try {
    const { number } = req.body;

    const isValidNumber = checkNumber(number);
    if (!isValidNumber) {
      return res.json({
        status: 400,
        data: responseTexts.invalidNumber,
      });
    }

    const response = await makeCallService(number);
    if (response.status !== "OK") {
      const statusText = response.status_text;
      await notifyByTelegram(
        `<b>Текст:</b> ${statusText}\n\n<b>Номер телефона:</b> ${number}`,
      );

      if (statusText.startsWith(responseTexts.toManyCallsToOneNumber)) {
        return res.json({
          status: 400,
          data: responseTexts.toManyCallsToOneNumber,
        });
      } else {
        return res.json({
          status: 500,
          data: responseTexts.internalError,
        });
      }
    }

    if (response.balance < 100) {
      await notifyByTelegram(responseTexts.less100rublesLeftOnBalance);
    }

    res.json({ status: 200, data: response.code });
  } catch (error) {
    await notifyByTelegram(error.stack);
    res.json({ status: 500, data: responseTexts.internalError });
  }
};

export { getAuthCodeController };
