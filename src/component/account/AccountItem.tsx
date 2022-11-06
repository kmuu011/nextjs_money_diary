import {FunctionComponent, useState} from "react";
import * as styles from "../../../styles/account/Account.style";
import Link from "next/link";
import moreImage from "../../../public/static/button/more/more.svg";
import confirmImage from "../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../public/static/button/cancel/cancel.svg";
import Image from "next/image";
import {deleteAccountApi, updateAccountApi} from "../../api/account/account";
import {AccountItemProps} from "../../interface/props/account/account";
import {commaParser} from "../../utils/utils";

const AccountItem: FunctionComponent<AccountItemProps> = (
    {
        index, accountName,
        totalAmount, invisibleAmount, order,
        reloadAccountList
    }
) => {
    const [showMore, setShowMore] = useState(false);
    const [getAccountName, setAccountName] = useState(accountName);
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

    const updateAccount = async (): Promise<void> => {
        const response = await updateAccountApi(
            index,
            {
                accountName: getAccountName,
                invisibleAmount,
                order
            }
        );

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setModifyMode(false);
        reloadAccountList(undefined, true);
    }

    const deleteAccount = async (): Promise<void> => {
        const response = await deleteAccountApi(index);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setModifyMode(false);
        reloadAccountList(undefined, true);
    }

    return (
        <Link href={`/account/${index}/history`}>
            <div
                css={styles.accountItem}
            >
                <div css={styles.accountName}>
                    {accountName}
                </div>
                <div css={styles.accountAmount}>
                    {commaParser(totalAmount)}원
                </div>

            </div>
        </Link>
    )
}

export default AccountItem
