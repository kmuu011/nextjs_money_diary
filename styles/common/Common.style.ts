import {css} from "@emotion/css";

export const footer = css`
  height: var(--very-small-card-height-size);
  position: absolute;
  bottom: 0;
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