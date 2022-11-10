import {atom} from "recoil";
import {getAtomKey} from "../../../utils/recoil";
import {AccountHistoryItemType} from "../../../interface/type/account/history/history";

export const showAccountHistoryDataModalAtom = atom({
    key: getAtomKey('showAccountHistoryDataModalAtom'),
    default: false
});

export const selectedAccountHistoryInfoAtom = atom<AccountHistoryItemType>({
    key: getAtomKey('selectedAccountHistoryInfoAtom'),
    default: undefined
});

export const updatedAccountHistoryIdxAtom = atom<number>({
    key: getAtomKey('accountHistoryUpdatedAtom'),
    default: undefined
});

export const accountHistoryModalTypeAtom = atom<number>({
    key: getAtomKey('accountHistoryModalTypeAtom'),
    default: undefined
});

