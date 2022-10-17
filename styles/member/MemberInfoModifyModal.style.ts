import {css} from "@emotion/css";

export const container = (show: boolean) => css`
  position: fixed;
  display: ${show ? 'flex' : 'none'};
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0, 0.4);
  z-index: 999;
  justify-content: center;
  align-items: center;
`;

export const modalBody = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  padding: 10px 35px 35px 35px;
`;

export const infoWrap = css`
  margin-top: var(--default-top-margin);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const buttonWrap = css`
  margin-top: 15px;
  width: 100%;
  
  button {
    margin-top: 10px;
    height: 40px;
  }
`;