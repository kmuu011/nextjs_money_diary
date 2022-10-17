import type {NextPage} from 'next';
import * as styles from '../../styles/account/Account.style';
import {useEffect, useState} from "react";
import SetHead from "../../src/component/common/Head";
import CircleButton from "../../src/component/common/button/CircleButton";
import addImage from "../../public/static/button/add/add.svg";
import {createAccountApi, selectAccountApi} from "../../src/api/account";
import {AccountItemType} from "../../src/interface/type/account";
import InfiniteScroll from 'react-infinite-scroller';
import AccountItem from "../../src/component/account/accountItem";
import {CircleButtonProps} from "../../src/interface/props/common";

const Account: NextPage = () => {
    const [accountList, setAccountList] = useState<AccountItemType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [last, setLast] = useState<number>(0)

    const createAccount = async (): Promise<void> => {
        const response = await createAccountApi({
            accountName: `test`
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

    const circleButtonProps: CircleButtonProps = {
        image: addImage,
        action: createAccount
    }

    useEffect(() => {
        getAccountList();
    }, []);

    return (
        <div className={styles.container()}>
            <SetHead/>

            <div className={styles.circleButtonWrap}>
                <CircleButton {...circleButtonProps}/>
            </div>

            <div className={styles.accountTotalStatisticWrap}>
                <div className={styles.allAccountTotalAmountDesc}>
                    내 자산
                </div>
                <div className={styles.allAccountTotalAmount}>
                    1,500,000원
                </div>
            </div>

            <InfiniteScroll
                className={styles.accountListWrap}
                initialLoad={false}
                pageStart={1}
                loadMore={() => getAccountList(true)}
                hasMore={true}
            >
                {
                    accountList.map((account, i) => {
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

        </div>
    )
}

export default Account
