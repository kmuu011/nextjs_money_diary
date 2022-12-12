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

export const showAccountUpdateModalAtom = atom<boolean>({
    key: getAtomKey('showAccountDeleteButtonAtom'),
    default: false
});

export const selectedAccountIdxAtom = atom<number>({
    key: getAtomKey('selectedAccountIdxAtom'),
    default: undefined
})

export const showAccountChooseModalAtom = atom<boolean>({
    key: getAtomKey('showAccountChooseModalAtom'),
    default: false
})