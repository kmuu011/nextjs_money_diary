import type {NextPage} from 'next';
import * as styles from '../../../styles/account/history/History.style';
import {useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {AccountHistoryItemType} from "../../../src/interface/type/account/history/history";
import {selectAccountHistoryApi} from "../../../src/api/account/history/history";
import {useRouter} from "next/router";
import SetHead from "../../../src/component/common/Head";
import AccountHistoryItem from "../../../src/component/account/history/AccountHistoryItem";
import {AccountItemType} from "../../../src/interface/type/account/account";
import {selectOneAccountApi} from "../../../src/api/account/account";
import CircleButton from "../../../src/component/common/button/CircleButton";
import {circleButtonWrap} from "../../../styles/common/Common.style";
import {CircleButtonProps} from "../../../src/interface/props/common";
import addWhiteButton from "../../../public/static/button/add/addWhite.svg";
import {useRecoilState} from "recoil";
import {commaParser, freezeBackground} from "../../../src/utils/utils";
import {showAccountHistoryInsertModalAtom} from "../../../src/recoil/atoms/account/history";
import AccountHistoryInsertModal from "../../../src/component/account/history/modal/AccountHistoryInsertModal";

const AccountHistory: NextPage = () => {
    const accountIdx: number = Number(useRouter().query.accountIdx);
    const [
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryInsertModalAtom);

    const [accountInfo, setAccountInfo] = useState<AccountItemType>();
    const [accountHistoryList, setAccountHistoryList] = useState<AccountHistoryItemType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [last, setLast] = useState<number>(0);

    const getAccountInfo = async (): Promise<void> => {
        if (isNaN(accountIdx)) return;

        const response = await selectOneAccountApi(
            accountIdx
        );

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setAccountInfo(response.data);
    }

    const getAccountHistoryList = async (nextPage?: boolean, initial?: boolean): Promise<void> => {
        if (isNaN(accountIdx)) return;

        const selectPage = initial ? 1 : nextPage ? page + 1 : page;

        if (last !== 0 && last < selectPage) return;

        const response = await selectAccountHistoryApi(
            {
                page: selectPage,
                count: 12,
            },
            accountIdx
        );

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setTotalCount(response.data.totalCount);

        setAccountHistoryList(initial ?
            response.data.items : [...accountHistoryList, ...response.data.items]
        );

        setPage(response.data.page);
        setLast(response.data.last);
    }

    const openAccountInertModal = () => {
        setShowAccountHistoryInsertModal(true);
    }

    useEffect(() => {
        getAccountInfo();
        getAccountHistoryList();
    }, [accountIdx]);

    useEffect(() => {
        freezeBackground(showAccountHistoryInsertModal, window, document);
    }, [showAccountHistoryInsertModal]);

    const circleButtonProps: CircleButtonProps = {
        image: addWhiteButton,
        action: openAccountInertModal
    };

    return (
        <div css={styles.container}>
            <SetHead/>

            <AccountHistoryInsertModal
                reloadAccountInfo={getAccountInfo}
                reloadAccountHistoryList={getAccountHistoryList}
            />

            <div css={circleButtonWrap}>
                <CircleButton {...circleButtonProps}/>
            </div>

            <div css={styles.accountHistoryTotalStatisticWrap}>
                <div css={styles.accountName}>
                    {accountInfo?.accountName}
                </div>
                <div css={styles.accountTotalAmount}>
                    {commaParser(accountInfo?.totalAmount || 0)}원
                </div>
            </div>

            <InfiniteScroll
                css={styles.accountHistoryListWrap}
                initialLoad={false}
                pageStart={1}
                loadMore={() => getAccountHistoryList(true)}
                hasMore={true}
            >
                {
                    accountHistoryList.map((accountHistory, i) => {
                        console.log(accountHistory)
                        return <AccountHistoryItem
                            idx={accountHistory.idx}
                            amount={accountHistory.amount}
                            content={accountHistory.content}
                            type={accountHistory.type}
                            createdAt={accountHistory.createdAt}
                            accountHistoryCategory={accountHistory.accountHistoryCategory}
                            key={accountHistory.idx}
                        />
                    })
                }
            </InfiniteScroll>

        </div>
    )
}

export default AccountHistory
