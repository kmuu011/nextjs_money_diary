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
  height: 410px;
  width: 400px;
  bottom: ${show ? '-25%' : '-80%'};

  transition: all .3s, height .1s;
  box-shadow: var(--body-box-shadow);
`;

export const contentInput = css`
  margin-top: 10px;

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: var(--small-default-font-size);
  }
`;

export const typeWrap = (radius: boolean) => css`
  padding: 2px;
  background-color: var(--color-2);
  ${radius ? `border-radius: var(--border-radius);` : ``}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const historyType = (checked: boolean, radius: boolean) => css`
  ${radius ? `border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);` : ''}
  height: var(--default-input-height-size);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${checked ? `var(--color-2)` : `var(--color-real-white)`};
  color: ${checked ? `#fff` : `var(--default-font-color)`};
  font-size: var(--small-default-font-size);
`;

export const historyTypeWrap = css`
  margin-top: 10px;
`;

export const categoryWrap = css`
  margin-top: 10px;

  select {
    padding: 0 8px;
    height: var(--default-input-height-size);
    width: 100%;
    font-size: var(--small-default-font-size);
    color: var(--color-2);
  }
`;

export const dateWrap = css`
  margin-top: 10px;

  input {
    width: 100%;
    height: var(--default-input-height-size);
    font-size: var(--small-default-font-size);
    padding: 0 8px;
  }
`;

export const buttonWrap = css`
  margin-top: 10px;
`;

export const deleteButtonWrap = (show: boolean) => css`
  margin-top: 10px;
  ${show ? `
  display:flex;
  column-gap: 10px
  ` : ''}
`;

