import {css} from "@emotion/react";
import {defaultBodyCss} from "../../common/Common.style";

export const container = css`
  ${defaultBodyCss};

  display: flex;
  justify-content: center;
  text-align: center;
  padding: 14px 0 14px 0;
  min-height: 600px;
`;

export const todoListWrap = css`
  padding: 14px;
  display: flex;
  row-gap: 25px;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;

  border: 1px solid #eaeaea;
`;

export const buttonWrap = css`
  display: flex;

  div {
    cursor: pointer;
  }
`;