import type {NextPage} from 'next';
import * as styles from '../../../styles/account/history/History.style';
import {useEffect, useState} from "react";
import {AccountHistoryItemType} from "../../../src/interface/type/account/history/history";
import {selectAccountHistoryApi} from "../../../src/api/account/history/history";
import {useRouter} from "next/router";
import SetHead from "../../../src/component/common/Head";
import AccountHistoryItem from "../../../src/component/account/history/AccountHistoryItem";
import {AccountItemType} from "../../../src/interface/type/account/account";
import {selectOneAccountApi, updateAccountApi} from "../../../src/api/account/account";
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
import Image from "next/image";
import optionButton from "../../../public/static/button/setting/setting.svg";
import calendarButton from "../../../public/static/button/calendar/calendar.svg";
import pieChartButton from "../../../public/static/button/chart/pie.svg";
import {showAccountUpdateModalAtom} from "../../../src/recoil/atoms/account/account";
import AccountUpdateModal from "../../../src/component/account/modal/AccountUpdateModal";
import {multipleAccountIdxAtom} from "../../../src/recoil/atoms/calendar/calendar";

const AccountHistory: NextPage = () => {
    const router = useRouter();
    const accountIdx = Number(router.query.accountIdx);

    const [
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryDataModalAtom);

    const setShowAccountUpdateModal = useSetRecoilState(showAccountUpdateModalAtom);
    const setMultipleAccountIdx = useSetRecoilState(multipleAccountIdxAtom);

    const setModalType = useSetRecoilState(accountHistoryModalTypeAtom);
    const resetSelectedAccountHistoryInfo = useResetRecoilState(selectedAccountHistoryInfoAtom);
    const createdAccountHistoryInfo: AccountHistoryItemType = useRecoilValue(createdAccountHistoryInfoAtom);
    const deletedAccountHistoryIdx = useRecoilValue(deletedAccountHistoryIdxAtom);

    const [accountInfo, setAccountInfo] = useState<AccountItemType>();
    const [accountHistoryList, setAccountHistoryList] = useState<AccountHistoryItemType[]>([]);
    const [startCursor, setStartCursorIdx] = useState<number>(-1);
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
                startCursor,
                count: 12,
                multipleAccountIdx: accountIdx.toString()
            }
        );

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setAccountHistoryList([...accountHistoryList, ...response.data.items]);
        setLast(response.data.items.length === 0);
    }

    const openAccountInsertModal = () => {
        setModalType(0);
        setShowAccountHistoryInsertModal(true);
    }

    const nextPage = () => {
        if (last) return;

        setStartCursorIdx(accountHistoryList[accountHistoryList.length - 1]?.idx || -1);

        if (io && lastElement) {
            io.unobserve(lastElement);
        }
    }

    const accountUpdate = async (
        accountName: string,
        invisibleAmount: number
    ) => {
        if (accountName.replace(/\s/g, '') === '') {
            alert('가계부 명칭을 입력해주세요.');
            return;
        }

        const response = await updateAccountApi(
            accountIdx,
            {
                accountName,
                invisibleAmount
            }
        );

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        getAccountInfo();
        setShowAccountUpdateModal(false);
    }

    const circleButtonProps: CircleButtonProps = {
        image: addWhiteButton,
        action: openAccountInsertModal
    };

    useEffect(() => {
        getAccountInfo();
        getAccountHistoryList();
    }, [accountIdx]);

    useEffect(() => {
        getAccountHistoryList();
    }, [startCursor]);

    useEffect(() => {
        freezeBackground(showAccountHistoryInsertModal, window, document);

        if (!showAccountHistoryInsertModal) {
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
        if (createdAccountHistoryInfo === undefined) return;
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
                isHistoryList={true}
            />

            <AccountUpdateModal
                accountInfo={accountInfo}
                accountUpdate={accountUpdate}
            />

            <div css={circleButtonWrap}>
                <CircleButton {...circleButtonProps}/>
            </div>

            <div css={styles.accountHistoryTotalStatisticWrap}>
                <div
                    css={styles.accountTopOptionWrap}
                >
                    <button
                        onClick={() => {
                            setMultipleAccountIdx(accountIdx.toString());
                            return router.push(`/account/${accountIdx}/chart`);
                        }}
                        css={styles.accountOptionButton}
                    >
                        <Image src={pieChartButton} width={40} height={40} alt={"차트 버튼"}/>
                    </button>
                    <button
                        onClick={() => {
                            setMultipleAccountIdx(accountIdx.toString());
                            return router.push(`/account/${accountIdx}/calendar`);
                        }}
                        css={styles.accountOptionButton}
                    >
                        <Image src={calendarButton} width={40} height={40} alt={"달력 버튼"}/>
                    </button>
                    <button
                        onClick={() => setShowAccountUpdateModal(true)}
                        css={styles.accountOptionButton}
                    >
                        <Image src={optionButton} width={40} height={40} alt={"설정 버튼"}/>
                    </button>
                </div>
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
