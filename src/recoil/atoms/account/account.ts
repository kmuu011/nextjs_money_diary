import {atom} from "recoil";
import {getAtomKey} from "../../../utils/recoil";

export const getAccountInfoAtom = atom({
    key: getAtomKey('getAccountInfo'),
    default: () => {}
});

