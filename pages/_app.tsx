import '../styles/globals.scss';
import '../public/static/font/NanumSquareRound/style.scss';
import type {AppProps} from 'next/app';
import {Fragment, useEffect, useState} from "react";
import Footer from "../src/component/common/Footer";
import GlobalNavigation from "../src/component/common/navigation/GlobalNavigation";
import NavigationMenu from "../src/component/common/sideBar/SideBar";

import {
    RecoilRoot,
} from 'recoil';
import {css} from "@emotion/css";

function MyApp({Component, pageProps}: AppProps) {
    const [bodyCss, setBodyCss] = useState(css`
          height: 600px;
          overflow-y: auto;
    `);

    useEffect(() => {
        const pathName: string = window.location.pathname;
        const tokenCode: string | null = localStorage.getItem('token-code');

        if (tokenCode) {
            if (pathName === '/') {
                window.location.href = '/todoGroup';
            }
        }

        const height = window.innerHeight-137;

        setBodyCss(css`
          height: ${height}px;
          overflow-y: auto;
        `)

    }, []);

    return (
        <RecoilRoot>
            <Fragment>
                <GlobalNavigation/>
                <NavigationMenu/>
                <div className={bodyCss}>
                    <Component {...pageProps}/>
                </div>
                <Footer/>
            </Fragment>
        </RecoilRoot>
    )
}

export default MyApp
