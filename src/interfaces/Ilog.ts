import { IBase } from "./Ibase";

export interface IdataToLog extends IBase {
  objectToCreate: string;
  errorMessage?: string;
  status: number;
}