import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";
import ConvertFileToTextService from "@/data/service/convert_file_to_text_service";

export default class ReadFileUseCase {
  async readFile(file: any): Promise<CodeResponse> {
    // pdƒ와 이미지를 raw text로 변환
    // input : pdf 또는 img 파일
    // output : raw text
    const convert_file_to_text_service = new ConvertFileToTextService();
    const response = await convert_file_to_text_service.convert(file);
    return new CodeResponse(
      response.result,
      response.errorCode,
      response.payload
    );
  }
  async readExampleQuestion(file: any): Promise<CodeResponse> {
    // pdƒ와 이미지를 raw text로 변환
    // input : pdf 또는 img 파일
    // output : raw text
    const convert_file_to_text_service = new ConvertFileToTextService();
    const response = await convert_file_to_text_service.convert(file);
    return new CodeResponse(
      response.result,
      response.errorCode,
      response.payload
    );
  }
}
