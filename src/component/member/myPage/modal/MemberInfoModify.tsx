import {FunctionComponent, useEffect, useState} from "react";
import * as styles from "../../../../../styles/member/MemberInfoModifyModal.style";
import {useRecoilState} from "recoil";
import {updateMemberInfoApi} from "../../../../api/member";
import {AxiosResponse} from "axios";
import {showMemberInfoModifyModalAtom} from "../../../../recoil/atoms/member";
import {UpdateMemberInfoDto} from "../../../../interface/dto/member";
import {MemberInfoModifyModalProps} from "../../../../interface/props/member";

const rules = {
    nickname: /^[0-9a-zA-Z가-힣]*$/i,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
}

const MemberInfoModifyModal: FunctionComponent<MemberInfoModifyModalProps> = (
    {
        reloadMemberInfo,
        memberInfo
    }
) => {
    const [showMemberInfoModifyModal, setShowMemberInfoModifyModal] = useRecoilState(showMemberInfoModifyModalAtom);
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [originalPassword, setOriginalPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordCheck, setNewPasswordCheck] = useState<string>('');

    useEffect(() => {
        if (showMemberInfoModifyModal) {
            document.body.style.cssText = `
                position: fixed; 
                top: -${window.scrollY}px;
                overflow-y: scroll;
                width: 100%;
                `;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
    }, [showMemberInfoModifyModal]);

    useEffect(() => {
        if (!memberInfo) return;

        setNickname(memberInfo.nickname);
        setEmail(memberInfo.email);
    }, [memberInfo]);

    const updateMemberInfo = async () => {
        const payload: UpdateMemberInfoDto = {
            nickname,
            email,
            originalPassword
        };

        if(!rules.nickname.test(nickname)){
            alert('닉네임에 사용할 수 없는문자가 포함되어있습니다.');
            return;
        }

        if(!rules.email.test(email)){
            alert('이메일이 올바르지 않습니다.');
            return;
        }

        if (newPassword !== newPasswordCheck) {
            alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        if (newPassword) {
            payload.password = newPassword;
        }

        const response: AxiosResponse | undefined = await updateMemberInfoApi(payload);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        reloadMemberInfo();
        setShowMemberInfoModifyModal(false);
    };

    return (
        <div
            className={styles.container(showMemberInfoModifyModal)}
            id="container"
            onClick={(e) => {
                const element: HTMLDivElement = e.target as HTMLDivElement;

                if (element.id === 'container') {
                    setShowMemberInfoModifyModal(false);
                }
            }}
        >
            <div className={styles.modalBody}>
                <div className={styles.infoWrap}>
                    닉네임
                    <input type="text" defaultValue={nickname} onChange={(e) => setNickname(e.target.value)}/>
                </div>
                <div className={styles.infoWrap}>
                    이메일
                    <input type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.infoWrap}>
                    이전 비밀번호
                    <input type="password" onChange={(e) => setOriginalPassword(e.target.value)}/>
                </div>
                <div className={styles.infoWrap}>
                    새 비밀번호
                    <input type="password" onChange={(e) => setNewPassword(e.target.value)}/>
                </div>
                <div className={styles.infoWrap}>
                    새 비밀번호 확인
                    <input type="password" onChange={(e) => setNewPasswordCheck(e.target.value)}/>
                </div>

                <div className={styles.buttonWrap}>
                    <button onClick={() => updateMemberInfo()}>수정하기</button>
                    <button onClick={() => setShowMemberInfoModifyModal(false)}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default MemberInfoModifyModal
