//图片墙信息
export interface IPicture {
    id: number,
    moment: Date,
    userId: number,
    message: string,
    name: string,
    imageUrl: string,
    revoke: number,
    report: number,
    like: number,
    label: number
}
//留言墙信息
export interface IWall {
    type: number,
    message: string,
    name: string,
    userId: number,
    moment: Date,
    label: number,
    color: number,
    imageUrl: string,
}
//评论信息
export interface IComment {
    id: number,
    moment: Date,
    time?: string
    userId: number,
    message: string,
    name: string,
    imageUrl: string
}
//用户信息
export interface IUser {
    id: number
}
//仓库state数据
export interface IState {
    user: IUser
}