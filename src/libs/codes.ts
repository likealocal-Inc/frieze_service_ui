export interface CodeType {
  code: string;
  msg: string;
}
export const CODES = {
  NO_AUTH: <CodeType>{
    code: "NO_AUTH",
    msg: "NO_AUTH",
  },
  ALREADY_EXIST_EMAIL: <CodeType>{
    code: "ALREADY_EXIST_EMAIL",
    msg: "Exist alreay email",
  },
  API_CALL_ERROR: <CodeType>{
    code: "API_CALL_ERROR",
    msg: "API 호출 오류",
  },
};
