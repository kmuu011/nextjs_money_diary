import {css} from "@emotion/react";
import {defaultBodyCss} from "../../../common/Common.style";

export const container = css`
  ${defaultBodyCss};
  position: relative;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: calc(100% - 56px);
  overflow-y: auto;
  box-shadow: var(--body-box-shadow);
  display: flex;
  justify-content: center;
`;

export const categorySettingWrap = css`
  padding: var(--default-padding-size);
  display: flex;
  flex-direction: column;
  width: 80%;
`;
