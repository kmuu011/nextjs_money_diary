import {AccountHistoryCategoryItemType} from "../../../type/account/history/category";

export interface AccountHistoryItemProps {
    idx: number
    amount: number
    content: string
    type: number
    createdAt: string
    accountHistoryCategory: AccountHistoryCategoryItemType
}