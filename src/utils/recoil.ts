import {createKey} from "./utils";

export const getAtomKey = (key: string) => {
    return key + createKey();
}