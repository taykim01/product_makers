import CodeResponse from "@/app/code_response";
import { blank } from "@/app/data";
import { Question, Result } from "@/app/types";
import OpenAIService from "@/data/service/open_ai_service";

export default class CreateFillInTheBlankUseCase {
  async quoteKeyPhrases(
    rawText: string,
    questionNum: number
  ): Promise<CodeResponse> {
    const quoteKeyPhrasesPrompt: string =
      "Extract " +
      questionNum +
      " quotes from the following text:\n" +
      rawText +
      "\nPlease give me the quotes in a JSON format.";

    const open_ai_service = new OpenAIService();
    const keyPhraseResponse = await open_ai_service.getQuoteKeyPhrases(
      quoteKeyPhrasesPrompt
    );

    const quoteListString = keyPhraseResponse.payload;
    let quoteListArray;
    try {
      quoteListArray = JSON.parse(quoteListString);
    } catch (error) {
      quoteListArray = quoteListString;
    }

    return new CodeResponse(
      keyPhraseResponse.result,
      keyPhraseResponse.errorCode,
      quoteListArray
    );
  }

  async createQuestion(
    quoteList: string[],
    exclusion: string,
    inclusion: string
  ): Promise<CodeResponse> {
    const open_ai_service = new OpenAIService();

    const finalQuestionList: Question[] = [];

    const getKeywordPrompt = `Get the single most important keyword from each of the following sentences: ${Array.isArray(quoteList) ? quoteList.join(", ") : quoteList}.
      \nInclude the following words, if possible: ${inclusion}.
      \nExclude the following words: ${exclusion}.
      \nReturn the result in the following format: [(keyword for sentence 1), (keyword for sentence 2), (keyword for sentence 3), etc].`;
    const getKeywordsResponse = await open_ai_service.getQuestion(
      getKeywordPrompt
    );
    

    const keywordList = JSON.parse(getKeywordsResponse.payload)

    if (getKeywordsResponse.result === Result.SUCCESS) {
      for (let i = 0; i < quoteList.length; i++) {
        finalQuestionList.push({
          answer: "",
          createdAt: new Date(),
          quote: quoteList[i],
          keyword: keywordList[i],
          question: quoteList[i].replace(keywordList[i], blank),
          hashtag: "",
        });
      }

      return new CodeResponse(
        getKeywordsResponse.result,
        getKeywordsResponse.errorCode,
        finalQuestionList
      );
    } else {
      return new CodeResponse(
        getKeywordsResponse.result,
        getKeywordsResponse.errorCode,
        {}
      );
    }
  }
}
