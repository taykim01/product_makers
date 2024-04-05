import CodeResponse from "@/app/code_response";
import { blank } from "@/app/data";
import { Result } from "@/app/types";
import OpenAIService from "@/data/service/open_ai_service";

export default class CreateFillInTheBlankUseCase {
  quoteKeyPhrases(rawText: string, questionNum: number): CodeResponse {
    const quoteKeyPhrasesPrompt: string =
      "Extract " +
      questionNum +
      " quotes from the following text:\n" +
      rawText +
      "\nPlease give me the quotes in a format of a string list.";
    const quoteList: string[] = []; //quoteKeyPhrasesPrompt를 기반으로 openAI의 답변

    const open_ai_service = new OpenAIService();
    const keyPhraseResponse = open_ai_service.getQuoteKeyPhrases(
      quoteKeyPhrasesPrompt
    );

    if (quoteList.length !== questionNum) {
      return new CodeResponse(
        Result.ERROR,
        "quoteList에서 에러가 발생하였습니다. 뽑아낸 quote의 개수가 사용자가 원하는 문제의 개수와 다릅니다.",
        ""
      );
    } else {
      return new CodeResponse(
        keyPhraseResponse.result,
        keyPhraseResponse.errorCode,
        keyPhraseResponse.payload
      );
    }
  }

  createQuestion(
    questionNum: number,
    blankNum: number,
    quoteList: string[],
    exclusion: string,
    inclusion: string
  ): CodeResponse {
    let combinationList: number[] = [];
    let question: string = "";
    const questionList: string[] = [];
    const keywordList: object[] = []; // [{keyword1: "키워드1", keyword2: "키워드2", keyword3: "키워드3"}, {keyword1: "키워드1", keyword2: "키워드2", keyword3: "키워드3"}, ...]
    let keywordValues: string[] = [];

    const promptQuoteList = [];
    for (let i = 0; i < questionNum; i++) {
      promptQuoteList.push(quoteList[i]);
    }

    const prompt = `${promptQuoteList}에서 키워드를 3개 추출하되, 반드시 다음은 포함해줘: ${inclusion}, 그리고 절대로 다음은 포함하지 말아줘: ${exclusion}`;
    const open_ai_service = new OpenAIService();
    const getQuestionResponse = open_ai_service.getQuestion(prompt);

    for (let i = 0; i < questionNum; i++) {
      //랜덤으로 blank를 뚫어준 뒤, questionList에 저장해주는 코드
      combinationList = [];
      question = quoteList[i];
      keywordValues = Object.values(keywordList[i]); // ["키워드1", "키워드2", "키워드3"]

      if (blankNum < 3) {
        let r1 = Math.floor(Math.random() * 3);
        combinationList.push(r1);

        if (blankNum === 2) {
          let r2 = -1;
          while (true) {
            r2 = Math.floor(Math.random() * 3);
            if (r1 != r2) break;
          }
          combinationList.push(r2);
          combinationList.sort();
        }
      } else {
        combinationList = [0, 1, 2];
      }

      for (let j = 0; j < combinationList.length; j++) {
        question = question.replace(keywordValues[combinationList[j]], blank); //combinationList[j] = 0, 1, 2 중 하나의 인덱스
        questionList[i] = question;
      }
    }

    return new CodeResponse(
      getQuestionResponse.result,
      getQuestionResponse.errorCode,
      getQuestionResponse.payload
    );
  }
}
