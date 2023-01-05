import {atom} from "recoil";
import {getAtomKey} from "../../../utils/recoil";
import {dateToObject} from "../../../utils/utils";
import {CalendarDateDataType} from "../../../interface/type/calendar/calendar";
import {AccountHistoryCalendarDateData} from "../../../interface/type/account/history/history";

const nowDateObj = dateToObject();

export const yearForCalendarAtom = atom<string>({
    key: getAtomKey('yearForCalendarAtom'),
    default: nowDateObj.year.toString()
});

export const monthForCalendarAtom = atom<string>({
    key: getAtomKey('monthForCalendarAtom'),
    default: nowDateObj.month
});

export const calendarDataMatrixAtom = atom<[CalendarDateDataType<AccountHistoryCalendarDateData>[]]>({
    key: getAtomKey('calendarDataMatrixAtom'),
    default: [[]]
});

export const multipleAccountIdxAtom = atom<string | undefined>({
    key: getAtomKey('multipleAccountIdxAtom'),
    default: undefined
});


