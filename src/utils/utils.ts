import {SetterOrUpdater} from "recoil";
import {DateObjectType} from "../interface/type/common";

const dummyStr: string = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
const dayStrList: string[] = ['일', '월', '화', '수', '목', '금', '토'];

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

    const year = dateValue.getFullYear();
    const month = (Number(dateValue.getMonth()) + 1).toString().padStart(2, '0');
    const date = dateValue.getDate().toString().padStart(2, '0');
    const day = dateValue.getDay();
    const dayStr = dayStrList[day];
    const hour = dateValue.getHours().toString().padStart(2, '0');
    const minute = dateValue.getMinutes().toString().padStart(2, '0');
    const second = dateValue.getSeconds().toString().padStart(2, '0');

    return {year, month, date, day, dayStr, hour, minute, second}
}