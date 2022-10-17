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
  width: 240px;
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  padding: 35px;
`;

export const profileImageBorder = css`
  overflow: hidden;
  width: 180px;
  height: 180px;
  border: 5px solid var(--color-3);
  border-radius: 50%;
  cursor: pointer;
`;

export const inputWarp = css`
  margin-top: var(--default-top-margin);
  width: 100%;

  input {
    font-size: 17px;
  }
`;

export const buttonWrap = css`
  width: 100%;
  
  button {
    margin-top: 10px;
    height: 40px;
  }
`;