import {css} from "@emotion/react";
import {defaultBodyCss} from "../common/Common.style";

export const container = css`
  ${defaultBodyCss};
  position: relative;
  text-align: center;
  margin: 0 auto;
  box-shadow: var(--body-box-shadow);
  background-color: var(--color-real-white);
`;

export const calendarHeaderWrap = css`
`;

export const monthControllerWrap = css`
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-size: var(--default-font-size);
  column-gap: 8px;
`;

export const calendarFrameWrap = css`
  border-bottom: 1px solid var(--color-1);
`;

export const calendarAccountHistoryListWrap = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const calendarWeekWrap = css`
  display: flex;
  height: 30px;
  flex-direction: row;
  align-items: center;
`;

export const calendarDay = css`
  width: ${100 / 7}%;
`;

export const calendarBodyWrap = css`
  margin-top: 10px;
`;

export const calendarBodyWeekWrap = css`
  display: flex;
  flex-direction: row;
`;

export const calendarBodyDayWrap = (
    isThisMonth: boolean,
    isToday: boolean,
    income?: number,
    outcome?: number
) => css`
  width: ${100 / 7}%;
  height: 50px;
  
  div {
    margin-top: 2px;
  }

  div:nth-of-type(2) {
    height: var(--very-small-font-size);
    color: var(--color-blue);
    font-size: ${income && income > 1000000 ?
            `10px` : `var(--very-small-font-size)`};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div:nth-of-type(3) {
    height: var(--very-small-font-size);
    color: var(--color-red);
    font-size: ${outcome && outcome > 1000000 ?
            `10px` : `var(--very-small-font-size)`};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  ${isToday ? `background-color: var(--background-color);` : ``}

  ${isThisMonth ?
          `` : `div{color: var(--color-disable) !important;}`}
`;