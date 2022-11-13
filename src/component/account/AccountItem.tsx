import {FunctionComponent, SyntheticEvent, useState} from "react";
import * as styles from "../../../styles/account/Account.style";
import Link from "next/link";
import {AccountItemProps} from "../../interface/props/account/account";
import {commaParser} from "../../utils/utils";
import {useRecoilValue} from "recoil";
import {showAccountDeleteButtonAtom, showAccountOrderChangeButtonAtom} from "../../recoil/atoms/account/account";

const AccountItem: FunctionComponent<AccountItemProps> = (
    {
        accountInfo,
        isLast,
        setLastElement,
        updateAccount,
        deleteAccount
    }
) => {
    const showAccountOrderChangeButton = useRecoilValue(showAccountOrderChangeButtonAtom);
    const showAccountDeleteButton = useRecoilValue(showAccountDeleteButtonAtom);
    const [
        showDeleteConfirmWrap,
        setShowDeleteConfirmWrap
    ] = useState(false);

    const updateAccountOrder = (e: SyntheticEvent, order: number, up: boolean) => {
        e.stopPropagation();

        if (up && order === 1) {
            alert('더이상 위로 순서를 변경할 수 없습니다.');
            return;
        }

        if (!up && isLast) {
            alert('더이상 아래로 순서를 변경할 수 없습니다.');
            return;
        }

        const newOrder: number = up ? accountInfo.order - 1 : accountInfo.order + 1;

        updateAccount(
            accountInfo.idx,
            newOrder,
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
                        {
                            showAccountOrderChangeButton ?
                                <div>
                                    <div
                                        css={styles.accountOrderUpButton}
                                        onClick={(e) => updateAccountOrder(e, accountInfo.order, true)}
                                    >
                                        ⌃
                                    </div>
                                    <div></div>
                                    <div
                                        css={styles.accountOrderDownButton}
                                        onClick={(e) => updateAccountOrder(e, accountInfo.order, false)}
                                    >
                                        ⌃
                                    </div>
                                </div>
                                : <div></div>
                        }
                        {
                            showAccountDeleteButton ?
                                <div>
                                    <div></div>
                                    <div>
                                        {
                                            showDeleteConfirmWrap ? <div css={styles.accountDeleteConfirmButtonWrap}>
                                                    <button
                                                        css={styles.accountDeleteButton}
                                                        onClick={(e) => deleteAccountItem(e)}
                                                    >
                                                        삭제
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setShowDeleteConfirmWrap(false);
                                                        }}
                                                    >
                                                        취소
                                                    </button>
                                                </div>
                                                :
                                                <button
                                                    css={styles.accountDeleteButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setShowDeleteConfirmWrap(true)
                                                    }}
                                                >
                                                    삭제
                                                </button>

                                        }
                                    </div>
                                    <div></div>
                                </div>
                                : <div></div>
                        }
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default AccountItem
