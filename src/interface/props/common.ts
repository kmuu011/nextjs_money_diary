import {StaticImageData} from "next/image";

export interface IHeaderProps {
    title?: string
    description?: string
}

export interface SideSubMenuProps {
    title: string
    action?: Function
    url?: string
}

export interface SideMenuProps {
    image: StaticImageData
    title: string
    subMenuList?: SideSubMenuProps[]
    path?: string
    url?: string
}

export interface CircleButtonProps {
    image: StaticImageData
    action: Function
}