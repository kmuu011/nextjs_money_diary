import {atom} from "recoil";
import {getAtomKey} from "../../../../../utils/recoil";
import {AccountHistoryCategoryItemType} from "../../../../../interface/type/account/history/category";

export const showSettingAccountHistoryCategoryDataModalAtom = atom<boolean>({
    key: getAtomKey('showSettingAccountHistoryCategoryDataModalAtom'),
    default: false
});

export const selectedAccountHistoryCategoryInfoAtom = atom<AccountHistoryCategoryItemType>({
    key: getAtomKey('selectedAccountHistoryCategoryInfoAtom'),
    default: undefined
})