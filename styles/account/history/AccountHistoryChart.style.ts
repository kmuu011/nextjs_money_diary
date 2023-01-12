import {css} from "@emotion/react";
import {defaultBodyCss} from "../../common/Common.style";

export const container = css`
  ${defaultBodyCss};
  position: relative;
  text-align: center;
  margin: 0 auto;
  box-shadow: var(--body-box-shadow);
  background-color: var(--color-real-white);
`;

export const topButtonWrap = css`
  padding: 0 var(--default-padding-size);
  margin-top: var(--default-padding-size);
  display: flex;
  column-gap: var(--default-padding-size);
  justify-content: space-around;
`;

export const dateWrap = css`
  display: flex;
  column-gap: 10px;

  font-size: var(--default-font-size);
  color: var(--color-3);
  text-align: center;
  
  #year {
    width: 80px;
  }
  #month {
    width: 62px;
  }
  
  select {
    height: 50px;
    border: none;
    font-size: var(--default-font-size);
    color: var(--color-3);
    text-align: center;
    background-color: var(--color-real-white);
  }
  
`;

export const typeWrap = css`
  width: 30%;
`;

export const chartWrap = css`
  position: relative;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const totalAmount = css`
  position: absolute;
  top: 46%;
`;

export const categoryCost = css`
  position: absolute;
  bottom: 10%;
  right: var(--default-padding-size);
`;

export const accountHistoryListWrap = css`
  height: 500px;
  overflow-y: auto;
`;