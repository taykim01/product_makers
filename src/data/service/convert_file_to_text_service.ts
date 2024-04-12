import CodeResponse from '@/app/code_response';
import { Result } from '@/app/types';
import axios from 'axios';

export default class ConvertFileToTextService {
  private firebaseFunctionUrl = 'https://asia-northeast3-kairos-3326d.cloudfunctions.net/detectText';

  async convert(file: File): Promise<CodeResponse> {
    const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
    
    try {
      // Convert file to Base64
      const base64 = await this.fileToBase64(file);
      const body = fileType === 'pdf' ? { fileType, pdf: base64 } : { fileType, image: base64 };
      
      // Call the Firebase Cloud Function
      const response = await axios.post(this.firebaseFunctionUrl, body, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        return new CodeResponse(Result.SUCCESS, "변환 성공", response.data.text);
      } else {
        throw new Error(`Failed with status: ${response.status}`);
      }
    } catch (error: any) {
      console.error(error);
      return new CodeResponse(Result.ERROR, "변환 실패", error.message || error.toString());
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString().split(',')[1]);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
