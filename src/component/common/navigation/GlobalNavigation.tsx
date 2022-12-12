import * as styles from '../../../../styles/common/navigation/GlobalNavigation.style';
import {FunctionComponent, useEffect, useState} from "react";
import menuButton from "../../../../public/static/button/menu/menu.svg"
import Image from "next/image";
import {freezeBackground, orRegExpMaker} from "../../../utils/utils";
import {useRecoilState, useResetRecoilState} from "recoil";
import {showSideBarAtom} from "../../../recoil/atoms/common";
import filter from "../../../../public/static/button/filter/filter.svg";
import {AdditionalButtonType} from "../../../interface/type/common";
import {useRouter} from "next/router";
import {showAccountChooseModalAtom} from "../../../recoil/atoms/account/account";
import {calendarDataMatrixAtom} from "../../../recoil/atoms/calendar/calendar";

const disabledLocationList: string[] = [
    '/', 'signUp'
];

const GlobalNavigation: FunctionComponent = () => {
    const [showNavi, setShowNavi] = useState(false);
    const [showSideBar, setShowSideBar] = useRecoilState(showSideBarAtom);
    const [additionalButtonList, setAdditionalButtonList] = useState<AdditionalButtonType[]>([]);
    const [
        showAccountChooseModal,
        setShowAccountChooseModal
    ] = useRecoilState(showAccountChooseModalAtom);

    useEffect(() => {
        freezeBackground(showSideBar, window, document);
    }, [showSideBar]);

    useEffect(() => {
        const pathName: string = window.location.pathname;

        setShowNavi(!orRegExpMaker(disabledLocationList).test(pathName));
    }, []);

    useEffect(() => {
        const pathName: string = window.location.pathname;

        const buttonList: AdditionalButtonType[] = [];

        if((/account\/.*\/calendar/).test(pathName)){
            buttonList.push({
                image: filter,
                action: () => {
                    setShowAccountChooseModal(!showAccountChooseModal);
                },
                alt: "필터"
            })
        }

        setAdditionalButtonList(buttonList);
    }, [useRouter().asPath])

    return showNavi ? <div css={styles.container}>
        <div>
        <Image onClick={() => setShowSideBar(!showSideBar)}
               src={menuButton}
               alt={"메뉴버튼"}
               width={"35"} height={"35"}
        />
        </div>
        <div>
            {
                additionalButtonList.map((v: any, i: number) => {
                    return <div key={i}>
                        <Image
                        onClick={v.action}
                        src={v.image} alt={v.alt} width={"35"} height={"35"}
                        />
                    </div>
                })
            }
        </div>
    </div> : <></>
}

export default GlobalNavigation;
