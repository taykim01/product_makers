import { ResultCode } from "@/app/types";

const CodeMessage: ResultCode[] = [
  { code: "auth_service/invalid_email", message: "이메일 형식이 올바르지 않습니다." },
  { code: "auth_service/invalid_password", message: "비밀번호는 8자 이상이어야 합니다." },
  { code: "auth_service/invalid_nickname", message: "닉네임은 2자 이상이어야 합니다." },
];

export default CodeMessage;
