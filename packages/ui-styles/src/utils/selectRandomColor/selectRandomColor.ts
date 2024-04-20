import { Theme } from '@emotion/react';

type ColorType = keyof Theme['color'];

export function selectRandomColor(theme: Theme, colorRange: ColorType[]) {
  const randomNumber = Math.floor(Math.random() * colorRange.length);
  const randomColor = colorRange[randomNumber] ?? 'black';

  return theme.color[randomColor];
}
