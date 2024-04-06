export default class QuoteModel {
  createdAt: Date;
  quote: string;
  keyword: string;
  question: string;
  hashTag: string;
  answer: string;

  constructor(
    createdAt: Date,
    quote: string,
    keyword: string,
    hashTag: string,
    question: string,
    answer: string,
  ) {
    this.createdAt = createdAt;
    this.quote = quote;
    this.keyword = keyword;
    this.hashTag = hashTag;
    this.question = question;
    this.answer = answer;
  }

  toObject() {
    return {
      createdAt: this.createdAt,
      quote: this.quote,
      keyword: this.keyword,
      hashTag: this.hashTag,
      question: this.question,
      answer: this.answer,
    };
  }
}
