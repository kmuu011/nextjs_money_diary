import type {NextPage} from 'next';
import * as styles from "../../../../styles/setting/account/history/AccountHistoryCategorySetting.style";
import SetHead from "../../../../src/component/common/Head";
import {useRecoilState, useSetRecoilState} from "recoil";
import {accountHistoryTypeAtom} from "../../../../src/recoil/atoms/account/history";
import AccountHistoryType from "../../../../src/component/account/history/AccountHistoryType";
import {useEffect, useState} from "react";
import {AccountHistoryCategoryItemType} from "../../../../src/interface/type/account/history/category";
import {
    createAccountHistoryCategoryApi,
    selectAccountHistoryCategoryApi
} from "../../../../src/api/account/history/category";
import {showSettingAccountHistoryDataModal} from "../../../../src/recoil/atoms/setting/account/history/category";
import {CreateAccountHistoryCategoryDto} from "../../../../src/interface/dto/account/history/category";

const AccountHistoryCategorySetting: NextPage = () => {
    const [type, setType] = useRecoilState(accountHistoryTypeAtom);
    const [categoryList, setCategoryList] = useState<AccountHistoryCategoryItemType[]>([]);
    const setShowSettingAccountHistoryCategoryDataModal = useSetRecoilState(showSettingAccountHistoryDataModal);
    const [categoryTotalCount, setCategoryTotalCount] = useState<number>(0);

    useEffect(() => {
        setType(0);
    }, []);

    useEffect(() => {
        getCategoryList();
    }, [type]);

    const getCategoryList = async (): Promise<void> => {
        const response = await selectAccountHistoryCategoryApi({
            type: type || 0
        });

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setCategoryList(response.data);
        setCategoryTotalCount(response.data.length);
    };

    const openCategoryDataModal = (): void => {
        setShowSettingAccountHistoryCategoryDataModal(true);
    }

    const insertCategory = async () => {
        const payload: CreateAccountHistoryCategoryDto = {
            type,
            name: `${type === 0 ? '지출' : '수입'} 카테고리 ${categoryTotalCount+1}`,
        };

        const response = await createAccountHistoryCategoryApi(
            payload
        );

        if(response?.status !== 201){
            alert(response?.data.message);
            return;
        }

        getCategoryList();
    }

    return (
        <div css={styles.container}>
            <SetHead/>

            <div css={styles.categorySettingWrap}>
                <AccountHistoryType radius={false}/>

                <div css={styles.categoryListWrap}>
                    {
                        categoryList.map(categoryItem => {
                            return <div
                                css={styles.categoryItem}
                                key={categoryItem.idx}
                            >
                                {categoryItem.name}
                            </div>
                        })
                    }
                    <div
                        css={styles.categoryInsertButton}
                        onClick={insertCategory}
                    >
                        <span css={styles.plusText}>+</span>카테고리추가
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}

export default AccountHistoryCategorySetting
