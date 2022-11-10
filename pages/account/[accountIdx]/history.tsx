import type {NextPage} from 'next';
import * as styles from '../../../styles/account/history/History.style';
import {useEffect, useState} from "react";
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
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {commaParser, freezeBackground} from "../../../src/utils/utils";
import {
    accountHistoryModalTypeAtom, createdAccountHistoryInfoAtom,
    deletedAccountHistoryIdxAtom,
    selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom,
} from "../../../src/recoil/atoms/account/history";
import AccountHistoryDataModal from "../../../src/component/account/history/modal/AccountHistoryDataModal";

const AccountHistory: NextPage = () => {
    const accountIdx: number = Number(useRouter().query.accountIdx);
    const [
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryDataModalAtom);

    const setModalType = useSetRecoilState(accountHistoryModalTypeAtom);
    const resetSelectedAccountHistoryInfo = useResetRecoilState(selectedAccountHistoryInfoAtom);
    const createdAccountHistoryInfo: AccountHistoryItemType = useRecoilValue(createdAccountHistoryInfoAtom);
    const deletedAccountHistoryIdx = useRecoilValue(deletedAccountHistoryIdxAtom);

    const [accountInfo, setAccountInfo] = useState<AccountItemType>();
    const [accountHistoryList, setAccountHistoryList] = useState<AccountHistoryItemType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [cursorIdx, setCursorIdx] = useState<number>(-1);
    const [last, setLast] = useState<boolean>(false);
    const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

    let io: IntersectionObserver;

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

    const getAccountHistoryList = async (): Promise<void> => {
        if (isNaN(accountIdx)) return;

        const response = await selectAccountHistoryApi(
            {
                cursorIdx,
                count: 12,
            },
            accountIdx
        );

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setTotalCount(response.data.totalCount);

        setAccountHistoryList([...accountHistoryList, ...response.data.items]);

        setLast(response.data.items.length === 0);
    }

    const openAccountInertModal = () => {
        setModalType(0);
        setShowAccountHistoryInsertModal(true);
    }

    const nextPage = () => {
        if (last) return;

        setCursorIdx(accountHistoryList[accountHistoryList.length-1]?.idx || -1);

        if (io && lastElement) {
            io.unobserve(lastElement);
        }
    }

    const circleButtonProps: CircleButtonProps = {
        image: addWhiteButton,
        action: openAccountInertModal
    };

    useEffect(() => {
        getAccountInfo();
        getAccountHistoryList();
    }, [accountIdx]);

    useEffect(() => {
        getAccountHistoryList();
    }, [cursorIdx])

    useEffect(() => {
        freezeBackground(showAccountHistoryInsertModal, window, document);

        if(!showAccountHistoryInsertModal){
            resetSelectedAccountHistoryInfo();
        }

    }, [showAccountHistoryInsertModal]);

    useEffect(() => {
        io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    nextPage();
                }
            })
        })

        if (io && lastElement) {
            io.observe(lastElement);
        }

    }, [lastElement]);

    useEffect(() => {
        accountHistoryList.splice(accountHistoryList.findIndex(v => v.idx === deletedAccountHistoryIdx), 1);
        setAccountHistoryList(accountHistoryList);
    }, [deletedAccountHistoryIdx]);

    useEffect(() => {
        if(createdAccountHistoryInfo === undefined) return;
        setAccountHistoryList([
            createdAccountHistoryInfo,
            ...accountHistoryList
        ]);
    }, [createdAccountHistoryInfo]);

    return (
        <div css={styles.container}>
            <SetHead/>

            <AccountHistoryDataModal
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
            <div css={styles.accountHistoryListWrap}>
                {
                    accountHistoryList.map((accountHistory, i) => {
                        return <AccountHistoryItem
                            accountHistoryInfo={accountHistory}
                            key={accountHistory.idx}
                            isLast={accountHistoryList.length - 1 === i}
                            setLastElement={setLastElement}
                        />
                    })
                }
            </div>

        </div>
    )
}

export default AccountHistory
