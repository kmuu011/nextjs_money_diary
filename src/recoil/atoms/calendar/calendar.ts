import {atom} from "recoil";
import {getAtomKey} from "../../../utils/recoil";
import {dateToObject} from "../../../utils/utils";

const nowDateObj = dateToObject();

export const yearForCalendar = atom<string>({
    key: getAtomKey('yearForCalendar'),
    default: nowDateObj.year.toString()
});

export const monthForCalendar = atom<string>({
    key: getAtomKey('monthForCalendar'),
    default: nowDateObj.month
});
