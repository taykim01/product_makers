// 박경빈

import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";

export default class OpenAIService {
  getQuoteKeyPhrases(quoteKeyPhrasesPrompt: string): CodeResponse {
    return new CodeResponse(Result.SUCCESS, "", "");
  }

  getQuestion(prompt: string): CodeResponse {
    return new CodeResponse(Result.SUCCESS, "", "");
  }
}
