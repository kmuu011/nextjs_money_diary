import {css} from "@emotion/react";
import {defaultBodyCss} from "../../common/Common.style";

export const container = css`
  ${defaultBodyCss};
  position: relative;
  text-align: center;
  margin: 0 auto;
  box-shadow: var(--body-box-shadow);
  background-color: var(--color-real-white);
`;

export const chartWrap = css`
  height: 500px;
`;