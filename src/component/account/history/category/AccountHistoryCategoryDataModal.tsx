import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";

import {cancelButton, deleteButton, modalBackground} from "../../../../../styles/common/Common.style";
import {
    selectedAccountHistoryCategoryInfoAtom,
    showSettingAccountHistoryCategoryDataModalAtom,
} from "../../../../recoil/atoms/setting/account/history/category";
import * as styles from "../../../../../styles/account/history/category/AccountHistoryCategoryDataModal.style";
import {UpdateAccountHistoryCategoryDto} from "../../../../interface/dto/account/history/category";
import {
    deleteAccountHistoryCategoryApi,
    updateAccountHistoryCategoryApi
} from "../../../../api/account/history/category";

import arrowImg from "../../../../../public/static/button/arrow/arrow_forward.svg";
import Image from "next/image";

const AccountHistoryCategoryDataModal: FunctionComponent<{
    getCategoryList: Function,
    categoryTotalCount: number
}> = (
    {
        getCategoryList,
        categoryTotalCount
    }
) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const selectedAccountHistoryCategoryInfo = useRecoilValue(selectedAccountHistoryCategoryInfoAtom);
    const resetSelectedAccountHistoryCategoryInfo = useResetRecoilState(selectedAccountHistoryCategoryInfoAtom);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [color, setColor] = useState<string>('#000000');

    useEffect(() => {
        setCategoryName(selectedAccountHistoryCategoryInfo?.name || "");
        setColor(selectedAccountHistoryCategoryInfo?.color || "#000000");
    }, [selectedAccountHistoryCategoryInfo]);

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
                payload.color = color;
                break;
            case 1:
                if (selectedAccountHistoryCategoryInfo.order === 1 && value === 'up') {
                    alert('더이상 순서를 위로 변경할 수 없습니다.');
                    return;
                }

                if (value === 'down' && selectedAccountHistoryCategoryInfo.order + 1 > categoryTotalCount) {
                    alert('더이상 순서를 아래로 변경할 수 없습니다.');
                    return;
                }
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

    const deleteAccountHistoryCategory = async () => {
        const response = await deleteAccountHistoryCategoryApi(selectedAccountHistoryCategoryInfo.idx);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setShowAccountHistoryCategoryDataModal(false);
        setShowDelete(false);
        getCategoryList();
    }

    return (
        <div css={modalBackground(showAccountHistoryCategoryDataModal)}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'accountHistoryCategoryDataModal') {
                     setShowAccountHistoryCategoryDataModal(false);
                     setShowDelete(false);
                     resetSelectedAccountHistoryCategoryInfo();
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

                    <div css={styles.colorInputWrap}>
                        <input
                            type={"color"}
                            value={color}
                            onChange={(e) => {
                                setColor(e.target.value);
                            }}
                        />
                    </div>
                    <div css={styles.orderChangeButtonWrap}>
                        <div
                            css={styles.orderChangeUpButtonWarp}
                        >
                            <Image
                                src={arrowImg}
                                onClick={() => updateAccountHistoryCategory(1, 'up')}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div
                            css={styles.orderChangeDownButtonWarp}
                        >
                            <Image
                                src={arrowImg}
                                onClick={() => updateAccountHistoryCategory(1, 'down')}
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>

                    <div css={styles.updateButtonWrap}>
                        <button
                            onClick={() => updateAccountHistoryCategory(0)}
                        >
                            수정
                        </button>
                    </div>

                    <div>
                        {
                            !showDelete ?
                                <div css={styles.deleteButtonWrap(showDelete)}>
                                    <button
                                        onClick={() => setShowDelete(true)}
                                    >
                                        삭제
                                    </button>
                                </div>
                                :
                                <div css={styles.deleteButtonWrap(showDelete)}>
                                    <button
                                        css={deleteButton}
                                        onClick={deleteAccountHistoryCategory}
                                    >삭제
                                    </button>
                                    <button
                                        css={cancelButton}
                                        onClick={() => setShowDelete(false)}
                                    >취소
                                    </button>
                                </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountHistoryCategoryDataModal;
