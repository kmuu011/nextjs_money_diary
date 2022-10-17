import {atom} from "recoil";
import {getAtomKey} from "../../utils/recoil";

export const showProfileImageModifyModalAtom = atom({
    key: getAtomKey('showProfileImageModifyModalAtom'),
    default: false
});

export const showMemberInfoModifyModalAtom = atom({
    key: getAtomKey('showMemberInfoModifyModalAtom'),
    default: false
});

