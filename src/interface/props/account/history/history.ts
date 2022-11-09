import {Dispatch, SetStateAction} from "react";
import {AccountHistoryItemType} from "../../../type/account/history/history";

export interface AccountHistoryItemProps {
    accountHistoryInfo: AccountHistoryItemType,
    isLast: boolean
    setLastElement: Dispatch<SetStateAction<HTMLDivElement | null>>
}

