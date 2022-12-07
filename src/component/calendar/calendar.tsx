import {FunctionComponent, useEffect, useState} from "react";
import * as styles from "../../../styles/account/history/AccountHistoryCalendar.style";
import {useRecoilState} from "recoil";
import {monthForCalendar, yearForCalendar} from "../../recoil/atoms/calendar/calendar";
import {CalendarDateDataType} from "../../interface/type/calendar/calendar";
import {calendarMatrixCreator, commaParser} from "../../utils/utils";
import {AccountHistoryCalendarDateData} from "../../interface/type/account/history/history";
import {selectMonthSummaryDataApi} from "../../api/account/account";
import {SelectAccountMonthSummaryDto} from "../../interface/dto/account/account";
import {
    AccountDailyCostSummaryType,
    AccountMonthCostSummaryType,
} from "../../interface/type/account/account";

const CalendarFrame: FunctionComponent = () => {
    const [year, setYear] = useRecoilState(yearForCalendar);
    const [month, setMonth] = useRecoilState(monthForCalendar);

    const [calendarDataMatrix, setCalendarDataMatrix] =
        useState<[CalendarDateDataType<AccountHistoryCalendarDateData>[]]>([[]]);
    const [monthIncome, setMonthIncome] = useState<number>(0);
    const [monthOutcome, setMonthOutcome] = useState<number>(0);
    const [selectedDay, setSelectedDay] = useState<HTMLDivElement>();
    const [previousColor, setPreviousColor] = useState<string>("");

    const getMonthlySummary = async (
        calendarMatrix: [CalendarDateDataType<AccountHistoryCalendarDateData>[]],
    ) => {
        const startDateObj: CalendarDateDataType<AccountHistoryCalendarDateData> = calendarMatrix[0][0];
        const endDateObj: CalendarDateDataType<AccountHistoryCalendarDateData> =
            calendarMatrix[calendarMatrix.length - 1][calendarMatrix[calendarMatrix.length - 1].length - 1];

        const payload: SelectAccountMonthSummaryDto = {
            year,
            month,
            startDate: startDateObj.year + startDateObj.month + startDateObj.date,
            endDate: endDateObj.year + endDateObj.month + endDateObj.date,
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

        setCalendarDataMatrix(calendarMatrix);
    }

    const chooseDay = async (
        e: HTMLDivElement,
        dayInfo: CalendarDateDataType<AccountHistoryCalendarDateData>
    ) => {
        if (selectedDay === e) return;
        if (selectedDay) {
            selectedDay.style.backgroundColor = previousColor;
        }

        setPreviousColor(e.style.backgroundColor);
        setSelectedDay(e);
    }

    const resetSelectDay = () => {
        if (selectedDay) {
            selectedDay.style.backgroundColor = previousColor;
            setSelectedDay(undefined);
        }
    }

    const nextMonth = () => {
        resetSelectDay();

        if(Number(month)+1 === 13){
            setMonth('01');
            setYear((Number(year)+1).toString());
        }else{
            setMonth((Number(month)+1).toString().padStart(2, '0'))
        }

    }

    const previousMonth = () => {
        resetSelectDay();
        
        if(Number(month)-1 === 0){
            setMonth('12');
            setYear((Number(year)-1).toString());
        }else{
            setMonth((Number(month)-1).toString().padStart(2, '0'));
        }
    }

    useEffect(() => {
        const calendarMatrix = calendarMatrixCreator<AccountHistoryCalendarDateData>(year, month);

        getMonthlySummary(calendarMatrix)
    }, [year, month]);

    useEffect(() => {
        if (!selectedDay) return;

        selectedDay.style.backgroundColor = `var(--color-1)`;
    }, [selectedDay]);

    return (
        <div css={styles.container}>
            <div>
                <div css={styles.headWrap}>
                    <div onClick={previousMonth}>◀</div>
                    <div>{year}년</div>
                    <div>{month}월</div>
                    <div onClick={nextMonth}>▶</div>

                </div>
            </div>

            <div css={styles.calendarWeekWrap}>
                {
                    ["일", "월", "화", "수", "목", "금", "토"].map(v => {
                        return <div
                            key={v}
                            css={styles.calendarDay}
                        >{v}</div>
                    })
                }
            </div>
            <div css={styles.calendarBodyWrap}>
                {
                    calendarDataMatrix.map((week, weekCount) => {
                        return <div
                            key={weekCount}
                            css={styles.calendarBodyWeekWrap}
                        >
                            {
                                week.map((day, dayCount) => {
                                    return <div
                                        key={dayCount}
                                        css={styles.calendarBodyDayWrap(
                                            day.isThisMonth, day.isToday,
                                            day.data?.income, day.data?.outcome
                                        )}
                                        onClick={(e) => {
                                            chooseDay(e.currentTarget, day);
                                        }}
                                    >
                                        <div>
                                            {Number(day.date)}
                                        </div>
                                        <div>
                                            {day.data?.income ? commaParser(Number(day.data?.income)) :
                                                <span>&nbsp;</span>}
                                        </div>
                                        <div>
                                            {day.data?.outcome ? commaParser(Number(day.data.outcome)) :
                                                <span>&nbsp;</span>}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default CalendarFrame
