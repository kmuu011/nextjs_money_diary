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
    accountHistoryModalTypeAtom,
    createdAccountHistoryInfoAtom,
    dateForSelectAccountHistoryAtom,
    deletedAccountHistoryIdxAtom, selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom,
    updatedAccountHistoryIdxAtom
} from "../../../src/recoil/atoms/account/history";
import {
    AccountHistoryCalendarDateData,
    AccountHistoryItemType
} from "../../../src/interface/type/account/history/history";
import AccountHistoryItem from "../../../src/component/account/history/AccountHistoryItem";
import {selectAccountHistoryApi} from "../../../src/api/account/history/history";
import {CalendarDateDataType} from "../../../src/interface/type/calendar/calendar";
import {SelectAccountMonthSummaryDto} from "../../../src/interface/dto/account/account";
import {selectMonthSummaryDataApi} from "../../../src/api/account/account";
import {AccountDailyCostSummaryType, AccountMonthCostSummaryType} from "../../../src/interface/type/account/account";
import {calendarMatrixCreator, commaParser, freezeBackground} from "../../../src/utils/utils";
import {SelectAccountHistoryDto} from "../../../src/interface/dto/account/history/history";
import AccountHistoryDataModal from "../../../src/component/account/history/modal/AccountHistoryDataModal";
import {useRouter} from "next/router";
import {CircleButtonProps} from "../../../src/interface/props/common";
import addWhiteButton from "../../../public/static/button/add/addWhite.svg";
import {circleButtonWrap} from "../../../styles/common/Common.style";
import CircleButton from "../../../src/component/common/button/CircleButton";
import AccountChooseModal from "../../../src/component/account/modal/AccountChooseModal";
import {showAccountChooseModalAtom} from "../../../src/recoil/atoms/account/account";

const AccountHistoryCalendar: NextPage = () => {
    const router = useRouter();
    const accountIdx = router.query.accountIdx;

    const [year, setYear] = useRecoilState(yearForCalendarAtom);
    const resetYear = useResetRecoilState(yearForCalendarAtom);
    const [month, setMonth] = useRecoilState(monthForCalendarAtom);
    const resetMonth = useResetRecoilState(monthForCalendarAtom);
    const dateForSelectAccountHistoryList = useRecoilValue(dateForSelectAccountHistoryAtom);
    const resetDateForSelectAccountHistoryList = useResetRecoilState(dateForSelectAccountHistoryAtom);
    const [accountHistoryList, setAccountHistoryList] = useState<AccountHistoryItemType[]>([]);
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

    const [startCursor, setStartCursorIdx] = useState<number>(-1);
    const [last, setLast] = useState<boolean>(false);
    const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

    const createdAccountHistoryInfo: AccountHistoryItemType = useRecoilValue(createdAccountHistoryInfoAtom);
    const updatedAccountHistoryIdx = useRecoilValue(updatedAccountHistoryIdxAtom);
    const deletedAccountHistoryIdx = useRecoilValue(deletedAccountHistoryIdxAtom);

    let io: IntersectionObserver;

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
            setMonth('01');
            setYear((Number(year) + 1).toString());
        } else {
            setMonth((Number(month) + 1).toString().padStart(2, '0'))
        }
    }

    const previousMonth = () => {
        if (Number(month) - 1 === 0) {
            setMonth('12');
            setYear((Number(year) - 1).toString());
        } else {
            setMonth((Number(month) - 1).toString().padStart(2, '0'));
        }
    }

    const getAccountHistoryList = async (reset: boolean): Promise<void> => {
        if (!dateForSelectAccountHistoryList || !multipleAccountIdx) return;

        const payload: SelectAccountHistoryDto = {
            startCursor: reset ? -1 : startCursor,
            count: 12,
            date: dateForSelectAccountHistoryList,
            multipleAccountIdx
        };

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

    const openAccountInsertModal = () => {
        setModalType(0);
        setShowAccountHistoryInsertModal(true);
    }

    const circleButtonProps: CircleButtonProps = {
        image: addWhiteButton,
        action: openAccountInsertModal
    };

    useEffect(() => {
        setAccountHistoryList([]);
        resetCalendarDataMatrix();
        resetYear();
        resetMonth();
        resetDateForSelectAccountHistoryList();

    }, []);

    useEffect(() => {
        if (!dateForSelectAccountHistoryList) return;

        getAccountHistoryList(true);
    }, [dateForSelectAccountHistoryList, multipleAccountIdx]);

    useEffect(() => {
        if (startCursor === -1) return;

        getAccountHistoryList(false);
    }, [startCursor]);

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
        const calendarMatrix = calendarMatrixCreator<AccountHistoryCalendarDateData>(year, month);

        if(!multipleAccountIdx) {
            setMultipleAccountIdx(accountIdx === 'undefined' ? '-1' : accountIdx as string);
        }

        getMonthlySummary(calendarMatrix);
    }, [
        year, month,
        deletedAccountHistoryIdx,
        updatedAccountHistoryIdx,
        createdAccountHistoryInfo,
        accountIdx,
        multipleAccountIdx
    ]);

    useEffect(() => {
        accountHistoryList.splice(accountHistoryList.findIndex(v => v.idx === deletedAccountHistoryIdx), 1);
        setAccountHistoryList([...accountHistoryList]);
    }, [deletedAccountHistoryIdx]);

    useEffect(() => {
        if (createdAccountHistoryInfo === undefined) return;
        setAccountHistoryList([
            createdAccountHistoryInfo,
            ...accountHistoryList
        ]);
    }, [createdAccountHistoryInfo]);

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

            <div css={styles.calendarAccountHistoryListWrap}>
                {
                    accountHistoryList.map((accountHistory, i) => {
                        return <AccountHistoryItem
                            accountHistoryInfo={accountHistory}
                            key={accountHistory.idx}
                            isLast={accountHistoryList.length - 3 === i}
                            setLastElement={setLastElement}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default AccountHistoryCalendar
