import {FunctionComponent, useEffect, useState} from "react";
import {AccountHistoryItemType} from "../../../interface/type/account/history/history";
import {selectAccountHistoryApi} from "../../../api/account/history/history";
import * as styles from "../../../../styles/account/history/History.style";
import AccountHistoryItem from "./AccountHistoryItem";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    accountHistoryLastAtom,
    accountHistoryStartCursorAtom,
    accountHistoryTypeAtom,
    createdAccountHistoryInfoAtom,
    dateForSelectAccountHistoryAtom,
    deletedAccountHistoryIdxAtom,
    monthForSelectAccountHistoryAtom,
    multipleAccountHistoryCategoryIdxAtom,
    yearForSelectAccountHistoryAtom
} from "../../../recoil/atoms/account/history";
import {
    multipleAccountIdxAtom,
} from "../../../recoil/atoms/calendar/calendar";
import {parseInt} from "lodash";

const AccountHistoryList: FunctionComponent<{
    disableDate?: boolean,
    disableType?: boolean,
    disableCategory?: boolean,
}> = (
    {
        disableDate,
        disableType,
        disableCategory
    }
) => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
    const [accountHistoryList, setAccountHistoryList] = useState<AccountHistoryItemType[]>([]);
    const [startCursor, setStartCursorIdx] = useRecoilState(accountHistoryStartCursorAtom);
    const [last, setLast] = useRecoilState(accountHistoryLastAtom);
    const type = useRecoilValue(accountHistoryTypeAtom);

    const createdAccountHistoryInfo: AccountHistoryItemType = useRecoilValue(createdAccountHistoryInfoAtom);
    const deletedAccountHistoryIdx = useRecoilValue(deletedAccountHistoryIdxAtom);

    const yearForSelectAccountHistoryList = useRecoilValue(yearForSelectAccountHistoryAtom);
    const monthForSelectAccountHistoryList = useRecoilValue(monthForSelectAccountHistoryAtom);
    const dateForSelectAccountHistoryList = useRecoilValue(dateForSelectAccountHistoryAtom);

    const multipleAccountIdx = useRecoilValue(multipleAccountIdxAtom);
    const multipleAccountHistoryCategoryIdx = useRecoilValue(multipleAccountHistoryCategoryIdxAtom);

    let io: IntersectionObserver;

    const getAccountHistoryList = async (reset?: boolean): Promise<void> => {
        if (!multipleAccountIdx || isNaN(parseInt(multipleAccountIdx))) return;

        const payload: {
            startCursor: number,
            count: number,
            multipleAccountIdx: string,
            year?: string,
            month?: string,
            date?: string
            type?: number,
            multipleAccountHistoryCategoryIdx?: string
        } = {
            startCursor: reset ? -1 : startCursor,
            count: 12,
            multipleAccountIdx
        };

        if (!disableDate) {
            if (yearForSelectAccountHistoryList) {
                payload.year = yearForSelectAccountHistoryList;
            }

            if (monthForSelectAccountHistoryList !== undefined && Number(monthForSelectAccountHistoryList) !== 0) {
                payload.month = monthForSelectAccountHistoryList;
            }

            if (dateForSelectAccountHistoryList) {
                payload.date = dateForSelectAccountHistoryList;
            }
        }

        if (!disableType) {
            payload.type = type;
        }

        if(!disableCategory) {
            if (multipleAccountHistoryCategoryIdx !== undefined) {
                payload.multipleAccountHistoryCategoryIdx = multipleAccountHistoryCategoryIdx;
            }
        }

        const response = await selectAccountHistoryApi(payload);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setAccountHistoryList(reset ? [...response.data.items] : [...accountHistoryList, ...response.data.items]);
        setLast(response.data.items.length === 0);
    }

    const nextPage = () => {
        if (last) return;

        setStartCursorIdx(accountHistoryList[accountHistoryList.length - 1]?.idx || -1);

        if (io && lastElement) {
            io.unobserve(lastElement);
        }
    }

    useEffect(() => {
        if (firstLoad) return;
        getAccountHistoryList((!!yearForSelectAccountHistoryList || disableDate) && startCursor === -1);
    }, [
        multipleAccountIdx, dateForSelectAccountHistoryList,
        yearForSelectAccountHistoryList, monthForSelectAccountHistoryList,
        type, startCursor, multipleAccountHistoryCategoryIdx
    ]);

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
        if (createdAccountHistoryInfo === undefined) return;
        setAccountHistoryList([
            createdAccountHistoryInfo,
            ...accountHistoryList
        ]);
    }, [createdAccountHistoryInfo]);

    useEffect(() => {
        if (!firstLoad) return;
        getAccountHistoryList(true);
        setFirstLoad(false);
    }, []);

    return (
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
    )
}

export default AccountHistoryList
