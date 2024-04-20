import { FormEvent } from "react";
import { css } from "@emotion/react";
import { useInput } from "@ygtang/hooks";
import { FilledButton, Input } from "@ygtang/ui-components";
import { useTheme, YgtangTheme } from "@ygtang/ui-styles";

import logo from "~/assets/img/logo.svg";
import NavigationBar from "~/components/NavigationBar";

import { useUserData } from "./hooks/useUserData";
import { LoggedIn } from "./LoggedIn";

export function PopupApp() {
  const theme = useTheme();

  const emailInput = useInput({});
  const passwordInput = useInput({});

  const { isLoggedIn, error, login, isLoading, isLoginLoading } = useUserData();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login({
      email: emailInput.value,
      password: passwordInput.value,
    });
  };

  return (
    <>
      <NavigationBar />
      <section css={linkSectionCss}>
        {isLoading ? (
          <></>
        ) : (
          <>
            {isLoggedIn ? (
              <LoggedIn />
            ) : (
              <form onSubmit={handleLogin} css={formCss}>
                <p css={infoTextCss(theme)}>영감탱 계정으로 로그인해주세요.</p>
                {error && <div css={alertBoxCss(theme)}>{error}</div>}
                <Input
                  placeholder="이메일 주소"
                  value={emailInput.value}
                  onChange={emailInput.onChange}
                  required
                  type="email"
                />
                <Input
                  placeholder="비밀번호"
                  value={passwordInput.value}
                  onChange={passwordInput.onChange}
                  required
                  type="password"
                />
                <FilledButton type="submit" disabled={isLoginLoading}>
                  영감탱 계정으로 로그인
                </FilledButton>
              </form>
            )}
          </>
        )}
        <FilledButton
          colorType="light"
          onClick={() => window.open("https://app.ygtang.kr", "_blank")}
        >
          <div css={logoWrapperCss}>
            <img src={logo} />
            영감탱으로 이동
          </div>
        </FilledButton>
      </section>
    </>
  );
}

const linkSectionCss = css`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 8px;
`;

const formCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const infoTextCss = (theme: YgtangTheme) => css`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
  color: ${theme.color.gray05};
`;

const logoWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  img {
    width: 16px;
    height: 16px;
  }
`;

const alertBoxCss = (theme: YgtangTheme) => css`
  display: flex;
  padding: 12px 16px;
  background: ${theme.color.gray04};
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
`;