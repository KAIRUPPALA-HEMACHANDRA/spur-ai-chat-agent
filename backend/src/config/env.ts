export const env = {
  geminiApiKey:
    process.env.GEMINI_API_KEY ??
    (() => {
      throw new Error(
        "GEMINI_API_KEY is missing"
      );
    })(),
};

