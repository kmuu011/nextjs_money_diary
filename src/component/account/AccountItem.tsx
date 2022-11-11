import {FunctionComponent, SyntheticEvent, useState} from "react";
import * as styles from "../../../styles/account/Account.style";
import Link from "next/link";
import moreImage from "../../../public/static/button/more/more.svg";
import confirmImage from "../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../public/static/button/cancel/cancel.svg";
import Image from "next/image";
import {AccountItemProps} from "../../interface/props/account/account";
import {commaParser} from "../../utils/utils";

const AccountItem: FunctionComponent<AccountItemProps> = (
    {
        accountInfo,
        isLast,
        setLastElement,
        updateAccount,
        deleteAccount
    }
) => {

    const updateAccountOrder = (e: SyntheticEvent, order: number, up: boolean) => {
        e.stopPropagation();

        if(up && order === 1){
            alert('더이상 위로 순서를 변경할 수 없습니다.');
            return;
        }

        if(!up && isLast){
            alert('더이상 아래로 순서를 변경할 수 없습니다.');
            return;
        }

        const newOrder: number = up ? accountInfo.order-1 : accountInfo.order+1;

        updateAccount(
            accountInfo.idx,
            newOrder
        );
    };

    const deleteAccountItem = (e: SyntheticEvent) => {
        e.stopPropagation();

        deleteAccount(accountInfo.idx);
    }

    return (
        <div
            ref={isLast ? setLastElement : null}
        >
            <Link
                href={`/account/${accountInfo.idx}/history`}
            >
                <div
                    css={styles.accountItem}
                >
                    <div css={styles.accountInfoWrap}>
                        <div css={styles.accountName}>
                            {accountInfo.accountName}
                        </div>
                        <div css={styles.accountAmount}>
                            {commaParser(accountInfo.totalAmount)}원
                        </div>
                    </div>
                    <div css={styles.accountButtonWrap}>
                        <div
                            onClick={(e) => updateAccountOrder(e, accountInfo.order, true)}
                        >
                            위
                        </div>
                        <div></div>
                        <div
                            onClick={(e) => deleteAccountItem(e)}
                        >삭제</div>
                        <div></div>
                        <div></div>
                        <div
                            onClick={(e) => updateAccountOrder(e, accountInfo.order, false)}
                        >
                            아래
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default AccountItem
