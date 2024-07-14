class ResponseTexts {
  invalidNumber = "Неверный номер";
  internalError = "Внутренняя ошибка сервера";
  invalidEnv = "Не указаны переменные окружения";
  toManyCallsToOneNumber = "Слишком много звонков на один номер в сутки";
  less100rublesLeftOnBalance = "На балансе осталось менее 100 рублей";
  numberOfAllowedCallsHasBeenExceeded =
    "Превышен лимит: Превышено количество допустимых звонков за 5 минут";
  numberOfAllowedCallsHasBeenExceededResponse =
    "Превышено количество допустимых звонков. Попробуйте через 5 минут.";
  failedToDetermineIpAddress = "Не удалось определить IP-адрес";
}

export default ResponseTexts;
