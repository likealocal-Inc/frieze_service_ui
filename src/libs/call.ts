import { CodeType } from "./codes";

export type ApiCallResponseData = {
  success: boolean;
  info?: CodeType;
  message?: string;
  data?: any;
};

export const CallInfo = {
  urlBase: process.env.APISERVER,
};
