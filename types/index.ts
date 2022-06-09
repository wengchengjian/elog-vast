
export type Response<T> = {
    code:number;
    msg:string;
    success:boolean;
    data:T
}