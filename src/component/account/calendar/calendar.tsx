import {FunctionComponent, useEffect, useState} from "react";
import * as styles from "../../../../styles/account/AccountCalendar.style";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    calendarDataMatrixAtom,
    monthForCalendarAtom,
    yearForCalendarAtom
} from "../../../recoil/atoms/calendar/calendar";
import {CalendarDateDataType} from "../../../interface/type/calendar/calendar";
import {commaParser} from "../../../utils/utils";
import {AccountHistoryCalendarDateData} from "../../../interface/type/account/history/history";
import {dateForSelectAccountHistoryAtom} from "../../../recoil/atoms/account/history";

const CalendarFrame: FunctionComponent = () => {
    const year = useRecoilValue(yearForCalendarAtom);
    const month = useRecoilValue(monthForCalendarAtom);
    const setDateForSelect = useSetRecoilState(dateForSelectAccountHistoryAtom);
    const calendarDataMatrix =
        useRecoilValue<[CalendarDateDataType<AccountHistoryCalendarDateData>[]]>(calendarDataMatrixAtom);

    const [selectedDay, setSelectedDay] = useState<HTMLDivElement>();
    const [previousColor, setPreviousColor] = useState<string>("");

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
        setDateForSelect(dayInfo.year + dayInfo.month + dayInfo.date);
    }

    useEffect(() => {
        if (!selectedDay) return;
        selectedDay.style.backgroundColor = previousColor;
        setSelectedDay(undefined);
    }, [year, month]);

    useEffect(() => {
        if (!selectedDay) return;

        selectedDay.style.backgroundColor = `var(--color-2)`;
    }, [selectedDay]);

    return (
        <div>
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
