import {css} from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: var(--body-box-shadow);
  padding: 10%;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 28px;
`;

export const dataDiv = css`
  margin-top: var(--default-top-margin);
  text-align: left;

  input {
    margin-top: 2px;
  }
`;

export const buttonDiv = css`
  margin-top: var(--default-top-margin);
`;