import type {NextPage} from 'next';
import * as styles from '../../styles/account/Account.style';
import {useEffect, useState} from "react";
import SetHead from "../../src/component/common/Head";
import {createAccountApi, selectAccountApi} from "../../src/api/account/account";
import {AccountItemType} from "../../src/interface/type/account/account";
import InfiniteScroll from 'react-infinite-scroller';
import AccountItem from "../../src/component/account/AccountItem";

const Account: NextPage = () => {
    const [accountList, setAccountList] = useState<AccountItemType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [last, setLast] = useState<number>(0);

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
        const selectPage = initial ? 1 : nextPage ? page + 1 : page;

        if (last !== 0 && last < selectPage) return;

        const response = await selectAccountApi({page: selectPage, count: 12});

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

    useEffect(() => {
        getAccountList();
    }, []);

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
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={1}
                    loadMore={() => getAccountList(true)}
                    hasMore={true}
                >
                    {
                        accountList.map((account) => {
                            return <AccountItem
                                index={account.idx}
                                accountName={account.accountName}
                                invisibleAmount={account.invisibleAmount}
                                order={account.order}
                                totalAmount={account.totalAmount}
                                key={account.idx}
                                reloadAccountList={getAccountList}
                            />
                        })
                    }
                </InfiniteScroll>
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
