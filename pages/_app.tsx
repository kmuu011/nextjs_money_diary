import '../styles/globals.scss';
import '../public/static/font/NanumSquareRound/style.scss';
import type {AppProps} from 'next/app';
import {Fragment, useEffect} from "react";
import GlobalNavigation from "../src/component/common/navigation/GlobalNavigation";
import NavigationMenu from "../src/component/common/sideBar/SideBar";

import {
    RecoilRoot
} from 'recoil';
import {serviceBody, serviceWrap} from "../styles/common/Common.style";

function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        const pathName: string = window.location.pathname;
        const tokenCode: string | null = localStorage.getItem('token-code');

        if (tokenCode) {
            if (pathName === '/') {
                window.location.href = '/account';
            }
        }
    }, []);

    return (
        <RecoilRoot>
            <Fragment>
                <div css={serviceWrap}>
                    <div
                        css={serviceBody}
                    >
                        <GlobalNavigation/>
                        <NavigationMenu/>
                        <Component {...pageProps}/>
                    </div>
                </div>
            </Fragment>
        </RecoilRoot>
    )
}

export default MyApp
