import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";

export default class CreateFillInTheBlankUseCase {


    quoteKeyPhrases(rawText: string, questionNum: number): CodeResponse {
        
        const quoteKeyPhrasesPrompt: string = "Extract " + questionNum+ " quotes from the following text:\n" + rawText + "\nPlease give me the quotes in a format of a string list.";
        const quoteList: string[] = []; //quoteKeyPhrasesPrompt를 기반으로 openAI의 답변

        if (quoteList.length != questionNum) {
            return new CodeResponse(Result.ERROR, "quoteList에서 에러가 발생하였습니다. 뽑아낸 quote의 개수가 사용자가 원하는 문제의 개수와 다릅니다.", "")
        }

        //quoteList의 각 quote를 DB에 업로드 (각 quote는 quoteID로 구분)

        return new CodeResponse(Result.SUCCESS, "Quote를 처음 뽑아내는 과정에서 에러가 발생했습니다.", "");
    }
    
    

    createQuestion(questionNum: number, blankNum: number, exclusion: string, inclusion: string): CodeResponse {

        const quoteList: string[] = [];
        const blank: string = "[     ]";
		let combinationList: number[] = [];
		let question: string = "";
        const questionList: string[] = [];
        const keywordList: object[] = [];  // [{keyword1: "키워드1", keyword2: "키워드2", keyword3: "키워드3"}, {keyword1: "키워드1", keyword2: "키워드2", keyword3: "키워드3"}, ...]
        let keywordValues: string[] = [];

        //DB에서 questionNum의 개수만큼 quote를 가져와 quoteList에 저장

        for (let i=0; i<questionNum; i++) {
            const createQuestionPrompt = quoteList[i] + "에서 키워드를 3개 추출하되, 반드시 다음은 포함해줘: inclusion, 그리고 절대로 다음은 포함하지 말아줘: exclusion"
            //keywordList[i]에 createQuestionPrompt를 기반으로 OpenAI의 답변 넣기
            //keywordList[i]의 keyword1, keyword2, keyword3을 DB에 업로드
        }

            
        for (let i=0; i<questionNum; i++) { //랜덤으로 blank를 뚫어준 뒤, questionList에 저장해주는 코드
            combinationList = [];
            question = quoteList[i];
            keywordValues = Object.values(keywordList[i]); // ["키워드1", "키워드2", "키워드3"]
            
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
                questionList[i] = question;
            }
        }

        return new CodeResponse(Result.SUCCESS, "빈칸 문제를 만드는 과정에서 에러가 발생했습니다.", questionList);
    }
}