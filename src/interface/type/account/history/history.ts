import {AccountHistoryCategoryItemType} from "./category";
import {AccountItemType} from "../account";

export interface AccountHistoryItemType {
    idx: number
    accountHistoryCategory: AccountHistoryCategoryItemType
    account: AccountItemType
    amount: number
    content: string
    type: number
    createdAt: Date
    updatedAt: Date
}

export interface AccountHistoryCalendarDateData {
    income: number
    outcome: number
}