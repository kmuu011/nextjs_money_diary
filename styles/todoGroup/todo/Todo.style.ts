import {css} from "@emotion/css";

export const container = css`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  padding: 14px 0 14px 0;
  width: 100%;
  min-height: 600px;
`;

export const circleButtonWrap = css`
  position: fixed;
  right: 14px;
  bottom: 150px;
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