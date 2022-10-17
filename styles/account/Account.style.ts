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
  background-color: var(--color-3);
  height: 300px;
  padding: 13px;

  div {
    padding: 10px 0
  }
`;

export const allAccountTotalAmountDesc = css`
  color: var(--color-1);
  font-size: 24px;
`;

export const allAccountTotalAmount = css`
  color: white;
  font-size: 32px;
`;

export const accountListWrap = css`
  display: flex;
  justify-content: center;
  column-gap: 14px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const accountItem = (isLast: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-bottom: ${isLast ? 0 : 1}px solid var(--color-2);
  overflow-y: auto;
  width: 100%;
  height: 215px;
  background-color: #fff;
  cursor: pointer;
  padding: 13px;

  div {
    padding: 5px 0;
  }
`;

export const accountName = css`
  font-size: 20px;
  color: var(--color-4);
`;

export const accountAmount = css`
  font-size: 24px;
  color: black;
`;
