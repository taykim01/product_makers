import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";
import QuoteModel from "@/domain/model/quote_model";

export default class QuoteRepository {
  async upload(quoteData: QuoteModel): Promise<CodeResponse> {
    try {
      const time = new Date();
      const newQuote = new QuoteModel(
        time,
        quoteData.quote,
        quoteData.keyword,
        quoteData.hashTag,
        quoteData.question
      ).toObject();

      const docRef = doc(collection(db, "quotes"));

      const result = await setDoc(docRef, newQuote);
      return new CodeResponse(Result.SUCCESS, "성공!", result);
    } catch (error) {
      return new CodeResponse(Result.ERROR, "quote 업로드 실패", error);
    }
  }
}
