import * as styles from '../../../../styles/common/navigation/GlobalNavigation.style';
import {FunctionComponent, useEffect, useState} from "react";
import menuButton from "../../../../public/static/button/menu/menu.svg"
import Image from "next/image";
import {orRegExpMaker} from "../../../utils/utils";
import {useRecoilState} from "recoil";
import {showSideBarAtom} from "../../../recoil/atoms/common";

const disabledLocationList: string[] = [
    '/', 'signUp'
];

const GlobalNavigation: FunctionComponent = () => {
    const [showNavi, setShowNavi] = useState(false);
    const [showSideBar, setShowSideBar] = useRecoilState(showSideBarAtom);

    useEffect(() => {
        if (showSideBar) {
            document.body.style.cssText = `
                position: fixed; 
                top: -${window.scrollY}px;
                overflow-y: scroll;
                width: 500px;
                `;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
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
