import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    accountHistoryCategoryAtom,
    accountHistoryTypeAtom,
} from "../../../recoil/atoms/account/history";
import {selectAccountHistoryCategoryApi} from "../../../api/account/history/category";
import {AccountHistoryCategoryItemType} from "../../../interface/type/account/history/category";

const AccountHistoryCategorySelect: FunctionComponent = () => {
    const type = useRecoilValue(accountHistoryTypeAtom);
    const [category, setCategory] = useRecoilState(accountHistoryCategoryAtom);
    const [categoryList, setCategoryList] = useState<AccountHistoryCategoryItemType[]>([]);

    const getCategoryList = async () => {
        const response = await selectAccountHistoryCategoryApi({
            type: type || 0
        });

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setCategoryList(response.data);
    };

    useEffect(() => {
        getCategoryList();
    }, [type]);

    return (
        <select
            value={category}
            onChange={(e) => {
                setCategory(Number(e.target.value))
            }}
        >
            <option
                value={0} key={0}
            >
                카테고리
            </option>
            {
                categoryList.map(c => {
                    return <option
                        value={c.idx} key={c.idx}
                    >
                        {c.name}
                    </option>
                })
            }
        </select>
    )
}

export default AccountHistoryCategorySelect
