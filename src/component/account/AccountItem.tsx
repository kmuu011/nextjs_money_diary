import {FunctionComponent, SyntheticEvent, useState} from "react";
import * as styles from "../../../styles/account/Account.style";
import Link from "next/link";
import {AccountItemProps} from "../../interface/props/account/account";
import {commaParser} from "../../utils/utils";
import {useRecoilState} from "recoil";
import {showAccountDeleteButtonAtom, showAccountOrderChangeButtonAtom} from "../../recoil/atoms/account/account";
import arrowImg from "../../../public/static/button/arrow/arrow_forward.svg";
import Image from "next/image";

const AccountItem: FunctionComponent<AccountItemProps> = (
    {
        accountInfo,
        isLast,
        setLastElement,
        updateAccount,
        deleteAccount
    }
) => {
    const [
        showAccountOrderChangeButton,
        setShowAccountOrderChangeButton
    ] = useRecoilState(showAccountOrderChangeButtonAtom);
    const [
        showAccountDeleteButton,
        setShowAccountDeleteButton
    ] = useRecoilState(showAccountDeleteButtonAtom);
    const [
        showDeleteConfirmWrap,
        setShowDeleteConfirmWrap
    ] = useState(false);

    const updateAccountOrder = (e: SyntheticEvent, order: number, up: boolean) => {
        e.stopPropagation();

        if (up && order === 1) {
            alert('더이상 순서를 위로 변경할 수 없습니다.');
            return;
        }

        if (!up && isLast) {
            alert('더이상 순서를 아래로 변경할 수 없습니다.');
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
            onClick={() => {
                setShowAccountOrderChangeButton(false);
                setShowAccountDeleteButton(false);
            }}
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
                            {
                                commaParser(
                                    accountInfo.totalAmount,
                                    undefined,
                                    accountInfo.invisibleAmount === 1
                                )
                            }
                            원
                        </div>
                    </div>
                    <div css={styles.accountButtonWrap}>
                        {
                            showAccountOrderChangeButton ?
                                <div>
                                    <div
                                        css={styles.accountOrderUpButton}
                                    >
                                        <Image
                                            onClick={(e) => updateAccountOrder(e, accountInfo.order, true)}
                                            src={arrowImg} width={50} height={50}
                                        />
                                    </div>
                                    <div></div>
                                    <div
                                        css={styles.accountOrderDownButton}
                                    >
                                        <Image
                                            onClick={(e) => updateAccountOrder(e, accountInfo.order, false)}
                                            src={arrowImg} width={50} height={50}
                                        />
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
