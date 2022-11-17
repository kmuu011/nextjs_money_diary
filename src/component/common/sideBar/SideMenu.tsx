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
import Link from "next/link";
import {useSetRecoilState} from "recoil";
import {showSideBarAtom} from "../../../recoil/atoms/common";
import {hideSideMenuBar} from "../../../utils/utils";

const SideMenu: FunctionComponent<SideMenuProps> = (
    {
        image, title,
        subMenuList,
        url,
        path
    }
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setShowSideBar = useSetRecoilState(showSideBarAtom);

    if (url) {
        return (
                <Link href={"/setting"}>
                    <div
                        css={menuItem(false, path)}
                        onClick={() => {
                            setIsOpen(!isOpen);
                            hideSideMenuBar(setShowSideBar);
                        }}
                    >
                        <div css={menuIcon}>
                            <Image src={image} alt="메뉴 아이콘" width={25} height={25}/>
                        </div>
                        <div css={menuTitle}>
                            {title}
                        </div>
                    </div>
                </Link>
        )
    }

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
            {
                subMenuList !== undefined ?
                    <div css={subMenuWrap(isOpen, subMenuList.length)}>
                        {subMenuList.map((subMenu, i) => {
                            return <SideSubMenu {...subMenu} key={i}/>
                        })}
                    </div> :
                    <div></div>
            }
        </div>
    )
}

export default SideMenu;
