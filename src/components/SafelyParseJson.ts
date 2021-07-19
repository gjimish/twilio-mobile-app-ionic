export function safelyParseJSON(
    jsonString: string,
    useCase: string,
    fallbackResponseIfError: any,
    logError = false
  ) {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      const errorWithMoreInfo = new Error(e);
      errorWithMoreInfo.message = `${e.message}${useCase} ${JSON.stringify(
        jsonString
      )}`;
      if (logError) {
        (window as any).Sentry.captureException(errorWithMoreInfo);
      }
  
      return fallbackResponseIfError;
    }
  }
  