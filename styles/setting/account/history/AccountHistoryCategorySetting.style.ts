import {css} from "@emotion/react";
import {defaultBodyCss} from "../../../common/Common.style";

export const container = css`
  ${defaultBodyCss};
  position: relative;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: calc(100% - 59px);
  overflow-y: auto;
  box-shadow: var(--body-box-shadow);
  display: flex;
  justify-content: center;
`;

export const categorySettingWrap = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const categoryListWrap = css`
  width: 100%;
`;

export const categoryItem = css`
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

export const categoryInsertButton = css`
  ${categoryItem};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: var(--color-2);
  background-color: var(--color-real-white);
`;

export const plusText = css`
  font-size: var(--default-large-font-size);
  margin-right: 10px;
`;