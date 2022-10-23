import * as styles from '../../../../styles/common/navigation/GlobalNavigation.style';
import {FunctionComponent, useEffect, useState} from "react";
import menuButton from "../../../../public/static/button/menu/menu.svg"
import Image from "next/image";
import {freezeBackground, orRegExpMaker} from "../../../utils/utils";
import {useRecoilState} from "recoil";
import {showSideBarAtom} from "../../../recoil/atoms/common";

const disabledLocationList: string[] = [
    '/', 'signUp'
];

const GlobalNavigation: FunctionComponent = () => {
    const [showNavi, setShowNavi] = useState(false);
    const [showSideBar, setShowSideBar] = useRecoilState(showSideBarAtom);

    useEffect(() => {
        freezeBackground(showSideBar, window, document);
    }, [showSideBar]);

    useEffect(() => {
        const pathName: string = window.location.pathname;

        setShowNavi(!orRegExpMaker(disabledLocationList).test(pathName));
    }, []);

    return showNavi ? <div className={styles.container}>
        <Image onClick={() => setShowSideBar(!showSideBar)}
               src={menuButton}
               alt={"메뉴버튼"}
               width={"35"} height={"35"}
        />
    </div> : <></>
}

export default GlobalNavigation;
