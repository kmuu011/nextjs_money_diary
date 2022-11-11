import {Dispatch, SetStateAction} from "react";
import {AccountItemType} from "../../type/account/account";

export interface AccountItemProps {
    accountInfo: AccountItemType
    isLast: boolean
    setLastElement: Dispatch<SetStateAction<HTMLDivElement | null>>
    updateAccount: Function
    deleteAccount: Function
}