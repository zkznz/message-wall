//图片墙信息
export interface IPicture {
    id: number,
    moment: string,
    userId: number,
    message: string,
    name: string,
    imgurl: number,
    revoke: number,
    report: number,
    like: number,
    label: number
}

//评论信息
export interface IComment {
    id: number,
    moment: string,
    time?: string
    userId: number,
    message: string,
    name: string,
    imgurl: number
}