import request from '@/utils/request'
import { IWall, IMessage, ICommentParams, ILikeParams, IComment, IRegForm, IUser, InfoForm, IEmail, IPwd } from '@/type'
//用户注册
export const register = (data: IRegForm) => request({
    url: "/user/register",
    method: 'post',
    data
})
//检验用户名称
export const checkName = (name: string) => request({
    url: "/user/checkName",
    method: 'get',
    params: { name }
})
//检验用户邮箱是否注册
export const checkCount = (data: IEmail) => request({
    url: "/user/checkCount",
    method: "post",
    data
})
export const getUserId = () => request({
    url: '/user/getId',
    method: 'get',

})
//用户登录
export const userLogin = (data: IUser) => request({
    url: '/user/login',
    method: 'post',
    data
})
//获取用户信息
export const getUserInfo = () => request({
    url: '/auth/getUserInfo',
    method: 'get'
})
//更改用户信息
export const updateUserInfo = (data: InfoForm) => request({
    url: '/auth/updateUserInfo',
    method: 'post',
    data
})
//更改密码
export const changePwd = (data: IPwd) => request({
    url: "/user/updatePwd",
    method: "post",
    data
})
//删除账号
export const cancelUser = (data: IEmail) => request({
    url: "/auth/delUser",
    method: "post",
    data
})
//提交照片
export const submitPic = () => request({
    url: '/wall/profile',
    method: 'post'
})
//新建留言
export const addMessage = (wallInfo: IWall) => request({
    url: '/api/wall/addmessage',
    method: 'post',
    data: wallInfo
})
//查找留言信息
export const findMessage = (data: IMessage) => request({
    url: '/api/wall/findMessagePage',
    method: 'get',
    params: data
})
//添加评论
export const addComment = (data: IComment) => request({
    url: '/api/wall/addComment',
    method: 'post',
    data
})
//查找评论
export const findComment = (data: ICommentParams) => request({
    url: '/api/wall/findComment',
    method: 'get',
    params: data
})
//添加点赞反馈
export const addLikeFeedback = (data: ILikeParams) => request({
    url: "/api/wall/addfeedbacks",
    method: 'post',
    data
})
//删除留言
export const delMessage = (id: number) => request({
    url: `/api/wall/delmessage/${id}`,
    method: 'get'
})
//删除评论
export const delComments = (id: number) => request({
    url: `/api/wall/delcomments/${id}`,
    method: 'get'
})
//删除点赞反馈
export const delLikeFeedback = (id: number, userId: number, type: number) => request({
    url: `/api/wall/delfeedbacks/${id}/${userId}/${type}`,
    method: 'get'
})
//发送邮件
export const getCode = (data: IEmail) => request({
    url: '/email/send',
    method: 'post',
    data
})
//验证认证码
export const verifyCode = (data: IEmail) => request({
    url: '/email/checkcode',
    method: 'post',
    data
})