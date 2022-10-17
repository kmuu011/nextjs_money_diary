import {MemberInfoDto} from "../dto/member";

export interface ProfileImageModifyModalProps {
    reloadMemberInfo: Function
    profileImageKey?: string
}

export interface MemberInfoModifyModalProps {
    reloadMemberInfo: Function
    memberInfo?: MemberInfoDto
}