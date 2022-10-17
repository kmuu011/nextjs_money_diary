import {css} from "@emotion/css";

export const container = css`
  text-align: center;
  margin: 0 auto;
  width: 450px;
`

export const title = css`
  margin-top: 150px;
  font-size: 48px
`;

export const titleDesc = css`
  margin-top: var(--default-top-margin);
  font-size: 28px;
`;

export const idDiv = css`
  margin-top: var(--default-top-margin);

  input {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  input ::after {
    border: 2px solid var(--color-2);
  }
`;

export const passwordDiv = css`
  margin-top: -1px;

  input{
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

export const keepLoginDiv = css`
  margin-top: var(--default-top-margin);
  display: flex;
`;

export const keepLoginLabel = css`
  margin-left: 6px;
  font-size: 15px;

  position: relative;
  top: 50%;
  transform: translate(0,-50%);
  cursor: pointer;
`;

export const buttonDiv = css`
  margin-top: var(--default-top-margin);
`;