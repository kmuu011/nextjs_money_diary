import {css} from "@emotion/css";

export const accountHistoryInsertWrap = (show: boolean) => css`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const accountHistoryInsertBody = (show: boolean) => css`
  @media(max-width: 500px){
    width: 90%;
  }
  
  position: relative;
  background-color: var(--background-color);
  height: 70%;
  width: 500px;
  bottom: ${show ? '-30%' : '-80%'};

  transition: all .3s, height .3s cubic-bezier(0, 0, 1, 1) .3s;
  box-shadow: var(--body-box-shadow);
`;