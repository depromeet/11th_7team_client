import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMemberLoginMutation, useReissueMutation } from "@ygtang/api";
import { setAccessToken } from "@ygtang/http";

export function useUserData() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string>("");

  const { mutate: reissue, isPending: reissuePending } = useReissueMutation({
    onSuccess: ({ data }) => {
      if (data) {
        chrome.storage.local.set({
          "ygtang-refresh": data.refreshToken,
        });
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        setError("");
      }
    },
    onError: () => {
      setIsLoggedIn(false);
      setError("세션 갱신에 실패했습니다. 다시 로그인 해 주세요.");
    },
  });
  const { mutate: login, isPending: loginLoading } = useMemberLoginMutation({
    onSuccess: ({ data }) => {
      chrome.storage.local.set({
        "ygtang-refresh": data.refreshToken,
      });
      setAccessToken(data.accessToken);
      setIsLoggedIn(true);
    },
    onError: (data) => {
      if (data) {
        if (data.message?.includes("404")) {
          setError("아이디 또는 비밀번호가 일치하지 않습니다.");
          return;
        }
        setError(data.message || "알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  // chrome storage 체크
  const {
    isLoading: tokenLoading,
    refetch,
    data: tokenCheckData,
    error: tokenCheckError,
  } = useQuery({
    queryKey: ["ygtang-refresh-token"],
    queryFn: () => chrome.storage.local.get("ygtang-refresh"),
    gcTime: 0,
  });

  useEffect(() => {
    if (tokenCheckData) {
      if (tokenCheckData["ygtang-refresh"]) {
        reissue({ refreshToken: tokenCheckData["ygtang-refresh"] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenCheckData]);

  useEffect(() => {
    if (tokenCheckError) {
      setIsLoggedIn(false);
    }
  }, [tokenCheckError]);

  return {
    isLoggedIn,
    error,
    login,
    isLoading: reissuePending || tokenLoading,
    isLoginLoading: loginLoading,
    tokenRecheck: refetch,
  };
}
