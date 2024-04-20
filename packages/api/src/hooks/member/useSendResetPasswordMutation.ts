import { useMutation } from "@tanstack/react-query";
import { post } from "@ygtang/http";

interface SendResetPasswordMutationProps {
  onSuccess?: (
    data: unknown,
    variables: SendResetPasswordMutationParams,
    context: unknown,
  ) => void | Promise<unknown>;
  onError?: (
    data: { message?: string },
    variables: SendResetPasswordMutationParams,
    context: unknown,
  ) => void | Promise<unknown>;
}

export interface SendResetPasswordMutationParams {
  email: string;
}

/**
 * `/api/v1/members/sends-email/reset-passwords`
 *
 * 초기화된 비밀번호를 이메일로 전송한다.
 */
export function useSendResetPasswordMutation({
  onSuccess,
  onError,
}: SendResetPasswordMutationProps) {
  return useMutation<
    undefined,
    { message?: string },
    SendResetPasswordMutationParams
  >({
    mutationFn: async ({ email }: SendResetPasswordMutationParams) =>
      await post<undefined>(`/v1/members/sends-email/reset-passwords`, {
        json: { email },
      }),
    onSuccess,
    onError,
  });
}