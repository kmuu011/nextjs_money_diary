import {css} from "@emotion/react";

export const modalBackground = (show: boolean) => css`
  height: ${show ? '100%' : 0};
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.4);
  z-index: 999;
  opacity: ${show ? 1 : 0};
  transition: opacity .3s;
`
export const circleButtonWrap = css`
  position: fixed;
  right: 50%;
  bottom: 3%;
  transform: translate(50%);
`;

export const defaultBodyCss = css`
  @media (max-width: 500px) {
    width: 100%;
  }
  width: 500px;
  margin-top: 56px !important;
`;

export const serviceWrap = css`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const serviceBody = css`
  @media (max-width: 500px) {
    width: 100%;
  }

  width: 500px;
  background-color: var(--background-color);
`;

export const footer = css`
  margin-top: 50px;
  height: var(--very-small-card-height-size);
  width: 100%;
  display: flex;
  flex: 1;
  border-top: 1px solid var(--color-1);
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const logo = css`
  margin-left: 0.5rem;
`;