import {css} from "@emotion/react";
import {defaultBodyCss} from "../common/Common.style";

export const container = css`
  ${defaultBodyCss};
  text-align: center;
  margin: 0 auto;
  overflow-y: auto;
  box-shadow: var(--body-box-shadow);
`;

export const accountTotalStatisticWrap = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--color-1);
  height: var(--very-large-card-height-size);
  padding: var(--default-padding-size);

  div {
    padding: var(--medium-padding-size) 0;
  }
`;

export const allAccountTotalAmountDesc = css`
  color: var(--color-0);
  font-size: var(--default-font-size);
`;

export const allAccountTotalAmount = css`
  color: var(--color-real-white);
  font-size: var(--large-font-size);
`;

export const allAccountOptionButtonWrap = css`
  display: flex;
  column-gap: var(--default-padding-size);
  padding: 0 var(--default-padding-size) !important;
  position: absolute;
  bottom: 0;
  right: 0;
  
  button {
    display: flex;
    background-color: var(--color-real-white);
    justify-content: center;
    align-items: center;
  }
`;

export const accountDeleteConfirmButtonWrap = css`
  display: flex;
  column-gap: var(--default-padding-size);
  
  button {
    width: 56px;
    height: var(--default-button-height-size);
    color: var(--color-real-white);
  }
`;

export const accountDeleteButton = css`
  width: 56px;
  height: var(--default-button-height-size);
  color: var(--color-real-white);
  background-color: var(--color-red);
`;

export const accountListWrap = css`
`;

export const accountItem = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-1);
  overflow-y: auto;
  height: var(--large-card-height-size);
  background-color: #fff;
  cursor: pointer;
  padding: var(--default-padding-size);

  div {
    padding: var(--small-padding-size) 0;
  }
`;

export const accountInfoWrap = css`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: flex-start;
`;

export const accountButtonWrap = css`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: center;
`;

export const accountOrderUpButton = css`
  color: var(--color-4);
  font-size: 50px;
`;

export const accountOrderDownButton = css`
  transform: rotate(180deg);
  color: var(--color-4);
  font-size: 50px;
`;

export const accountLastItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  height: var(--large-card-height-size);
  background-color: #fff;
  cursor: pointer;
  padding: var(--default-padding-size);

  div {
    padding: var(--small-padding-size) 0;
  }
`;

export const accountName = css`
  font-size: var(--default-font-size);
  color: var(--color-4);
`;

export const accountAmount = css`
  font-size: var(--default-font-size);
  color: var(--color-7);
`;

export const accountAddPlus = css`
  font-size: 40px;
  color: var(--color-2);

`;

export const accountAddText = css`
  font-size: var(--default-font-size);
  color: var(--color-2);
`;
