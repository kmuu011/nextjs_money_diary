import {SetterOrUpdater} from "recoil";
import {DateObjectType} from "../interface/type/common";
import {CalendarDateDataType} from "../interface/type/calendar/calendar";

const dummyStr: string = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
const dayStrList: string[] = ['일', '월', '화', '수', '목', '금', '토'];
const signType: string[] = ['-', '+'];

const oneDateMillisecond = 60*60*24*1000;

export const hideSideMenuBar = (setShowSideBar: SetterOrUpdater<boolean>): void => {
    setShowSideBar(false);
}

export const createKey = (count?: number, time?: boolean): string => {
    count = count || 20;

    let key = '';

    for (let i = 0; i < count; i++) {
        const ran_int = Math.floor(Math.random() * dummyStr.length);

        key += dummyStr[ran_int];
    }

    if (time) {
        key += '_' + Date.now();
    }

    return key;
};

export const goToPage = (url: string): void => {
    window.location.href = url;
}

export const orRegExpMaker = (list: string[]): RegExp => {
    const finalReg: string = list.reduce((reg, s, i, self) => {
        reg += '^' + s + "$";
        if (i + 1 !== self.length) reg += '|';
        return reg;
    }, '');

    return new RegExp(finalReg);
};

export const freezeBackground = (
    show: boolean,
    window: Window,
    document: Document
) => {
    if (show) {
        document.body.style.cssText = `
                top: -${window.scrollY}px;
                overflow-y: hidden;
                width: 100%;
                `;
    } else {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
}

export const dateToObject = (dateValue?: Date): DateObjectType => {
    dateValue = dateValue ? dateValue : new Date();

    const year = dateValue.getFullYear().toString();
    const month = (Number(dateValue.getMonth()) + 1).toString().padStart(2, '0');
    const date = dateValue.getDate().toString().padStart(2, '0');
    const day = dateValue.getDay();
    const dayStr = dayStrList[day];
    const hour = dateValue.getHours().toString().padStart(2, '0');
    const minute = dateValue.getMinutes().toString().padStart(2, '0');
    const second = dateValue.getSeconds().toString().padStart(2, '0');

    return {year, month, date, day, dayStr, hour, minute, second};
}

export const toDateParser = (dateValue?: Date): string => {
    dateValue = dateValue ? dateValue : new Date();

    const dateObj:DateObjectType = dateToObject(new Date(dateValue));

    return `${dateObj.year}-${dateObj.month}-${dateObj.date}T${dateObj.hour}:${dateObj.minute}`;
}

export const commaParser = (
    value: number,
    type?: number,
    invisible?: boolean
): string => {
    const sign: string = type !== undefined ? signType[type] : '';

    const output = (value > 0 ? sign : '') + Number(value).toLocaleString();

    return invisible ?
        output
            .replace(/\-/g, '')
            .replace(/[0-9]/g, '-')
        : output;
}

export const calendarMatrixCreator = (year: string, month: string) => {
    const thisMonthFirstDate = new Date(`${year}-${month}-01`);
    const nextMonthFirstDate = new Date(thisMonthFirstDate.getTime());
    nextMonthFirstDate.setMonth(nextMonthFirstDate.getMonth()+1);
    const thisMonthLastDate = new Date(nextMonthFirstDate.getTime());
    thisMonthLastDate.setDate(thisMonthLastDate.getDate()-1);

    const startTimeStamp = thisMonthFirstDate.getTime()-(thisMonthFirstDate.getDay()*oneDateMillisecond);
    const endTimeStamp = thisMonthLastDate.getTime()+((6-thisMonthLastDate.getDay())*oneDateMillisecond);

    const calendarDateMatrix: [CalendarDateDataType<undefined>[]] = [[]];

    const nowDateObj: DateObjectType = dateToObject();

    let cnt = -1;
    let week: CalendarDateDataType<undefined>[] = [];
    while(true){
        cnt++;
        if(startTimeStamp+(oneDateMillisecond*cnt) > endTimeStamp) break;

        const dateObj = dateToObject(new Date(startTimeStamp+(oneDateMillisecond*cnt)));

        week.push({
            isToday: nowDateObj.year+nowDateObj.month+nowDateObj.date === dateObj.year+dateObj.month+dateObj.date,
            isThisMonth: nowDateObj.year+nowDateObj.month === dateObj.year+dateObj.month,
            year: dateObj.year,
            month: dateObj.month,
            date: dateObj.date
        });

        if(week.length === 7) {
            calendarDateMatrix.push(week);
            week = [];
        }
    }

    calendarDateMatrix.splice(0,1);

    return calendarDateMatrix;
};