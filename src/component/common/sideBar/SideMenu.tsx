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
                className={menuItem(false, path)}
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
            >
                <div className={menuIcon}>
                    <Image src={image} alt="메뉴 아이콘" width={25} height={25}/>
                </div>
                <div className={menuTitle}>
                    {title}
                </div>
                <div className={menuArrowCss(isOpen)}>
                    <Image src={arrowImage} alt="메뉴 확장 화살표"/>
                </div>
            </div>
            <div className={subMenuWrap(isOpen, children.length)}>
                {children.map((subMenu, i) => {
                    return <SideSubMenu {...subMenu} key={i}/>
                })}
            </div>
        </div>
    )
}

export default SideMenu;
