import CodeResponse from "@/app/code_response";
import QuoteRepository from "@/data/respository/quote_repository";

export default class ReadQuestionsUseCase {
    async readQuestions(): Promise<CodeResponse> {
        const quote_repository = new QuoteRepository()
        const response = await quote_repository.readQuotes()
        return new CodeResponse(response.result, response.errorCode, response.payload)
    }
}