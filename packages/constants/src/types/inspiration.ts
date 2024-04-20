import { MemberResponseInterface } from "./member";
import { TagInterface } from "./tag";

export type InspirationType = "TEXT" | "IMAGE" | "LINK";

export interface OpenGraphResponse {
  code: number;
  description: string | null;
  siteName: string | null;
  title: string | null;
  url: string | null;
  image: string | null;
}

export interface InspirationInterface {
  id: number;
  memberResponse: MemberResponseInterface;
  tagResponses: TagInterface[];
  type: InspirationType;
  content: string;
  memo: string;
  openGraphResponse: OpenGraphResponse;
  createdDatetime: string;
  updatedDatetime: string;
}
