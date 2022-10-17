import {FunctionComponent, useEffect, useState} from "react";
import * as styles from "../../../../../styles/member/ProfileImageModifyModal.style";
import {useRecoilState} from "recoil";
import {showProfileImageModifyModalAtom} from "../../../../recoil/atoms/member";
import Image, {StaticImageData} from "next/image";
import noImage from "../../../../../public/violet.png";
import {deleteProfileImageApi, updateProfileImageApi} from "../../../../api/member";
import {hostDomain} from "../../../../config";
import {ProfileImageModifyModalProps} from "../../../../interface/type/props";
import {AxiosResponse} from "axios";

const ProfileImageModifyModal: FunctionComponent<ProfileImageModifyModalProps> = (
    {
        reloadMemberInfo,
        profileImageKey
    }
) => {
    const [showProfileImageModifyModal, setShowProfileImageModifyModal] = useRecoilState(showProfileImageModifyModalAtom);
    const [image, setImage] = useState<string | Blob>();
    const [imageSrc, setImageSrc]
        = useState<string | StaticImageData>(noImage);

    useEffect(() => {
        if (profileImageKey) {
            setImageSrc(hostDomain + profileImageKey);
        }
    }, [profileImageKey]);

    useEffect(() => {
        if (showProfileImageModifyModal) {
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
    }, [showProfileImageModifyModal]);

    const loadImage = (fileList: FileList | null): void => {
        if (!fileList) return;

        if (fileList.length === 0) {
            setImageSrc(noImage)
            return;
        }

        setImageSrc(URL.createObjectURL(fileList[0]));
        setImage(fileList[0]);
    }

    const updateProfileImage = async (): Promise<void> => {
        const payload = new FormData();

        if (image === undefined) {
            alert('이미지를 업로드해주세요.');
            return;
        }

        payload.append('file', image);

        const response: AxiosResponse | undefined = await updateProfileImageApi(payload);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        await reloadMemberInfo();
        setShowProfileImageModifyModal(false);
    }

    const deleteProfileImage = async (): Promise<void> => {
        const response = await deleteProfileImageApi();

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        await reloadMemberInfo();
        setShowProfileImageModifyModal(false);
    }

    return (
        <div
            className={styles.container(showProfileImageModifyModal)}
            id="container"
            onClick={(e) => {
                const element: HTMLDivElement = e.target as HTMLDivElement;

                if (element.id === 'container') {
                    setShowProfileImageModifyModal(false);
                }
            }}
        >
            <div className={styles.modalBody}>
                <div className={styles.profileImageBorder}>
                    <Image
                        src={imageSrc}
                        width={180}
                        height={180}
                        alt="프로필 파일 이미지"
                    />
                </div>

                <div className={styles.inputWarp}>
                    <input type="file"
                           id={"img"}
                           onChange={(e) => loadImage(e.currentTarget.files)}
                    />
                </div>

                <div className={styles.buttonWrap}>
                    <button onClick={() => updateProfileImage()}>수정하기</button>
                    <button onClick={() => setShowProfileImageModifyModal(false)}>취소</button>
                    <button onClick={() => deleteProfileImage()}>이미지 삭제</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileImageModifyModal
