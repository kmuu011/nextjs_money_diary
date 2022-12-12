import {css} from "@emotion/react";

export const container = css`
  @media (max-width: 500px) {
    width: 100%;
  }
  width: 500px;
  position: fixed;
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-1);
  background-color: var(--background-color);
  z-index: 9;
  justify-content: space-between;
  box-sizing: border-box;

  img {
    cursor: pointer;
  }
`;
