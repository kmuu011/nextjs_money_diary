import {FunctionComponent, useState} from "react";
import * as styles from "../../../../styles/account/history/History.style";
import Link from "next/link";
import moreImage from "../../../public/static/button/more/more.svg";
import confirmImage from "../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../public/static/button/cancel/cancel.svg";
import Image from "next/image";
import {AccountHistoryItemProps} from "../../../interface/props/account/history/history";
import {commaParser, dateToObject} from "../../../utils/utils";

const AccountHistoryItem: FunctionComponent<AccountHistoryItemProps> = (
    {
        idx, amount, content,
        type, createdAt,
        accountHistoryCategory
    }
) => {
    const [showMore, setShowMore] = useState(false);
    const dateObj = dateToObject(new Date(createdAt));

    const showMoreMenu = (): void => {
        setShowMore(true)
    }
    // const updateAccountHistory = async (): Promise<void> => {
    //     const response = await updateAccountHistoryApi(
    //         index,
    //         {
    //             accountHistoryName: getAccountHistoryName,
    //             invisibleAmount,
    //             order
    //         }
    //     );
    //
    //     if (response?.status !== 200) {
    //         alert(response?.data.message);
    //         return;
    //     }
    //
    //     setModifyMode(false);
    //     reloadAccountHistoryList(undefined, true);
    // }
    //
    // const deleteAccountHistory = async (): Promise<void> => {
    //     const response = await deleteAccountHistoryApi(index);
    //
    //     if (response?.status !== 200) {
    //         alert(response?.data.message);
    //         return;
    //     }
    //
    //     setModifyMode(false);
    //     reloadAccountHistoryList(undefined, true);
    // }

    return (
        <div
            className={styles.accountHistoryItem}
        >
            <div className={styles.historyDate}>
                {`${dateObj.year}.${dateObj.month}.${dateObj.date} 
                (${dateObj.dayStr})
                ${dateObj.hour}:${dateObj.minute}`}
            </div>

            <div className={styles.historyInfoWrap}>
                <div className={styles.leftInfo}>
                    <div className={styles.categoryName}>
                        {accountHistoryCategory.name}
                    </div>
                    <div>{content}</div>
                </div>
                <div className={styles.rightInfo}>
                    {
                        type === 0 ?
                            <div className={styles.historyContent(type)}>
                                {commaParser(amount, type)}원
                            </div>
                            :
                            <div className={styles.historyContent(type)}>
                                {commaParser(amount, type)}원
                            </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default AccountHistoryItem
