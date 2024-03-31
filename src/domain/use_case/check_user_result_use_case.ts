import CodeResponse from "@/app/code_response"
import { Result } from "@/app/types"

export default class CheckUserResultUseCase {  // 정답.오답 확인하는 메서드
    checkResult(userAnswerList: string[] ,quoteList: string[], questionList: string[]): CodeResponse {
        // input: 유저가 작성한 답안 리스트(userAnswerList), 정답 포함된 quote리스트(quoteList), blank포함된 question리스트(questionList)
        // output: 정답여부 리스트(resultBooleanList)
        // resultBooleanList(1: True, 2: False, ... 등 문제에 대해 각각 True/False 값을 넣는 배열) 만들기
        // userAnswerList의 각 요소에 앞뒤 공백 제거후 questionList의 각 요소에 "정답정답" 위치에 대체하여 삽입하는 코드

        const questionListWithAnswer: string[] = questionList.map((question, index) => {
            const trimmedAnswer = userAnswerList[index].trim();
            return question.replace("정답정답", trimmedAnswer);
        });

        const resultBooleanList: boolean[] = userAnswerList.map((answer, index) => {
            return answer.trim() === quoteList[index].trim();
        });

        return new CodeResponse(Result.SUCCESS, "답안을 체크하는 과정을 성공적으로 완료했습니다.", resultBooleanList);
    }
}