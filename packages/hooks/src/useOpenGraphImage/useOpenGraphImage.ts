import { SyntheticEvent, useEffect, useState } from 'react';

interface UseOpenGraphImageProps {
  url: string | undefined | null;
  image: string | undefined | null;
}

export default function useOpenGraphImage({ url, image }: UseOpenGraphImageProps) {
  const [src, setSrc] = useState<string>(url && image ? url + image : '');

  useEffect(() => {
    // NOTE: initial state를 og.url + og.image로 한 이유는
    // og.image가 안되는 경우가 상대주소로 작성이 되어 있어 영감탱 서버에 요청하기 때문
    if (url && image) {
      setSrc(url + image);
    } else if (image) {
      setSrc(image);
    }
  }, [image, url]);

  const onImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (!image) return;

    // NOTE: 두번째로 시도하는 og.image에서도 에러를 발생할 경우
    if (e.currentTarget.src === image) return;
    setSrc(image);
  };

  return { src, onImageError };
}
