import {atom} from "recoil";
import {getAtomKey} from "../../../utils/recoil";

export const showAccountOrderChangeButtonAtom = atom<boolean>({
    key: getAtomKey('showAccountOrderChangeButtonAtom'),
    default: false
});

export const showAccountDeleteButtonAtom = atom<boolean>({
    key: getAtomKey('showAccountDeleteButtonAtom'),
    default: false
});

