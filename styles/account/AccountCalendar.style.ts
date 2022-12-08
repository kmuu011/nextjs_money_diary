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
  margin-top: var(--default-padding-size);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const monthControllerWrap = css`
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-size: var(--default-font-size);
  column-gap: 8px;
`;

export const monthCostSummaryWrap = css`
  margin: var(--default-padding-size) 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  
  #outcome{
    color: var(--color-red);
  }
  
  #income {
    color: var(--color-blue);
  }
`;

export const calendarFrameWrap = css`
  margin-top: var(--default-padding-size);
  border-bottom: 1px solid var(--color-1);
`;

export const calendarAccountHistoryListWrap = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 80vh;
  overflow-y: auto;
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
  margin-top: 8px;
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
  padding: 1px 0;
  
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
  
  ${isToday ? `background-color: var(--color-1);` : ``}

  ${isThisMonth ?
          `` : `div{color: var(--color-disable) !important;}`}
`;