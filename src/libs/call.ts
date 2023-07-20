import { CodeType } from "./codes";

export type ApiCallResponseData = {
  success: boolean;
  code?: CodeType;
  message?: string;
  data?: any;
};

export const CallInfo = {
  urlBase: "http://localhost:8080/api",
};
