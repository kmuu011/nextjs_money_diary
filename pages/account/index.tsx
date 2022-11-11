import type {NextPage} from 'next';
import * as styles from '../../styles/account/Account.style';
import {useEffect, useState} from "react";
import SetHead from "../../src/component/common/Head";
import {createAccountApi, deleteAccountApi, selectAccountApi, updateAccountApi} from "../../src/api/account/account";
import {AccountItemType} from "../../src/interface/type/account/account";
import AccountItem from "../../src/component/account/AccountItem";

const Account: NextPage = () => {
    const [accountList, setAccountList] = useState<AccountItemType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [cursor, setCursor] = useState<number>(0);
    const [last, setLast] = useState<boolean>(false);
    const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

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

    const getAccountList = async (): Promise<void> => {
        const response = await selectAccountApi({cursor, count: 4});

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setTotalCount(response.data.totalCount);
        setAccountList([...accountList, ...response.data.items]);
        setLast(response.data.items.length === 0);
    }

    const nextPage = () => {
        if(last) return;

        if(io && lastElement){
            io.unobserve(lastElement);
        }

        setCursor(accountList[accountList.length-1].order);
    }

    useEffect(() => {
        getAccountList();
    }, [cursor]);

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

    const updateAccount = async (
        accountIdx: number,
        order: number
    ) => {
        const response = await updateAccountApi(
            accountIdx,
            {
                order
            }
        );
    };

    const deleteAccount = async (accountIdx: number) => {
        const response = await deleteAccountApi(accountIdx);
    }


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
                    1,500,000원
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
