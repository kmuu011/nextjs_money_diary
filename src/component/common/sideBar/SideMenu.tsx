import {FunctionComponent, useState} from "react";
import SideSubMenu from "./SideSubMenu";
import Image from "next/image";
import arrowImage from "../../../../public/static/button/arrow/expand_more.svg";
import {
    menuArrowCss,
    menuIcon, menuItem,
    menuTitle,
    subMenuWrap
} from "../../../../styles/common/sideBar/SideBar.style";
import {SideMenuProps} from "../../../interface/props/common";

const SideMenu: FunctionComponent<SideMenuProps> = (
    {
        image, title, children,
        path
    }
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <div
                css={menuItem(false, path)}
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
            >
                <div css={menuIcon}>
                    <Image src={image} alt="메뉴 아이콘" width={25} height={25}/>
                </div>
                <div css={menuTitle}>
                    {title}
                </div>
                <div css={menuArrowCss(isOpen)}>
                    <Image src={arrowImage} alt="메뉴 확장 화살표"/>
                </div>
            </div>
            <div css={subMenuWrap(isOpen, children.length)}>
                {children.map((subMenu, i) => {
                    return <SideSubMenu {...subMenu} key={i}/>
                })}
            </div>
        </div>
    )
}

export default SideMenu;
