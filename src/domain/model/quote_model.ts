export default class QuoteModel {
  quote: string;
  keyword: string[];
  question: string;
  hashTag: string;
  createdAt: Date;

  constructor(
    createdAt: Date,
    quote: string,
    keyword: string[],
    hashTag: string,
    question: string
  ) {
    this.createdAt = createdAt;
    this.quote = quote;
    this.keyword = keyword;
    this.hashTag = hashTag;
    this.question = question;
  }

  toObject() {
    return {
      createdAt: this.createdAt,
      quote: this.quote,
      keyword: this.keyword,
      hashTag: this.hashTag,
      question: this.question,
    };
  }
}
