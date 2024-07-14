import ResponseTexts from "../constants/responseTexts.js";
import makeCallService from "../services/makeCallService.js";
import notifyByTelegram from "../services/notifyByTelegram.js";
import { checkIp, checkNumber } from "../validators/index.js";

const responseTexts = new ResponseTexts();

const getAuthCodeController = async (req, res) => {
  try {
    const { number, ip } = req.body;

    const isValidNumber = checkNumber(number);
    if (!isValidNumber) {
      return res.json({
        status: 400,
        data: responseTexts.invalidNumber,
      });
    }

    const isValidIp = await checkIp(ip);
    if (!isValidIp) {
      return res.json({
        status: 400,
        data: responseTexts.failedToDetermineIpAddress,
      });
    }

    const response = await makeCallService(number);
    if (response.status !== "OK") {
      const statusText = response.status_text;
      await notifyByTelegram(
        `<b>Текст:</b> ${statusText}\n\n<b>Номер телефона:</b> ${number}\n<b>IP:</b> ${ip}`,
      );

      if (statusText.startsWith(responseTexts.toManyCallsToOneNumber)) {
        return res.json({
          status: 400,
          data: responseTexts.toManyCallsToOneNumber,
        });
      } else if (
        statusText.startsWith(responseTexts.numberOfAllowedCallsHasBeenExceeded)
      ) {
        return res.json({
          status: 400,
          data: responseTexts.numberOfAllowedCallsHasBeenExceededResponse,
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

    console.log(response.code);
    res.json({ status: 200, data: response.code });
  } catch (error) {
    await notifyByTelegram(error.stack);
    res.json({ status: 500, data: responseTexts.internalError });
  }
};

export { getAuthCodeController };
