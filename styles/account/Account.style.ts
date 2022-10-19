import {css} from "@emotion/css";

export const container = () => {
    return css`
      text-align: center;
      margin: 0 auto;
      width: 100%;
    `
};

export const circleButtonWrap = css`
  position: fixed;
  right: 14px;
  bottom: 150px;
`;

export const accountTotalStatisticWrap = css`
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
  color: var(--color-4);
  font-size: var(--default-font-size);
`;

export const allAccountTotalAmount = css`
  color: var(--color-real-white);
  font-size: var(--large-font-size);
`;

export const accountListWrap = css`
  display: flex;
  justify-content: center;
  column-gap: 14px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const accountItem = css`
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

export const accountLastItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
