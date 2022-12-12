import type {NextPage} from 'next';
import * as styles from '../../styles/account/Account.style';
import {useEffect, useState} from "react";
import SetHead from "../../src/component/common/Head";
import {createAccountApi, deleteAccountApi, selectAccountApi, updateAccountApi} from "../../src/api/account/account";
import {AccountItemType} from "../../src/interface/type/account/account";
import AccountItem from "../../src/component/account/AccountItem";
import {useRecoilState, useResetRecoilState} from "recoil";
import {showAccountDeleteButtonAtom, showAccountOrderChangeButtonAtom} from "../../src/recoil/atoms/account/account";
import swapButton from "../../public/static/button/swap/swap_white.svg";
import deleteSweepButton from "../../public/static/button/delete/delete_sweep.svg";
import Image from "next/image";
import {commaParser} from "../../src/utils/utils";

const Account: NextPage = () => {
    const [accountList, setAccountList] = useState<AccountItemType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [startCursor, setStartCursor] = useState<number>(0);
    const [last, setLast] = useState<boolean>(false);
    const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const [
        showAccountOrderChangeButton,
        setShowAccountOrderChangeButton
    ] = useRecoilState(showAccountOrderChangeButtonAtom);

    const [
        showAccountDeleteButton,
        setShowAccountDeleteButton
    ] = useRecoilState(showAccountDeleteButtonAtom);

    let io: IntersectionObserver;

    const createAccount = async (): Promise<void> => {
        const response = await createAccountApi({
            accountName: `제 ${totalCount + 1}가계부`
        });

        if (response?.status !== 201) {
            alert(response?.data.message);
            return;
        }

        setAccountList([
            ...accountList,
            ...[response.data]
        ]);
        setTotalCount(totalCount+1);
    }

    const getAccountList = async (reset?: boolean): Promise<void> => {
        const query = {
            startCursor: reset ? 0 : startCursor,
            endCursor: reset ? accountList[accountList.length-1]?.order : undefined,
            count: 4
        }

        const response = await selectAccountApi(query);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setTotalCount(response.data.totalCount);
        setAccountList(
            reset ? response.data.items
                :
            [...accountList, ...response.data.items]
        );
        setLast(response.data.items.length === 0);
        setTotalAmount(response.data.totalAmount);
    }

    const nextPage = () => {
        if(last) return;

        if(io && lastElement){
            io.unobserve(lastElement);
        }

        setStartCursor(accountList[accountList.length-1].order);
    }

    const updateAccount = async (
        accountIdx: number,
        newOrder: number,
    ) => {
        const response = await updateAccountApi(
            accountIdx,
            {
                order: newOrder
            }
        );

        if(response?.status !== 200){
            alert(response?.data.message);
            return;
        }

        getAccountList(true);

    };

    const deleteAccount = async (accountIdx: number) => {
        const response = await deleteAccountApi(accountIdx);

        if(response?.status !== 200){
            alert(response?.data.message);
            return;
        }

        getAccountList(true);
    }

    useEffect(() => {
        getAccountList();

    }, [startCursor]);

    useEffect(() => {
        io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    nextPage();
                }
            })
        })

        if(io && lastElement){
            io.observe(lastElement);
        }

    }, [lastElement]);

    return (
        <div
            css={styles.container}
        >
            <SetHead/>

            <div css={styles.accountTotalStatisticWrap}>
                <div css={styles.allAccountTotalAmountDesc}>
                    총 자산
                </div>
                <div css={styles.allAccountTotalAmount}>
                    {commaParser(totalAmount)}원
                </div>
                <div
                    css={styles.allAccountOptionButtonWrap}
                >
                    <div
                        onClick={() => {
                            setShowAccountOrderChangeButton(!showAccountOrderChangeButton);
                            setShowAccountDeleteButton(false);
                        }}
                    >
                        <button>
                            <Image src={swapButton} alt={"삭제 버튼"} width={40} height={40}/>
                        </button>
                    </div>
                    <div
                        onClick={() => {
                            setShowAccountDeleteButton(!showAccountDeleteButton);
                            setShowAccountOrderChangeButton(false);
                        }}
                    >
                        <button>
                            <Image src={deleteSweepButton} alt={"순서변경 버튼"} width={40} height={40}/>
                        </button>
                    </div>
                </div>
            </div>

            <div css={styles.accountListWrap}>
                <div>
                    {
                        accountList.map((account, i) => {
                            return <AccountItem
                                key={account.idx}
                                accountInfo={account}
                                isLast={i === accountList.length-1}
                                setLastElement={setLastElement}
                                updateAccount={updateAccount}
                                deleteAccount={deleteAccount}
                            />
                        })
                    }
                </div>
                <div
                    css={styles.accountLastItem}
                    onClick={createAccount}
                >
                    <div css={styles.accountAddPlus}>
                        +
                    </div>
                    <div css={styles.accountAddText}>
                        가계부 추가
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Account
