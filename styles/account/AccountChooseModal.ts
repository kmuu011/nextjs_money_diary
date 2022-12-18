import {css} from "@emotion/react";

export const accountChooseWrap = css`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const accountChooseBody = (show: boolean) => css`
  border-radius: var(--border-radius);

  padding: var(--default-modal-padding-size);
  position: relative;
  background-color: var(--background-color);
  width: 200px;
  bottom: ${show ? '-30%' : '-80%'};

  transition: all .3s, height .1s;
  box-shadow: var(--body-box-shadow);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const accountChooseItem = css`
  display: flex;
  column-gap: 10px;
  font-size: var(--default-font-size);;

  input[type="checkbox"] {
    position: relative;
    width: 30px;
    height: 30px;
  }
`;