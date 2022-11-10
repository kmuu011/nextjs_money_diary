import {css} from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-shadow: var(--body-box-shadow);
  padding: 10%;
`;

export const title = css`
  margin-top: 70px;
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