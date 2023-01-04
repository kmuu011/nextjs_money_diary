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

export const topButtonWrap = css`
  padding: 0 var(--default-padding-size);
  margin-top: var(--default-padding-size);
  display: flex;
  column-gap: var(--default-padding-size);
  justify-content: space-around;
`;

export const dateWrap = css`
  display: flex;
`;

export const typeWrap = css`
  width: 30%;
`;

export const chartWrap = css`
  position: relative;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const totalAmount = css`
  position: absolute;
  top: 46%;
`;

