import CodeResponse from '@/app/code_response';
import { Result } from '@/app/types';
import Tesseract from 'tesseract.js';
import axios from 'axios';
// import FormData from 'form-data';

export default class ConvertFileToTextService {
  private apiKey = 'sec_2nBADEiQM30aRKWHQqzeWpe1otKhPErj';

  async convert(file: File): Promise<CodeResponse> {
    if (file.type.includes('pdf')) {
      return this.convertPdfToText(file);
    } else {
      return this.convertImageToText(file);
    }
  }

  private async convertImageToText(file: File): Promise<CodeResponse> {
    try {
      const { data } = await Tesseract.recognize(file, 'kor+eng');
      return new CodeResponse(Result.SUCCESS, "변환 성공", data.text);
    } catch (error) {
      return new CodeResponse(Result.ERROR, "변환 실패", error);
    }
  }

  private async convertPdfToText(file: File): Promise<CodeResponse> {
    try {
      // Upload the PDF file
      const formData = new FormData();
      formData.append('file', file);
      
      const sourceIdResponse = await axios.post('https://api.chatpdf.com/v1/sources/add-file', formData, {
        headers: {
          'x-api-key': this.apiKey,
        },
      });
      const sourceId = sourceIdResponse.data.sourceId;
      const queryResponse = await axios.post('https://api.chatpdf.com/v1/chats/message', {
      sourceId: sourceId,
      messages: [
        {
          role: "user",
          content: "I need plain text of this. Do not rearrange and give me as its order. Do not say anything else."
        }
      ],
    }, {
        headers: {
          'x-api-key': this.apiKey,
        },
      });
      
      const answer = queryResponse.data.content; 

      return new CodeResponse(Result.SUCCESS, "DATA_CONV_SUCCESS", answer);
    } catch (error) {
      console.error(error);
      return new CodeResponse(Result.ERROR, "DATA_CONV_FAIL", error);
    }
  }
}
