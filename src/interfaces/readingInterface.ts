import DateObject from "react-date-object";

export interface Review{
    id:number;
    title: string;
    date: DateObject;
    status: string;
}

export interface Reading{
        id:string,
        title:string,
        description:string,
        date:DateObject
        review:Review[],
}