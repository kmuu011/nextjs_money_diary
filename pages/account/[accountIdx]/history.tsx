import type {NextPage} from 'next';
import * as styles from '../../../styles/account/history/History.style';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import SetHead from "../../../src/component/common/Head";
import {AccountItemType} from "../../../src/interface/type/account/account";
import {selectOneAccountApi, updateAccountApi} from "../../../src/api/account/account";
import CircleButton from "../../../src/component/common/button/CircleButton";
import {circleButtonWrap} from "../../../styles/common/Common.style";
import {CircleButtonProps} from "../../../src/interface/props/common";
import addWhiteButton from "../../../public/static/button/add/addWhite.svg";
import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import {commaParser, dateToObject, freezeBackground} from "../../../src/utils/utils";
import {
    accountHistoryLastAtom,
    accountHistoryModalTypeAtom,
    accountHistoryStartCursorAtom,
    dateForSelectAccountHistoryAtom,
    monthForSelectAccountHistoryAtom, multipleAccountHistoryCategoryIdxAtom,
    selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom,
    yearForSelectAccountHistoryAtom,
} from "../../../src/recoil/atoms/account/history";
import AccountHistoryDataModal from "../../../src/component/account/history/modal/AccountHistoryDataModal";
import Image from "next/image";
import optionButton from "../../../public/static/button/setting/setting.svg";
import calendarButton from "../../../public/static/button/calendar/calendar.svg";
import pieChartButton from "../../../public/static/button/chart/pie.svg";
import {showAccountUpdateModalAtom} from "../../../src/recoil/atoms/account/account";
import AccountUpdateModal from "../../../src/component/account/modal/AccountUpdateModal";
import {
    monthForCalendarAtom,
    multipleAccountIdxAtom, yearForCalendarAtom,
} from "../../../src/recoil/atoms/calendar/calendar";
import AccountHistoryList from "../../../src/component/account/history/AccountHistoryList";

const nowDateObj = dateToObject();

const AccountHistory: NextPage = () => {
    const router = useRouter();
    const accountIdx = Number(router.query.accountIdx);

    const [
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryDataModalAtom);

    const setShowAccountUpdateModal = useSetRecoilState(showAccountUpdateModalAtom);
    const [
        multipleAccountIdx,
        setMultipleAccountIdx
    ] = useRecoilState(multipleAccountIdxAtom);

    const setModalType = useSetRecoilState(accountHistoryModalTypeAtom);
    const resetSelectedAccountHistoryInfo = useResetRecoilState(selectedAccountHistoryInfoAtom);

    const setYearForSelectAccountHistoryList = useSetRecoilState(yearForSelectAccountHistoryAtom);
    const setMonthForSelectAccountHistoryList = useSetRecoilState(monthForSelectAccountHistoryAtom);
    const resetDateForSelectAccountHistoryList = useResetRecoilState(dateForSelectAccountHistoryAtom);

    const resetAccountHistoryStartCursor = useResetRecoilState(accountHistoryStartCursorAtom);
    const resetAccountHistoryLast = useResetRecoilState(accountHistoryLastAtom);
    const resetAccountHistoryCategoryIdx = useResetRecoilState(multipleAccountHistoryCategoryIdxAtom);

    const resetYear = useResetRecoilState(yearForCalendarAtom);
    const resetMonth = useResetRecoilState(monthForCalendarAtom);

    const [accountInfo, setAccountInfo] = useState<AccountItemType>();

    const getAccountInfo = async (): Promise<void> => {
        let accountIdxForSelect = isNaN(Number(multipleAccountIdx)) ?
            accountIdx : multipleAccountIdx;

        if (isNaN(Number(accountIdxForSelect))) return;

        const response = await selectOneAccountApi(
            Number(accountIdxForSelect)
        );

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setAccountInfo(response.data);
    }

    const openAccountInsertModal = () => {
        setModalType(0);
        setShowAccountHistoryInsertModal(true);
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

    const resetData = () => {
        setYearForSelectAccountHistoryList(nowDateObj.year);
        setMonthForSelectAccountHistoryList(nowDateObj.month);
        resetDateForSelectAccountHistoryList();
        resetYear();
        resetMonth();
        resetAccountHistoryLast();
        resetAccountHistoryStartCursor();
        resetAccountHistoryCategoryIdx();
    }

    useEffect(() => {
        getAccountInfo();
        setMultipleAccountIdx(accountIdx.toString());
    }, [accountIdx]);

    useEffect(() => {
        freezeBackground(showAccountHistoryInsertModal, window, document);

        if (!showAccountHistoryInsertModal) {
            resetSelectedAccountHistoryInfo();
        }

    }, [showAccountHistoryInsertModal]);

    useEffect(() => {
        resetData();
    }, [])

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

            <AccountHistoryList
                disableDate={true}
                disableType={true}
                disableCategory={true}
            />

        </div>
    )
}

export default AccountHistory
