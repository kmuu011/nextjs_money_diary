import {AccountHistoryCategoryItemType} from "../../../type/account/history/category";
import {Dispatch, SetStateAction} from "react";

export interface AccountHistoryItemProps {
    idx: number
    amount: number
    content: string
    type: number
    createdAt: string
    accountHistoryCategory: AccountHistoryCategoryItemType
    isLast: boolean
    setLastElement: Dispatch<SetStateAction<HTMLDivElement | null>>
}

