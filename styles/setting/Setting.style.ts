import {css} from "@emotion/react";
import {defaultBodyCss} from "../common/Common.style";

export const container = css`
  ${defaultBodyCss};
  position: relative;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: calc(100% - 56px);
  overflow-y: auto;
  box-shadow: var(--body-box-shadow);
`;

export const settingListWrap = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const settingWrap = css`
  width: 100%;
`;

export const optionTitle = css`
  padding: var(--small-padding-size) var(--default-padding-size);
  display: flex;
  align-items: center;
  height: var(--medium-small-button-height-size);
  background-color: var(--color-1);
  color: var(--color-real-white);
`;

export const subOptionWrap = css`
  padding: var(--default-padding-size);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-real-white);
  height: var(--medium-small-button-height-size);
  cursor: pointer;
  border-bottom: 1px solid var(--color-1);
`;

export const subOptionTitle = css`
  font-size: var(--default-font-size);
  color: var(--color-4);
`;
