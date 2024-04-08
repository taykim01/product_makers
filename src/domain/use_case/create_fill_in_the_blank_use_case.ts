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
    // console.log("Debug: CreateFillInTheBlankUseCase.quoteKeyPhrases called");
    
    // console.log("Debug: exclusion = " + exclusion);
    // console.log("Debug: inclusion = " + inclusion);

    const open_ai_service = new OpenAIService();
    const keyPhraseResponse = await open_ai_service.getQuoteKeyPhrases(
      rawText, questionNum, exclusion, inclusion
    );

    const quoteListString = keyPhraseResponse.payload;

    let quoteListArray;
    try {
      // console.log("Debug: quoteListString =\n" + quoteListString);
      quoteListArray = JSON.parse(quoteListString);
      // console.log("Debug_alpha: JSON is successfully parsed.")
      // if (quoteListArray.length != questionNum) {console.log("Error_alpha: The number of quotes != number of questionNum.")}
      // else {console.log("Debug_beta: The number of quotes === number of questionNum.")}
      
    } catch (error) {
      quoteListArray = ["Something went wrong.", "We will fix this error soon.", "Thank you for your support and patience."];
      // console.log("Error: JSON is somehow invalid.")
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
    // console.log("Debug: createQuestion called");

    // console.log("Debug: exclusion = " + exclusion);
    // console.log("Debug: inclusion = " + inclusion);

    const open_ai_service = new OpenAIService();

    const finalQuestionList: Question[] = [];

    const getKeywordsResponse = await open_ai_service.getQuestion(
      quoteList, exclusion, inclusion
    );

    const keywordList = JSON.parse(getKeywordsResponse.payload)
    // console.log("Debug_beta: JSON is successfully parsed.")
    //if (keywordList.length != quoteList.length) {console.log("Error_beta: The number of keywords != number of quotes.")}
    //else {console.log("Debug_beta: The number of keywords === number of quotes.")}

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