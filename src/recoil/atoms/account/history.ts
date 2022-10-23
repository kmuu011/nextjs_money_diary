import {atom} from "recoil";
import {getAtomKey} from "../../../utils/recoil";

export const showAccountHistoryInsertModalAtom = atom({
    key: getAtomKey('showAccountHistoryInsertModalAtom'),
    default: false
});

