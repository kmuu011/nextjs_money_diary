import {css} from "@emotion/css";

export const circleButtonWrap = (right?: number, bottom?: number) => css`
  position: fixed;
  right: ${right ? right : 14}px;
  bottom: ${bottom ? bottom : 150}px;
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