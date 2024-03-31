import CodeResponse from "@/app/code_response";
import QuoteRepository from "@/data/respository/quote_repository";
import QuoteModel from "../model/quote_model";

export default class UploadQuoteDataUseCase {
    async uploadQuoteData(quoteData: QuoteModel): Promise<CodeResponse> {
        const quote_repository = new QuoteRepository();
        const response = await quote_repository.upload(quoteData);
        return new CodeResponse(
            response.result,
            response.errorCode,
            response.payload
        );
    }
}