import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";

export default class modify_question_use_case {  // 정답.오답 확인하는 메서드
    recreateQuestion(rawText: string, questionNum: number): CodeResponse {
        
        /*
        rawText에서 questionNum의 개수만큼 quote를 뽑아서 list의 형태로 출력해줘.
        openAI에게 quoteList 받아오기
        createQuestion() 함수 호출

        */

        return new CodeResponse(Result.SUCCESS, "문제를 다시 내는 과정에서 에러가 발생했습니다.", "");
    }

    relocateBlank(questionIndex: number, blankNum: number): CodeResponse {

        /*
        예시: 2번 문제를 수정한다고 하면, DB에서 2번 문제 quote와 2번 문제 keywordList를 가져온다.
        DB에서 quote, keyword1, keyword2, keyword3를 가져온다.
        keywordList에 세 개의 keyword를 저장한다.
        

        랜덤으로 1,2,3 중 blankNum의 개수에 맞게 숫자를 추출   (예) 1,3

        추출한 숫자에 맞게 다음을 수행:
        - quote에서 keyword[i] substring 찾기
        - substring을 "[   ]"으로 변경

        변경된 quote를 리턴
        */

        return new CodeResponse(Result.SUCCESS, "빈칸 내는 과정에서 에러가 발생했습니다.", "");
    }
}