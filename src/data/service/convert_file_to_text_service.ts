import CodeResponse from '@/app/code_response';
import { Result } from '@/app/types';
import Tesseract from 'tesseract.js';

export default class ConvertFileToTextService {
  async convert(file: File): Promise<CodeResponse> {
    try {
      const { data } = await Tesseract.recognize(file, 'kor+eng');
      return new CodeResponse(Result.SUCCESS, "변환성공", data.text);
    } catch (error) {
      return new CodeResponse(Result.ERROR, "변환 실패", error);
    }
  }
}
