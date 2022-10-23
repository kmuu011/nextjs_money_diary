import {atom} from "recoil";
import {getAtomKey} from "../../../utils/recoil";

export const accountIdxAtom = atom({
    key: getAtomKey('accountIdxAtom'),
    default: 0
});

