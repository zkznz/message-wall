//图片墙信息
export interface IPicture {
    id: number,
    moment: Date,
    userId: number,
    message: string,
    name: string,
    imgUrl: string,
    revoke: number,
    report: number,
    like: number,
    label: number
}
//留言墙信息
export interface IWall {
    id: number,
    type: number,
    message: string,
    name: string,
    userId: number,
    moment: Date,
    label: number,
    color: number,
    imgUrl: string,
}
//评论信息
export interface IComment {
    id: number,
    moment: Date,
    time?: string
    userId: number,
    message: string,
    name: string,
    imgUrl: string
}
//用户信息
export interface IUser {
    id: number
}
//获取留言墙数据的请求参数
export interface IMessage {
    page: number,
    pagesize: number,
    label: number,
    type: any
}
//获取评论数据的请求参数
export interface ICommentParams {
    id: any,
    page: number,
    pagesize: number,
}
//仓库state数据
export interface IState {
    user: IUser
}