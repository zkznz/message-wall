import request from '@/utils/request'

//用户登录
export const login = () => request({
    url: '/user/login',
    method: 'post',

})