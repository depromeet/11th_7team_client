import { MemberResponseInterface } from "./member";

export interface TagInterface {
  id: number;
  count?: number;
  memberResponse: MemberResponseInterface;
  content: string;
  createdDatetime: string;
  updatedDatetime: string;
}

export type TagType = Pick<TagInterface, "content" | "id" | "count">;
