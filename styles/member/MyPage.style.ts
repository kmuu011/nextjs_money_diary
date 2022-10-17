import {css} from "@emotion/css";

export const container = css`
  text-align: center;
  margin: 0 auto;
  width: 450px;
`;

export const title = css`
  margin-top: 35px;
  font-size: 35px;
`;

export const myPageWrap = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const profileImgWrap = css`
  margin-top: var(--default-top-margin);
  display: flex;
  justify-content: center;
`;

export const profileImgBorder = css`
  overflow: hidden;
  width: 180px;
  height: 180px;
  border: 5px solid var(--color-3);
  border-radius: 50%;
  cursor: pointer;
`;

export const profileInfoWrap = css`
    width: 62%;
`;

export const profileInfo = css`
  margin-top: 50px;
  text-align: left;
`;

export const profileInfoDesc = css`
  font-size: 20px;
  color: var(--color-3);
  font-weight: 700;
`;

export const profileInfoValue = css`
  padding-left: 2px;
  margin-top: 5px;
  font-size: 15px;
  word-break: break-all;
`;

export const buttonWrap = css`
  margin-top: 35px;
  width: 80%;
`;
