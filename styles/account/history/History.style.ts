import {css} from "@emotion/css";
import {defaultBodyCss} from "../../common/Common.style";

export const container = css`
  ${defaultBodyCss};
  position: relative;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  box-shadow: var(--body-box-shadow);
`;

export const accountHistoryListWrap = css`
  display: flex;
  justify-content: center;
  column-gap: 14px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const accountHistoryTotalStatisticWrap = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--color-1);
  height: var(--large-card-height-size);
  padding: var(--default-padding-size);

  div {
    padding: var(--medium-padding-size) 0;
  }
`;

export const accountName = css`
  color: var(--color-0);
  font-size: var(--default-font-size);
`;

export const accountTotalAmount = css`
  color: var(--color-real-white);
  font-size: var(--large-font-size);
`;

export const accountHistoryItem = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid var(--color-1);
  overflow-y: auto;
  width: 100%;
  height: var(--large-card-height-size);
  background-color: #fff;
  cursor: pointer;
  padding: var(--default-padding-size);

  div {
    padding: var(--small-padding-size) 0;
  }
`;

export const historyInfoWrap = css`
  display: flex;
  width: 100%;
`;

export const rightInfo = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;
export const leftInfo = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
`;
