import {css} from "@emotion/react";

export const accountUpdateWrap = css`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const accountUpdateBody = (show: boolean) => css`
  border-radius: var(--border-radius);
  @media (max-width: 500px) {
    margin: 0 5%;
    width: 80%;
  }

  padding: var(--default-modal-padding-size);
  position: relative;
  background-color: var(--background-color);
  height: 145px;
  width: 300px;
  bottom: ${show ? '-35%' : '-80%'};

  transition: all .3s, height .1s;
  box-shadow: var(--body-box-shadow);
`;

export const invisibleAmountInputDiv = css`
  margin-top: var(--default-padding-size);
  display: flex;
`;

export const invisibleAmountInputLabel = css`
  margin-left: 6px;
  font-size: var(--small-font-size);
  cursor: pointer;
`;

export const accountUpdateButton = css`
  margin-top: var(--default-padding-size);
`;