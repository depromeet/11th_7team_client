import { useEffect } from "react";
import { css } from "@emotion/react";
import { useGetInspirations } from "@ygtang/api";
import { Button, Spacing } from "@ygtang/ui-components";
import { useTheme, YgtangTheme } from "@ygtang/ui-styles";

import Thumbnails from "~/components/Thumbnails";

import { useUserData } from "./hooks/useUserData";

export function LoggedIn() {
  const theme = useTheme();
  const { tokenRecheck } = useUserData();
  const { data: inspirations, isLoading: isInspirationLoading } =
    useGetInspirations();

  const handleLogout = () => {
    chrome.storage.local.remove(["ygtang-refresh"]);
    tokenRecheck();
    window.close();
  };

  if (isInspirationLoading) {
    return (
      <>
        <Spacing top={8} />
        로딩중임여
        <Spacing bottom={16} />
      </>
    );
  }

  return (
    <>
      <Spacing top={8} />
      {inspirations ? <Thumbnails inspirations={inspirations} /> : <>없음여</>}
      <Spacing bottom={16} />
    </>
  );
}
