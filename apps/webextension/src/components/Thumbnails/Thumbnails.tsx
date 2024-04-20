import { css } from "@emotion/react";
import { InspirationInterface, InspirationType } from "@ygtang/api";
import { Thumbnail } from "@ygtang/ui-components";

interface Props {
  inspirations: InspirationInterface[];
}

export default function Thumbnails({ inspirations }: Props) {
  return (
    <div css={thumbnailWrapperCss}>
      {inspirations.map(
        ({ id, type, content, openGraphResponse, memo, tagResponses }) => (
          <Thumbnail
            key={id}
            id={id}
            type={type as InspirationType}
            content={content}
            tags={tagResponses}
            openGraph={openGraphResponse}
            memo={memo}
          />
        ),
      )}
    </div>
  );
}

const thumbnailWrapperCss = css`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;
