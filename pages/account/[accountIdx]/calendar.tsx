import type {NextPage} from 'next';
import * as styles from '../../../styles/account/history/AccountHistoryCalendar.style';
import {useEffect, useState} from "react";
import SetHead from "../../../src/component/common/Head";
import CalendarFrame from "../../../src/component/account/history/calendar/Calendar";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {
    calendarDataMatrixAtom,
    monthForCalendarAtom, multipleAccountIdxAtom,
    yearForCalendarAtom
} from "../../../src/recoil/atoms/calendar/calendar";
import {
    accountHistoryLastAtom,
    accountHistoryModalTypeAtom, accountHistoryStartCursorAtom,
    createdAccountHistoryInfoAtom,
    dateForSelectAccountHistoryAtom,
    deletedAccountHistoryIdxAtom, monthForSelectAccountHistoryAtom, selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom,
    updatedAccountHistoryIdxAtom, yearForSelectAccountHistoryAtom
} from "../../../src/recoil/atoms/account/history";
import {
    AccountHistoryCalendarDateData,
    AccountHistoryItemType
} from "../../../src/interface/type/account/history/history";
import {CalendarDateDataType} from "../../../src/interface/type/calendar/calendar";
import {SelectAccountMonthSummaryDto} from "../../../src/interface/dto/account/account";
import {selectMonthSummaryDataApi} from "../../../src/api/account/account";
import {AccountDailyCostSummaryType, AccountMonthCostSummaryType} from "../../../src/interface/type/account/account";
import {calendarMatrixCreator, commaParser, dateToObject, freezeBackground} from "../../../src/utils/utils";
import AccountHistoryDataModal from "../../../src/component/account/history/modal/AccountHistoryDataModal";
import {useRouter} from "next/router";
import {CircleButtonProps} from "../../../src/interface/props/common";
import addWhiteButton from "../../../public/static/button/add/addWhite.svg";
import {circleButtonWrap} from "../../../styles/common/Common.style";
import CircleButton from "../../../src/component/common/button/CircleButton";
import AccountChooseModal from "../../../src/component/account/modal/AccountChooseModal";
import {showAccountChooseModalAtom} from "../../../src/recoil/atoms/account/account";
import AccountHistoryList from "../../../src/component/account/history/AccountHistoryList";

const AccountHistoryCalendar: NextPage = () => {
    const router = useRouter();
    const accountIdx = router.query.accountIdx;

    const [year, setYear] = useRecoilState(yearForCalendarAtom);
    const [month, setMonth] = useRecoilState(monthForCalendarAtom);
    const resetYear = useResetRecoilState(yearForCalendarAtom);
    const resetMonth = useResetRecoilState(monthForCalendarAtom);

    const setYearForSelectAccountHistoryList = useSetRecoilState(yearForSelectAccountHistoryAtom);
    const setMonthForSelectAccountHistoryList = useSetRecoilState(monthForSelectAccountHistoryAtom);

    const resetDateForSelectAccountHistoryList = useResetRecoilState(dateForSelectAccountHistoryAtom);

    const resetAccountHistoryLast = useResetRecoilState(accountHistoryLastAtom);
    const resetAccountHistoryStartCursor = useResetRecoilState(accountHistoryStartCursorAtom);

    const [
        multipleAccountIdx,
        setMultipleAccountIdx
    ] = useRecoilState(multipleAccountIdxAtom);

    const setModalType = useSetRecoilState(accountHistoryModalTypeAtom);
    const [
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryDataModalAtom);

    const showAccountChooseModal = useRecoilValue(showAccountChooseModalAtom);

    const resetSelectedAccountHistoryInfo = useResetRecoilState(selectedAccountHistoryInfoAtom);

    const setCalendarDataMatrix =
        useSetRecoilState<[CalendarDateDataType<AccountHistoryCalendarDateData>[]]>(calendarDataMatrixAtom);
    const resetCalendarDataMatrix = useResetRecoilState(calendarDataMatrixAtom);

    const [monthIncome, setMonthIncome] = useState<number>(0);
    const [monthOutcome, setMonthOutcome] = useState<number>(0);

    const createdAccountHistoryInfo: AccountHistoryItemType = useRecoilValue(createdAccountHistoryInfoAtom);
    const updatedAccountHistoryIdx = useRecoilValue(updatedAccountHistoryIdxAtom);
    const deletedAccountHistoryIdx = useRecoilValue(deletedAccountHistoryIdxAtom);

    const getMonthlySummary = async (
        calendarMatrix: [CalendarDateDataType<AccountHistoryCalendarDateData>[]],
    ) => {
        if (!multipleAccountIdx) return;

        const startDateObj: CalendarDateDataType<AccountHistoryCalendarDateData> = calendarMatrix[0][0];
        const endDateObj: CalendarDateDataType<AccountHistoryCalendarDateData> =
            calendarMatrix[calendarMatrix.length - 1][calendarMatrix[calendarMatrix.length - 1].length - 1];

        const payload: SelectAccountMonthSummaryDto = {
            year,
            month,
            startDate: startDateObj.year + startDateObj.month + startDateObj.date,
            endDate: endDateObj.year + endDateObj.month + endDateObj.date,
            multipleAccountIdx: multipleAccountIdx
        }

        const response = await selectMonthSummaryDataApi(payload);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        const accountHistoryDailyCostSummaryList: AccountDailyCostSummaryType[] =
            response.data.accountHistoryDailyCostSummary;
        const accountHistoryMonthCostSummary: AccountMonthCostSummaryType =
            response.data.accountHistoryMonthCostSummary;

        setMonthIncome(accountHistoryMonthCostSummary.income);
        setMonthOutcome(accountHistoryMonthCostSummary.outcome);

        const accountHistoryDailySummaryObj: { [date: string]: { outcome: number, income: number } } =
            accountHistoryDailyCostSummaryList.reduce((obj, v) => {
                obj = {
                    ...obj,
                    [v.date]: {outcome: v.outcome, income: v.income}
                }
                return obj;
            }, {});

        calendarMatrix.forEach(weekList => {
            weekList.forEach(day => {
                day.data = accountHistoryDailySummaryObj[`${day.year}${day.month}${day.date}`];
            })
        });

        setCalendarDataMatrix([...calendarMatrix]);
    }

    const nextMonth = () => {
        if (Number(month) + 1 === 13) {
            const monthValue = '01';
            const yearValue = (Number(year) + 1).toString();

            setMonth(monthValue);
            setMonthForSelectAccountHistoryList(monthValue);

            setYear(yearValue);
            setYearForSelectAccountHistoryList(yearValue);
        } else {
            const monthValue = (Number(month) + 1).toString().padStart(2, '0');

            setMonth(monthValue);
            setMonthForSelectAccountHistoryList(monthValue)
        }

        resetDateForSelectAccountHistoryList();
        resetAccountHistoryLast();
        resetAccountHistoryStartCursor();
    }

    const previousMonth = () => {
        if (Number(month) - 1 === 0) {
            const monthValue = '12';
            const yearValue = (Number(year) - 1).toString();

            setMonth(monthValue);
            setMonthForSelectAccountHistoryList(monthValue);

            setYear(yearValue);
            setYearForSelectAccountHistoryList(yearValue);
        } else {
            const monthValue = (Number(month) - 1).toString().padStart(2, '0');

            setMonth(monthValue);
            setMonthForSelectAccountHistoryList(monthValue);
        }

        resetDateForSelectAccountHistoryList();
        resetAccountHistoryLast();
        resetAccountHistoryStartCursor();
    }

    const openAccountInsertModal = () => {
        setModalType(0);
        setShowAccountHistoryInsertModal(true);
    }

    const circleButtonProps: CircleButtonProps = {
        image: addWhiteButton,
        action: openAccountInsertModal
    };

    useEffect(() => {
        const nowDateObj = dateToObject();
        setYearForSelectAccountHistoryList(nowDateObj.year);
        setMonthForSelectAccountHistoryList(nowDateObj.month);
        resetCalendarDataMatrix();
        resetYear();
        resetMonth();
        resetDateForSelectAccountHistoryList();

    }, []);

    useEffect(() => {
        const calendarMatrix = calendarMatrixCreator<AccountHistoryCalendarDateData>(year, month);

        if(!multipleAccountIdx) {
            setMultipleAccountIdx(accountIdx === 'undefined' ? '-1' : accountIdx as string);
        }

        getMonthlySummary(calendarMatrix);

        setYearForSelectAccountHistoryList(year);
        setMonthForSelectAccountHistoryList(month);
    }, [
        year, month,
        deletedAccountHistoryIdx,
        updatedAccountHistoryIdx,
        createdAccountHistoryInfo,
        accountIdx,
        multipleAccountIdx
    ]);

    useEffect(() => {
        freezeBackground(showAccountHistoryInsertModal, window, document);

        if (!showAccountHistoryInsertModal) {
            resetSelectedAccountHistoryInfo();
        }

    }, [showAccountHistoryInsertModal]);

    useEffect(() => {
        freezeBackground(showAccountChooseModal, window, document);

    }, [showAccountChooseModal]);

    return (
        <div
            css={styles.container}
        >
            <SetHead/>
            <AccountHistoryDataModal isCalendar={true}/>
            <AccountChooseModal/>

            <div css={circleButtonWrap}>
                <CircleButton {...circleButtonProps}/>
            </div>

            <div css={styles.calendarHeaderWrap}>
                <div css={styles.monthControllerWrap}>
                    <div onClick={previousMonth}>◀</div>
                    <div>{year}년</div>
                    <div>{Number(month)}월</div>
                    <div onClick={nextMonth}>▶</div>
                </div>
            </div>

            <div css={styles.calendarFrameWrap}>
                <CalendarFrame/>

                <div css={styles.monthCostSummaryWrap}>
                    <div id={"outcome"}>
                        <div>월 지출</div>
                        <div>{commaParser(monthOutcome)}원</div>
                    </div>
                    <div id={"income"}>
                        <div>월 수입</div>
                        <div>{commaParser(monthIncome)}원</div>
                    </div>
                </div>
            </div>

            <AccountHistoryList/>
        </div>
    )
}

export default AccountHistoryCalendar
