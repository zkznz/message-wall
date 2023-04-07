import request from '@/utils/request'

//用户登录
export const login = () => request({
    url: '/user/login',
    method: 'post',

})
//提交照片墙
export const submitPic = () => request({
    url: '/wall/profile',
    method: 'post'
})