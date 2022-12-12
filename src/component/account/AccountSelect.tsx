import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectAccountApi} from "../../api/account/account";
import {AccountItemType} from "../../interface/type/account/account";
import {selectedAccountIdxAtom} from "../../recoil/atoms/account/account";
import {multipleAccountIdxAtom} from "../../recoil/atoms/calendar/calendar";

const AccountSelect: FunctionComponent<{ accountIdx?: number }> = (
    {
        accountIdx
    }
) => {
    const [accountList, setAccountList] = useState<AccountItemType[]>([]);
    const [
        selectedAccountIdx,
        setSelectedAccountIdx
    ] = useRecoilState(selectedAccountIdxAtom);

    const multipleAccountIdx = useRecoilValue(multipleAccountIdxAtom);

    const getAccountList = async (): Promise<void> => {
        const query = {
            startCursor: 0
        }

        const response = await selectAccountApi(query);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setAccountList(response.data.items);
    }

    useEffect(() => {
        getAccountList();
    }, []);

    useEffect(() => {
        if(accountIdx){
            setSelectedAccountIdx(accountIdx);
        }else if (!accountIdx && multipleAccountIdx && multipleAccountIdx.indexOf(',') === -1) {
            setSelectedAccountIdx(Number(multipleAccountIdx));
        }
    }, [multipleAccountIdx, accountIdx]);

    return (
        <select
            value={selectedAccountIdx}
            onChange={(e) => {
                setSelectedAccountIdx(Number(e.target.value));
            }}
        >
            <option
                value={0} key={0}
            >
                카테고리
            </option>
            {
                accountList.map(a => {
                    if(multipleAccountIdx === '-1' || multipleAccountIdx && multipleAccountIdx.split(',').indexOf(a.idx.toString()) !== -1){
                        return <option
                            value={a.idx} key={a.idx}
                        >
                            {a.accountName}
                        </option>

                    }
                })
            }
        </select>
    )
}

export default AccountSelect
