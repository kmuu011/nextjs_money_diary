import {css} from "@emotion/css";
import {useRouter} from "next/router";

const sideBarWidth = 300;

export const container = (show: boolean) => css`
  height: 100%;
  position: fixed;
  width: ${show ? '100%' : 0};
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0, 0.4);
  z-index: 999;
`;

export const menuWrap = (show: boolean) => css`
  position: relative;
  left: ${show ? 0 : sideBarWidth * -1.05}px;
  height: 100%;
  width: ${sideBarWidth}px;
  background-color: #ffffff;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 40%);
  transition: all .3s, width .3s cubic-bezier(0, 0, 1, 1) .3s;
`;

export const subMenuWrap = (isOpen: boolean, length: number) => css`
  overflow-y: hidden;
  height: ${isOpen ? length * 45 : 0}px;
  transition: height .3s cubic-bezier(.645, .045, .355, 1), transform .3s cubic-bezier(.645, .045, .355, 1), top .3s cubic-bezier(.645, .045, .355, 1), color .3s cubic-bezier(.645, .045, .355, 1);
`;

export const menuItem = (isSub: boolean, path?: string) => {
    const pathName = useRouter().pathname;
    let backGroundColor, isActive;

    if (isSub) {
        isActive = pathName === path;
    } else {
        isActive = path !== undefined ? pathName.indexOf(path) === 0 : false;
    }

    if (isActive) {
        backGroundColor = isSub ? '#d1d1d1' : '#ababab';
    } else {
        backGroundColor = isSub ? '#f9f9f9' : '#ffffff';
    }

    return css`
      position: relative;
      z-index: 3;
      cursor: pointer;
      height: 45px;
      padding: 0 10px;
      font-size: 17px;
      display: flex;
      align-items: center;
      background-color: ${backGroundColor};
    `;
}

export const menuIcon = css`
  padding-top: 2px;
  width: 40px;
  text-align: center;
`;

export const menuTitle = css`
  padding-left: 10px;
`;

export const menuArrowCss = (isOpen: boolean) => css`
  position: absolute;
  right: 20px;

  img {
    transition: background .3s cubic-bezier(.645, .045, .355, 1), transform .3s cubic-bezier(.645, .045, .355, 1), top .3s cubic-bezier(.645, .045, .355, 1), color .3s cubic-bezier(.645, .045, .355, 1);
    transform: rotate(${isOpen ? 0 : 180}deg);
  }
`
