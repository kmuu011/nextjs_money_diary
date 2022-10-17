export interface LoginDto {
    id: string
    password: string
    keepCheck: boolean
}

export interface SignUpDto {
    id: string
    password: string
    passwordCheck?: string
    nickname: string
    email: string
}

export interface DuplicateCheckDto {
    type: number
    value: string
}

export interface MemberInfoDto {
    idx: number
    id: string
    nickname: string
    email: string
    profileImgKey: string
}

export interface UpdateMemberInfoDto {
    nickname: string
    email: string
    originalPassword: string
    password?: string
}

