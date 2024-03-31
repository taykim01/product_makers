import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";

export default class ModifyQuestionUseCase {
  // PascalCase로 수정 필요!!

  recreateQuestion(
    rawText: string,
    questionNum: number,
    previousQuotes: string[]
  ): CodeResponse {
    const quoteKeyPhrasesPrompt: string =
      "Extract " +
      questionNum +
      " quotes from the following text:\n" +
      rawText +
      `\nPlease give me the quotes in a format of a string list. Exclude the quotes that have been used in the previous questions, which are: ${previousQuotes}`;
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
        keyPhraseResponse.errorcode,
        keyPhraseResponse.payload
      );
    }
  }

  relocateBlank(
    questionIndex: number,
    blankNum: number,
    quoteList: string[]
  ): CodeResponse {
    try {
      const blank: string = "[     ]";
      let combinationList: number[] = [];
      let question: string = "";
      const questionList: string[] = [];
      const keywordList: object[] = []; // [{keyword1: "키워드1", keyword2: "키워드2", keyword3: "키워드3"}, {keyword1: "키워드1", keyword2: "키워드2", keyword3: "키워드3"}, ...]
      let keywordValues: string[] = [];

      //랜덤으로 blank를 뚫어준 뒤, questionList에 저장해주는 코드
      combinationList = [];
      question = quoteList[questionIndex];
      keywordValues = Object.values(keywordList[questionIndex]); // ["키워드1", "키워드2", "키워드3"]

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
        questionList[questionIndex] = question;
      }
      return new CodeResponse(
        Result.SUCCESS,
        "성공적으로 문제를 수정하였습니다.",
        questionList
      );
    } catch (error) {
      return new CodeResponse(
        Result.ERROR,
        "문제를 수정하는 과정에서 에러가 발생했습니다.",
        error
      );
    }
  }
}
