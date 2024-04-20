import { css } from "@emotion/react";
import { useGetInspirations } from "@ygtang/api";
import { Spacing } from "@ygtang/ui-components";

import Thumbnails from "~/components/Thumbnails";

import { useUserData } from "./hooks/useUserData";

export function LoggedIn() {
  const { tokenRecheck } = useUserData();
  const { data: inspirations, isLoading: isInspirationLoading } =
    useGetInspirations();

  // TODO: 로그아웃 버튼 위치 픽스 후 적용
  const _handleLogout = () => {
    chrome.storage.local.remove(["ygtang-refresh"]);
    tokenRecheck();
    window.close();
  };

  if (isInspirationLoading) {
    return (
      <>
        <Spacing top={2} />
        로딩중임여
        <Spacing bottom={16} />
      </>
    );
  }

  return (
    <>
      <p css={titleTextCss}>최근 모은 영감</p>
      <Spacing top={2} />
      {inspirations ? <Thumbnails inspirations={inspirations} /> : <>없음여</>}
      <Spacing bottom={4} />
    </>
  );
}

const titleTextCss = css`
  color: #5c676a;
  font-size: 16px;
  font-weight: 600;
`;
