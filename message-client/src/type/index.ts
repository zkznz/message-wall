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
    wallId: number
    moment: Date,
    time?: string
    userId: number,
    comment: string,
    name: string,
    imgUrl: string
}
//用户登录
export interface IUser {
    name: string,
    password: string
}
//用户注册表单
export interface IRegForm {
    name: string,
    password: string,
    email: string
}
//用户信息
export interface InfoForm {
    id: number,
    userId: number,
    role: string,
    name: string,
    email: string,
    avatar: string,
    brief: string,
    sex: number,
    birthday: string
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
    wallId: number,
    page: number,
    pagesize: number,
}
//添加点赞反馈请求参数
export interface ILikeParams {
    wallId: number,
    userId: number,
    type: number,
    moment: Date,
}
//仓库state数据
export interface IState {
    user: IUser
}
//发送邮箱请求参数
export interface IEmail {
    email: string,
    code?: string
}