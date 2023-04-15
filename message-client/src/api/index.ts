import request from '@/utils/request'
import { IWall, IMessage, ICommentParams, ILikeParams } from '@/type'

//用户登录
export const login = () => request({
    url: '/user/login',
    method: 'post',

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
//删除点赞反馈
export const delLikeFeedback = (id: number, type: number) => request({
    url: `api/wall/delfeedbacks/${id}/${type}`
})