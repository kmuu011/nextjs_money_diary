import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";

import {modalBackground} from "../../../../../styles/common/Common.style";
import {
    selectedAccountHistoryCategoryInfoAtom,
    showSettingAccountHistoryCategoryDataModalAtom,
} from "../../../../recoil/atoms/setting/account/history/category";
import * as styles from "../../../../../styles/account/history/category/AccountHistoryCategoryDataModal.style";
import {UpdateAccountHistoryCategoryDto} from "../../../../interface/dto/account/history/category";
import {updateAccountHistoryCategoryApi} from "../../../../api/account/history/category";

const AccountHistoryCategoryDataModal: FunctionComponent<{
    getCategoryList: Function
}> = (
    {
        getCategoryList
    }
) => {
    const [categoryName, setCategoryName] = useState('');
    const selectedAccountHistoryCategoryInfo = useRecoilValue(selectedAccountHistoryCategoryInfoAtom);

    useEffect(() => {
        setCategoryName(selectedAccountHistoryCategoryInfo?.name || "");
    }, [selectedAccountHistoryCategoryInfo])

    const [
        showAccountHistoryCategoryDataModal,
        setShowAccountHistoryCategoryDataModal
    ] = useRecoilState(showSettingAccountHistoryCategoryDataModalAtom);

    const updateAccountHistoryCategory = async (type: number, value?: string) => {
        const payload: UpdateAccountHistoryCategoryDto = {};

        switch (type) {
            case 0:
                if (selectedAccountHistoryCategoryInfo.name === '기타') {
                    alert('기본 카테고리의 이름은 변경할 수 없습니다.');
                    return;
                }
                if (categoryName.length > 10) {
                    alert('카테고리 이름은 10글자 이하로만 수정할 수 있습니다.');
                    return;
                }
                payload.name = categoryName;
                break;
            case 1:
                payload.order = value === 'up' ?
                    selectedAccountHistoryCategoryInfo.order - 1
                    : selectedAccountHistoryCategoryInfo.order + 1;
                break;
            case 2:
                payload.color = value;
                break;
        }

        const response = await updateAccountHistoryCategoryApi(
            selectedAccountHistoryCategoryInfo.idx,
            payload
        );

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setShowAccountHistoryCategoryDataModal(false);
        getCategoryList();
    }

    return (
        <div css={modalBackground(showAccountHistoryCategoryDataModal)}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'accountHistoryCategoryDataModal') {
                     setShowAccountHistoryCategoryDataModal(false);
                 }
             }}>
            <div
                css={styles.accountHistoryCategoryDataWrap}
                id={"accountHistoryCategoryDataModal"}
            >
                <div css={styles.accountHistoryCategoryDataBody(showAccountHistoryCategoryDataModal)}>
                    <div>
                        <input
                            type={"text"}
                            placeholder={"카테고리 명칭"}
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>

                    <div>
                        <div onClick={() => updateAccountHistoryCategory(1, 'up')}>Up</div>
                        <div onClick={() => updateAccountHistoryCategory(1, 'down')}>Down</div>
                    </div>

                    <div>
                        <button
                            onClick={() => updateAccountHistoryCategory(0)}
                        >
                            수정
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountHistoryCategoryDataModal;
