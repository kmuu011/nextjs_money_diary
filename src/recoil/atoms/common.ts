import {atom} from "recoil";
import {getAtomKey} from "../../utils/recoil";

export const showSideBarAtom = atom({
    key: getAtomKey('showSideBar'),
    default: false
});

