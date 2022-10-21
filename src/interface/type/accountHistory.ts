import {AccountHistoryCategoryItemType} from "./accountHistoryCategory";

export interface AccountHistoryItemType {
    idx: number
    accountHistoryCategory: AccountHistoryCategoryItemType
    amount: number
    content: string
    type: number
    createdAt: string
    updatedAt: string
}