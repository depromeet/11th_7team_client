import { useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';

import { ContentThumbnailProps } from './Thumbnail';
import { OpenGraphResponse } from '../types/inspiration';
import { textEllipsisCss } from '@ygtang/ui-styles';
import { useOpenGraphImage } from '@ygtang/hooks'
import { INSPIRATION_EMPTY_IMAGE_SRC } from '@ygtang/constants'

export default function ThumbnailContent({
  type,
  content,
  openGraph,
}: Pick<ContentThumbnailProps, 'type' | 'content' | 'openGraph'>) {
  if (type === 'IMAGE') return <img css={imageCss} alt={`${content} image`} src={content} />;
  if (type === 'LINK') return <LinkContent openGraph={openGraph} />;

  // Text type
  return <p css={textCss}>{content}</p>;
}

const imageCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const textCss = css`
  font-size: 12px;
  padding: 6px;
  line-height: 150%;
`;

function LinkContent({ openGraph }: Pick<ContentThumbnailProps, 'openGraph'>) {
  const [og, setOg] = useState<OpenGraphResponse>();
  const { src, onImageError } = useOpenGraphImage({
    url: og?.url,
    image: og?.image || INSPIRATION_EMPTY_IMAGE_SRC,
  });

  useEffect(() => {
    setOg(openGraph);
  }, []);

  return (
    <div css={linkWrapperCss}>
      <div css={linkImgWrapperCss}>
        {src && <img alt={`${og?.url} thumbnail`} src={src} onError={onImageError} />}
      </div>

      <div css={linkTextWrapperCss}>
        <p>{og?.title}</p>
        <p>{og?.url}</p>
      </div>
    </div>
  );
}

const linkWrapperCss = css`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: calc(100% - 42px) 42px;
  font-size: 10px;
`;

const linkImgWrapperCss = (theme: Theme) => css`
  width: 100%;
  background-color: ${theme.color.dim01};

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const linkTextWrapperCss = (theme: Theme) => css`
  width: 100%;
  padding: 7px 6px;
  background-color: ${theme.color.dim01};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  & p {
    ${textEllipsisCss(1)}
  }
`;
