import {FunctionComponent} from "react";
import Image from "next/image";
import {css} from "@emotion/css";
import {CircleButtonProps} from "../../../interface/props/common";

const CircleButton: FunctionComponent<CircleButtonProps> = (
    {image, action}
) => {
    const circleButtonCss = css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      box-shadow: var(--body-box-shadow);
      background: var(--color-2);
      cursor: pointer;
    `;

    return (
        <div className={circleButtonCss} onClick={() => action()}>
            <Image src={image} alt={"등록버튼"} width={34} height={34}/>
        </div>
    )
}

export default CircleButton
