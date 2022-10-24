import {css} from "@emotion/css";

export const accountHistoryInsertWrap = (show: boolean) => css`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const accountHistoryInsertBody = (show: boolean) => css`
  border-radius: var(--border-radius);
  @media (max-width: 500px) {
    margin: 0 5%;
    width: 90%;
  }

  padding: 25px;
  position: relative;
  background-color: var(--background-color);
  height: 300px;
  width: 400px;
  bottom: ${show ? '-50%' : '-80%'};

  transition: all .3s, height .3s cubic-bezier(0, 0, 1, 1) .3s;
  box-shadow: var(--body-box-shadow);
`;

export const contentInput = css`
  margin-top: 10px;
`;

export const typeWrap = css`
  margin-top: 10px;
  padding: 2px;
  background-color: var(--color-2);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const incomeType = (checked: boolean) => css`
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${checked ? `var(--color-2)` : `var(--color-real-white)`};
  color: ${checked ? `#fff` : `var(--default-font-color)`};
  font-size: var(--small-default-font-size);
`;

export const outcomeType = (checked: boolean) => css`
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${checked ? `var(--color-2)` : `var(--color-real-white)`};
  color: ${checked ? `#fff` : `var(--default-font-color)`};
  font-size: var(--small-default-font-size);
`;

export const categoryWrap = css`
  margin-top: 10px;

  select {
    padding: 0 8px;
    height: 50px;
    width: 100%;
    font-size: var(--small-default-font-size);
    color: var(--color-2);
  }
`;

export const buttonWrap = css`
  margin-top: 10px;
`;