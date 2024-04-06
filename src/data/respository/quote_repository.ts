import CodeResponse from "@/app/code_response";
import { Question, Result } from "@/app/types";
import QuoteModel from "@/domain/model/quote_model";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default class QuoteRepository {
  async upload(quoteData: Question): Promise<CodeResponse> {
    try {
      const time = new Date();
      const newQuote = new QuoteModel(
        time,
        quoteData.quote,
        quoteData.keyword,
        quoteData.hashtag,
        quoteData.question,
        quoteData.answer
      ).toObject();

      const docRef = doc(collection(db, "questions"));
      await setDoc(docRef, newQuote);
      return new CodeResponse(Result.SUCCESS, "성공!", docRef.id);
    } catch (error) {
      return new CodeResponse(Result.ERROR, "quote 업로드 실패", error);
    }
  }
}
