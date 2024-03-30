import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";

export default class ModifyQuestionUseCase {  // PascalCase로 수정 필요!!


    recreateQuestion(rawText: string, questionNum: number): CodeResponse {
        
        const quoteKeyPhrasesPrompt: string = "Extract " + questionNum+ " quotes from the following text:\n" + rawText + "\nPlease give me the quotes in a format of a string list.";
        const quoteList: string[] = []; //quoteKeyPhrasesPrompt를 기반으로 openAI의 답변

        if (quoteList.length != questionNum) {
            return new CodeResponse(Result.ERROR, "quoteList에서 에러가 발생하였습니다. 뽑아낸 quote의 개수가 사용자가 원하는 문제의 개수와 다릅니다.", "")
        }

        //quoteList의 각 quote를 DB에 업로드 (각 quote는 quoteID로 구분)

        return new CodeResponse(Result.SUCCESS, "Quote를 다시 뽑아내는 과정에서 에러가 발생했습니다.", "");
    }



    relocateBlank(questionIndex: number, blankNum: number): CodeResponse {

        const quoteList: string[] = [];
        const blank: string = "[     ]"
        let combinationList: number[] = [];
        let question: string = "";
        const keywordList: object[] = [];  //DB에서부터 keywordList 가져오기
        const questionList: string[] = [];
        
        let keywordValues: string[] = Object.values(keywordList[questionIndex]); // ["키워드1", "키워드2", "키워드3"];
				
        //DB에서 questionNum의 개수만큼 quote를 가져와 quoteList에 저장
        
        question = quoteList[questionIndex];
        
        if (blankNum <3) {
            let r1 = Math.floor(Math.random() * 3);
            combinationList.push(r1);
                
            if (blankNum === 2) {
                let r2 = -1;		
                while(true){
                    r2 = Math.floor(Math.random() * 3);
                    if (r1 != r2) break;
                }
                combinationList.push(r2);
                combinationList.sort();
            }
        } else {combinationList = [0,1,2];}
            
        for (let j=0; j<combinationList.length; j++) {						
            question = question.replace(keywordValues[combinationList[j]], blank); //combinationList[j] = 0, 1, 2 중 하나의 인덱스
            questionList[questionIndex] = question;
        }

        return new CodeResponse(Result.SUCCESS, "빈칸 위치를 수정하는 과정에서 에러가 발생했습니다.", questionList);
    }
    
    
    
    deleteQuestion(questionIndex: number) {
        //quoteList랑 keywordList랑 questionList에서 아얘 빼버린 뒤 questionNum--;
        //혹은, UI적으로 질문만 가리기 (안 그러면 예외 처리 일일히 해야 함)
        
        return new CodeResponse(Result.SUCCESS, "문제를 삭제하는 과정에서 에러가 발생했습니다.", "");
    }
    
    
    
    /*
    setHashtag() {  //어느 UseCase에 넣을지 논의 후 수정 필요!!
		return new CodeResponse(Result.SUCCESS, "해시태그를 다는 과정에서 에러가 발생했습니다.", "");
    }
    */
    
}