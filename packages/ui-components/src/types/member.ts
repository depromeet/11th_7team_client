export interface MemberResponseInterface {
  id: number;
  nickName: string;
  email: string;
  createdDatetime?: string;
}

export type UserInformationType = Omit<MemberResponseInterface, "id">;
