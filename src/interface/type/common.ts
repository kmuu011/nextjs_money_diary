import {StaticImageData} from "next/image";

export interface DateObjectType {
    year: string;
    month: string;
    date: string;
    day: number;
    dayStr: string;
    hour: string;
    minute: string;
    second: string;
}

export interface AdditionalButtonType {
    image: StaticImageData
    action: Function
    alt: string
}