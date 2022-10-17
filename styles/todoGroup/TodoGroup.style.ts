import {css} from "@emotion/css";

export const container = css`
  text-align: center;
  margin: 0 auto;
  padding: 14px 0;
  width: 100%;
  min-height: 600px;
`;

export const circleButtonWrap = css`
  position: fixed;
  right: 14px;
  bottom: 150px;
`;

export const todoGroupListWrap = css`
  display: flex;
  justify-content: center;
  column-gap: 14px;
  row-gap: 25px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const todoGroupItem = css`
  position: relative;
`;

export const todoWrap = css`
  padding: 17px 23px;
  overflow-y: auto;
  width: 330px;
  height: 215px;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 40%);
  background-color: #fff;
  border-radius: 30px;
  cursor: pointer;
`;

export const modifyModeWrap = css`
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: center;

  div {
    cursor: pointer;
    padding-left: 25px;

  }

  input {
    width: 50%;
  }
`;

export const todoGroupTitle = css`
  margin-top: 25px;
`;

export const moreButtonWrap = css`
  cursor: pointer;
  position: absolute;
  right: 40px;
  bottom: 0;
`;

export const moreWrap = css`
  position: absolute;
  right: 55px;
  bottom: 34px;
  width: 60px;
  z-index: 3;
  background-color: #ffffff;
  border: 1px solid #000000;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 40%);

  div {
    display: flex;
    cursor: pointer;
    height: 35px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid black;
  }

  div:last-child {
    border-bottom: none;
  }
`;