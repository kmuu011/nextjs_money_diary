import {css} from "@emotion/react";

export const accountHistoryCategoryDataWrap = css`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const accountHistoryCategoryDataBody = (show: boolean) => css`
  border-radius: var(--border-radius);
  @media (max-width: 500px) {
    margin: 0 5%;
    width: 80%;
  }

  padding: var(--default-modal-padding-size);
  position: relative;
  background-color: var(--background-color);
  height: 350px;
  width: 400px;
  bottom: ${show ? '-25%' : '-80%'};

  transition: all .3s, height .1s;
  box-shadow: var(--body-box-shadow);
`;

export const colorInputWrap = css`
  margin-top: 10px;

  input {
    width: 100%;
    height: 100px;
  }
`;

export const orderChangeButtonWrap = css`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export const orderChangeUpButtonWarp = css`
  width: 100%;
  font-size: 45px;
  color: var(--color-4);
  display: flex;
  justify-content: center;

  img {
    cursor: pointer;
    transform: rotate(-90deg);
  }
`;

export const orderChangeDownButtonWarp = css`
  ${orderChangeUpButtonWarp};

  img {
    transform: rotate(90deg);
  }
`;

export const updateButtonWrap = css`
  margin-top: 10px;
`;

export const deleteButtonWrap = (show: boolean) => css`
  margin-top: 10px;
  ${show ? `
  display:flex;
  column-gap: 10px
  ` : ''}
`;

