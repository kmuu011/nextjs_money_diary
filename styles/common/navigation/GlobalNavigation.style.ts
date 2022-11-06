import {css} from "@emotion/react";

export const container = css`
  @media (max-width: 500px) {
    width: 100%;
  }
  width: 480px;
  position: fixed;
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-1);
  box-shadow: var(--body-box-shadow);
  background-color: var(--background-color);
  z-index: 99;

  img {
    cursor: pointer;
  }
`;
