import Head from 'next/head';
import {FunctionComponent} from "react";
import {IHeaderProps} from "../../interface/props/common";

const SetHead: FunctionComponent<IHeaderProps> = (props?: IHeaderProps) => {
    const title:string = props?.title || '가계부'
    const description: string = props?.description || '소비 패턴을 분석하기 위한 가계부'

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
    )
}

export default SetHead
