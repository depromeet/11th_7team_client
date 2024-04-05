import { memo } from "react";
import { css, Theme } from "@emotion/react";
import { selectRandomColor } from "@ygtang/ui-styles";

import { InspirationInterface, OpenGraphResponse } from "../types/inspiration";
import ThumbnailContent from "./ThumbnailContent";

export interface ContentThumbnailProps
  extends Pick<InspirationInterface, "type" | "content" | "id"> {
  tags: InspirationInterface["tagResponses"];
  openGraph?: OpenGraphResponse;
  memo: InspirationInterface["memo"];
}

function Thumbnail({
  id,
  type,
  tags,
  content,
  openGraph,
}: ContentThumbnailProps) {
  const moveToInspirationView = (id: number) => {};

  return (
    <article css={wrapperCss}>
      <div css={supportAspectRatioWrapperCss}>
        <div css={contentWrapperCss} onClick={() => moveToInspirationView(id)}>
          <ThumbnailContent
            type={type}
            content={content}
            openGraph={openGraph}
          />
        </div>

        <Tags tags={tags} />
      </div>
    </article>
  );
}

export default memo(Thumbnail);

const wrapperCss = (theme: Theme) => css`
  max-width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  color: ${theme.color.background};
  background-color: ${selectRandomColor(theme, ["gray03", "gray04", "gray05"])};
  border-radius: ${theme.borderRadius.outer};

  @supports not (aspect-ratio: 1) {
    position: relative;

    &::before {
      content: "";
      float: left;
      padding-top: 100%;
    }
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
`;

const supportAspectRatioWrapperCss = css`
  width: 100%;
  height: 100%;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;

  @supports not (aspect-ratio: 1) {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const contentWrapperCss = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${theme.borderRadius.default};
`;

function Tags({ tags }: Pick<ContentThumbnailProps, "tags">) {
  if (tags && tags.length > 0)
    return (
      <div css={tagWrapperCss}>
        {tags.map((eachTag) => (
          <small css={tagCss} key={eachTag.id}>
            #{eachTag.content}
          </small>
        ))}
      </div>
    );

  return null;
}

const tagWrapperCss = css`
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const tagCss = (theme: Theme) => css`
  height: 100%;
  padding: 2px 4px;
  background-color: ${theme.color.dim02};
  border-radius: ${theme.borderRadius.default};
  font-weight: ${theme.font.weight.medium};
  font-size: 10px;
  line-height: 1.2;
  white-space: nowrap;
`;
