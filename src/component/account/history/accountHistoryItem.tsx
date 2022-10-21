import {FunctionComponent, useState} from "react";
import * as styles from "../../../../styles/account/history/History.style";
import Link from "next/link";
import moreImage from "../../../public/static/button/more/more.svg";
import confirmImage from "../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../public/static/button/cancel/cancel.svg";
import Image from "next/image";

const AccountHistoryItem: FunctionComponent<any> = (
    {
        index, accountHistoryName,
        totalAmount, invisibleAmount, order,
        reloadAccountHistoryList
    }
) => {
    const [showMore, setShowMore] = useState(false);
    const [getAccountHistoryName, setAccountHistoryName] = useState(accountHistoryName);
    const [modifyMode, setModifyMode] = useState(false);

    const showMoreMenu = (): void => {
        setShowMore(true)
    }

    const modifyStart = (): void => {
        setShowMore(false);
        setModifyMode(true);
    }

    const cancelModify = (): void => {
        setModifyMode(false);
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
            {/*<Link href={`/accountHistory/${index}`}>*/}
            {/*</Link>*/}

        </div>
    )
}

export default AccountHistoryItem
