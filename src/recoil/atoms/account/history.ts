import {atom} from "recoil";
import {getAtomKey} from "../../../utils/recoil";
import {AccountHistoryItemType} from "../../../interface/type/account/history/history";

export const showAccountHistoryInsertModalAtom = atom({
    key: getAtomKey('showAccountHistoryInsertModalAtom'),
    default: false
});

export const showAccountHistoryUpdateModalAtom = atom({
    key: getAtomKey('showAccountHistoryUpdateModalAtom'),
    default: false
});

export const selectedAccountHistoryInfoAtom = atom<AccountHistoryItemType>({
    key: getAtomKey('selectedAccountHistoryInfoAtom'),
    default: undefined
});

export const updatedAccountHistoryIdxAtom = atom<number>({
    key: getAtomKey('accountHistoryUpdatedAtom'),
    default: undefined
})

