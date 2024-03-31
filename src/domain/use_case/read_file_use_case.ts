import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";

export default class ReadFileUseCase {
  readFile(file: any): CodeResponse {
    // pdƒ와 이미지를 raw text로 변환
    // input : pdf 또는 img 파일
    // output : raw text
    const convert_file_to_text_service = new ConvertFileToTextService();
    const response = convert_file_to_text_service.convert(file);
    return new CodeResponse(
      response.result,
      response.errorcode,
      response.payload
    );
  }
  readExampleQuestion(file: any): CodeResponse {
    // pdƒ와 이미지를 raw text로 변환
    // input : pdf 또는 img 파일
    // output : raw text
    const convert_file_to_text_service = new ConvertFileToTextService();
    const response = convert_file_to_text_service.file;
    return new CodeResponse(
      response.result,
      response.errorcode,
      response.payload
    );
  }
}
