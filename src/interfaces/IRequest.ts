import { IBase } from "./Ibase";

export interface IRequestData extends IBase {
  candidateId: string;
  color?: string;
  direction?: string;
}