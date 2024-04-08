import CodeResponse from "@/app/code_response";
import { blank } from "@/app/data";
import { Question, Result } from "@/app/types";
import OpenAIService from "@/data/service/open_ai_service";

export default class CreateFillInTheBlankUseCase {
  async quoteKeyPhrases(
    rawText: string,
    questionNum: number,
    exclusion: string,
    inclusion: string
  ): Promise<CodeResponse> {
    const open_ai_service = new OpenAIService();
    const keyPhraseResponse = await open_ai_service.getQuoteKeyPhrases(
      rawText,
      questionNum,
      exclusion,
      inclusion
    );

    const quoteListString = keyPhraseResponse.payload;
    // console.log("Debug: quoteListString = "+ quoteListString)

    let quoteListArray;
    try {
      quoteListArray = JSON.parse(quoteListString);
    } catch (error) {
      console.log("ERROR: JSON FORMAT")
      quoteListArray = [
        ""
      ];
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

    const getKeywordsResponse = await open_ai_service.getQuestion(
      quoteList,
      exclusion,
      inclusion
    );

    const keywordList = JSON.parse(getKeywordsResponse.payload);
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