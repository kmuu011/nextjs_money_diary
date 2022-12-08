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

export const createdAccountHistoryInfoAtom = atom<AccountHistoryItemType>({
    key: getAtomKey('createdAccountHistoryInfoAtom'),
    default: undefined
});

export const updatedAccountHistoryIdxAtom = atom<number>({
    key: getAtomKey('accountHistoryUpdatedAtom'),
    default: undefined
});

export const deletedAccountHistoryIdxAtom = atom<number>({
    key: getAtomKey('deletedAccountHistoryIdxAtom'),
    default: undefined
});

export const accountHistoryModalTypeAtom = atom<number>({
    key: getAtomKey('accountHistoryModalTypeAtom'),
    default: undefined
});

export const accountHistoryTypeAtom = atom<number>({
    key: getAtomKey('accountHistoryCategoryAtom'),
    default: undefined
});

export const accountHistoryCategoryAtom = atom<number>({
    key: getAtomKey('accountHistoryCategoryAtom'),
    default: 0
});

export const dateForSelectAccountHistoryAtom = atom<string>({
    key: getAtomKey('dateForSelectAccountHistoryAtom'),
    default: undefined
});