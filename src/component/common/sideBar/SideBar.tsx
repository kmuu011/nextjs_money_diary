import {FunctionComponent} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {showSideBarAtom} from "../../../recoil/atoms/common";
import SideMenu from "./SideMenu";

import settingsImage from "../../../../public/static/button/setting/setting.svg";
import memberImage from "../../../../public/static/button/member/member.svg";
import todoImage from "../../../../public/static/button/todo/list.svg";
import * as styles from "../../../../styles/common/sideBar/SideBar.style";
import {hideSideMenuBar} from "../../../utils/utils";
import {SideMenuProps} from "../../../interface/props/common";
import {modalBackground} from "../../../../styles/common/Common.style";
import {useRouter} from "next/router";
import {multipleAccountIdxAtom} from "../../../recoil/atoms/calendar/calendar";

const GlobalNavigation: FunctionComponent = () => {
    const [showSideBar, setShowSideBar] = useRecoilState(showSideBarAtom);

    const accountIdx = useRouter().query.accountIdx;

    const setMultipleAccountIdx = useSetRecoilState(multipleAccountIdxAtom);

    const menuList: SideMenuProps[] = [
        {
            image: todoImage,
            title: '가계부',
            subMenuList: [
                {title: '목록 보기', url: '/account', action: () => hideSideMenuBar(setShowSideBar)},
                {
                    title: '월별 보기', url: `/account/${accountIdx}/calendar`, action: () => {
                        hideSideMenuBar(setShowSideBar);
                        setMultipleAccountIdx(accountIdx === "undefined" ? undefined : accountIdx as string);
                    }
                },
                {
                    title: '차트 보기', url: `/account/${accountIdx}/chart`, action: () => {
                        hideSideMenuBar(setShowSideBar);
                        setMultipleAccountIdx(accountIdx === "undefined" ? undefined : accountIdx as string);
                    }
                },
            ],
            path: '/account'
        },
        {
            image: memberImage,
            title: '사용자',
            subMenuList: [
                {title: '마이페이지', url: '/member/myPage', action: () => hideSideMenuBar(setShowSideBar)},
            ],
            path: '/member'
        },
        {
            image: settingsImage,
            title: '설정',
            path: '/setting',
            url: '/setting',
        },
    ];

    return (
        <div css={modalBackground(showSideBar)}
             id={"naviMenuContainer"}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'naviMenuContainer') {
                     setShowSideBar(false);
                 }
             }}>
            <div css={styles.menuWrap(showSideBar)}>
                {menuList.map((menu, i) => {
                    return <SideMenu
                        image={menu.image}
                        title={menu.title}
                        subMenuList={menu.subMenuList}
                        path={menu.path}
                        url={menu.url}
                        key={i}
                    />
                })}
            </div>
        </div>
    )
}

export default GlobalNavigation;
