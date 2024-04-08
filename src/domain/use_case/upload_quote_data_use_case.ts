import CodeResponse from "@/app/code_response";
import QuoteRepository from "@/data/respository/quote_repository";
import { Question, Result } from "@/app/types";

export default class UploadQuoteDataUseCase {
    async uploadQuoteData(quoteData: Question[]): Promise<CodeResponse> {
        const quote_repository = new QuoteRepository();
        const responseList: Result[] = []
        quoteData.forEach(async (quote) => {
            const response = await quote_repository.upload(quote);
            responseList.push(response.result)
        })

        if (responseList.includes(Result.ERROR)) {
            return new CodeResponse(
                Result.ERROR,
                "DOMAIN_QUOTE_UPLOAD_FAIL",
                {}
            );
        } else {
            return new CodeResponse(
                Result.SUCCESS,
                "DOMAIN_QUOTE_UPLOAD_SUCCESS",
                {}
            );
        }
    }
}