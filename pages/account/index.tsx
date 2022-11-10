import type {NextPage} from 'next';
import * as styles from '../../styles/account/Account.style';
import {useEffect, useState} from "react";
import SetHead from "../../src/component/common/Head";
import {createAccountApi, selectAccountApi} from "../../src/api/account/account";
import {AccountItemType} from "../../src/interface/type/account/account";
import AccountItem from "../../src/component/account/AccountItem";

const Account: NextPage = () => {
    const [accountList, setAccountList] = useState<AccountItemType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [last, setLast] = useState<number>(0);
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

        await getAccountList(undefined, true);
    }

    const getAccountList = async (nextPage?: boolean, initial?: boolean): Promise<void> => {
        const selectPage = initial ? 1 : page;

        const response = await selectAccountApi({page: selectPage, count: 4});

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setTotalCount(response.data.totalCount);

        setAccountList(initial ?
            response.data.items : [...accountList, ...response.data.items]
        );

        setPage(response.data.page);
        setLast(response.data.last);
    }

    const nextPage = () => {
        if(last !== 0 && last < page+1) return;
        setPage(page+1);

        if(io && lastElement){
            io.unobserve(lastElement);
        }
    }

    // useEffect(() => {
    //     getAccountList();
    // }, []);

    useEffect(() => {
        getAccountList(true);
    }, [page]);

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
                    1,500,000원
                </div>
            </div>

            <div css={styles.accountListWrap}>
                <div>
                    {
                        accountList.map((account, i) => {
                            return <AccountItem
                                index={account.idx}
                                accountName={account.accountName}
                                totalAmount={account.totalAmount}
                                invisibleAmount={account.invisibleAmount}
                                order={account.order}
                                reloadAccountList={getAccountList}
                                isLast={i === accountList.length-1}
                                setLastElement={setLastElement}
                                key={account.idx}
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
