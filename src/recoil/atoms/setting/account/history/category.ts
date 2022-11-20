import {atom} from "recoil";
import {getAtomKey} from "../../../../../utils/recoil";

export const showSettingAccountHistoryDataModal = atom<boolean>({
    key: getAtomKey('showSettingAccountHistoryDataModal'),
    default: false
});
