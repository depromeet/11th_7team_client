import React, { ReactNode } from "react";
import { css, Theme } from "@emotion/react";
import { defaultEasing, defaultFadeInVariants } from "@ygtang/constants";
import { usePreventScroll } from "@ygtang/hooks";
import { motion, Variants } from "framer-motion";

import { dimBackdropCss } from "../shared/styles";
import { PortalWrapper } from "..";

export interface BottomSheetModalProps {
  isShowing: boolean;
  children: ReactNode;
  onClose: VoidFunction;
}

export function BottomSheetModal({
  isShowing,
  children,
  onClose,
}: BottomSheetModalProps) {
  usePreventScroll(true);

  const onDeleteHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };

  return (
    <PortalWrapper isShowing={isShowing}>
      <motion.div
        css={dimBackdropCss}
        onClick={onDeleteHandler}
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={bottomSheetVariants}
          css={contentWrapperCss}
        >
          {children}
        </motion.div>
      </motion.div>
    </PortalWrapper>
  );
}

const MARGIN_TOP = 54;
const MIN_HIEGHT = 208;
const contentWrapperCss = (theme: Theme) => css`
  position: absolute;
  top: 100%;
  transform: translateY(-100%);
  z-index: 1000;

  width: 100%;
  min-height: ${MIN_HIEGHT}px;
  max-height: calc(100% - ${MARGIN_TOP}px);

  background-color: ${theme.color.background};
  border-radius: 8px 8px 0px 0px;

  overflow-y: scroll;
`;

export const bottomSheetVariants: Variants = {
  initial: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "transform",
  },
  animate: {
    y: "-100%",
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "transform",
  },
  exit: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "transform",
  },
};
