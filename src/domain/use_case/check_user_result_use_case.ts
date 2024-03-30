import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";

export default class CheckUserResultUseCase {  // 정답.오답 확인하는 메서드
    checkResult(userAnswerList: string[], correctAnswerList: string[]): CodeResponse {
        //input: userAnswerList(유저가 작성한 답안 배열), correctAnswerList(정답 배열)을 전달받기
        //중요: keywordList는 blank 여부와 상관없이 chatGPT가 추출한 keyword들이므로, 이 중 실제로 blank가 된 keyword들의 리스트가 따로 필요하다!!!


        
        //resultBooleanList(1: True, 2: False, ... 등 문제에 대해 각각 True/False 값을 넣는 오브젝트 형태의 배열) 만들기
        const resultBooleanList: object[] = [];


        /*
        userAnswerList와 correctAnswerList의 length가 다른 경우 ERROR 리턴
        
        if (userAnswerList.length != correctAnswerList.length) {
            return new CodeResponse(Result.ERROR)
        }


        userAnswerList와 correctAnswerList를 비교하여 resultBooleanList에 저장하기
        
        for (int i=0; i<correctAnswerList.length); i++) {
            resultBooleanList.push({i+1: userAnwerList[i] === correctAnswerList[i]})
        }
        */




        //output: resultBooleanList :object 리턴하기
       return new CodeResponse(Result.SUCCESS, "답안을 체크하는 과정에서 에러가 발생했습니다.", resultBooleanList);
    }
}