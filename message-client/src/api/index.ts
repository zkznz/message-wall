import request from '@/utils/request'
import { IWall } from '@/type'

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