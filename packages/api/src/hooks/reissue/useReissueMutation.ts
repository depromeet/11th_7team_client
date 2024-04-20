import { useMutation } from "@tanstack/react-query";
import { post } from "@ygtang/http";

import { AuthTokenResponseInterface } from "../../types/auth";

interface ReissueMutationRequest {
  refreshToken: string;
}

interface ReissueMutationResponse {
  message: string;
  data: AuthTokenResponseInterface;
}

interface UseReissueMutationProps {
  onSuccess?: (
    data: ReissueMutationResponse,
    variables: ReissueMutationRequest,
    context: unknown,
  ) => void | Promise<unknown>;
  onError?: (
    data: ReissueMutationResponse,
    variables: ReissueMutationRequest,
    context: unknown,
  ) => void | Promise<unknown>;
}

export function useReissueMutation({
  onSuccess,
  onError,
}: UseReissueMutationProps) {
  return useMutation({
    mutationFn: async (data: ReissueMutationRequest) =>
      await post<ReissueMutationResponse>("v1/reissue", {
        headers: {
          "REFRESH-TOKEN": data.refreshToken,
        },
      }),
    onSuccess,
    onError,
  });
}