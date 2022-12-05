import {FunctionComponent, useEffect, useState} from "react";
import * as styles from "../../../styles/account/history/AccountHistoryCalendar.style";
import {useRecoilValue} from "recoil";
import {monthForCalendar, yearForCalendar} from "../../recoil/atoms/calendar/calendar";
import {CalendarDateDataType} from "../../interface/type/calendar/calendar";
import {calendarMatrixCreator} from "../../utils/utils";
import {AccountHistoryCalendarDateData} from "../../interface/type/account/history/history";
import {selectMonthSummaryDataApi} from "../../api/account/account";
import {SelectAccountMonthSummaryDto} from "../../interface/dto/account/account";

const CalendarFrame: FunctionComponent = () => {
    const year = useRecoilValue(yearForCalendar);
    const month = useRecoilValue(monthForCalendar);

    const [calendarDataMatrix, setCalendarDataMatrix] =
        useState<[CalendarDateDataType<AccountHistoryCalendarDateData>[]]>([[]]);

    const getMonthlySummary = async (
        calendarMatrix: [CalendarDateDataType<undefined>[]],
    ) => {
        const startDateObj:CalendarDateDataType<undefined> = calendarMatrix[0][0];
        const endDateObj:CalendarDateDataType<undefined> =
            calendarMatrix[calendarMatrix.length-1][calendarMatrix[calendarMatrix.length-1].length-1];

        console.log(startDateObj);
        console.log(endDateObj);
        const payload: SelectAccountMonthSummaryDto = {
            year,
            month,
            startDate: startDateObj.year+startDateObj.month+startDateObj.date,
            endDate: endDateObj.year+endDateObj.month+endDateObj.date,
        }

        const response = await selectMonthSummaryDataApi(payload);

        if(response?.status !== 200){
            alert(response?.data.message);
            return;
        }

        console.log(response.data);
    }

    useEffect(() => {
        const calendarMatrix = calendarMatrixCreator(year, month);

        getMonthlySummary(calendarMatrix)

    }, [year, month]);

    return (
        <div css={styles.container}>
            <div css={styles.calendarWeekWrap}>
                <div css={styles.calendarDay}>
                    일
                </div>
                <div css={styles.calendarDay}>
                    월
                </div>
                <div css={styles.calendarDay}>
                    화
                </div>
                <div css={styles.calendarDay}>
                    수
                </div>
                <div css={styles.calendarDay}>
                    목
                </div>
                <div css={styles.calendarDay}>
                    금
                </div>
                <div css={styles.calendarDay}>
                    토
                </div>
            </div>
            <div css={styles.calendarBodyWrap}>

            </div>
        </div>
    )
}

export default CalendarFrame
