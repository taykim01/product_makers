import CodeResponse from "@/app/code_response";
import { Question, Result } from "@/app/types";
import QuoteModel from "@/domain/model/quote_model";
import { doc, collection, setDoc, getDocs, query, where, limit } from "firebase/firestore";
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

  async readQuotes(): Promise<CodeResponse> {
    try {
      const questions: any[] = [];
      const q = query(collection(db, "questions"), limit(20));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        questions.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      return new CodeResponse(Result.SUCCESS, "성공!", questions);
    } catch (error) {
      return new CodeResponse(Result.ERROR, "quote 불러오기 실패", error);
    }
  }
}
