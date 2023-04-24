import { defineStore } from 'pinia'
import { IUser, InfoForm } from '@/type'
import { getUserId, userLogin, getUserInfo, updateUserInfo } from '@/api'
import { message } from 'ant-design-vue'
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            user: {
                id: 0,
                userId: 0,
                name: '',
                email: '',
                role: '',
                avatar: '',
                brief: '',
                sex: 3,
                birthday: ''
            },
            token: localStorage.getItem('token') || '',
            //控制用户是登录状态还是未登录
            type: 0
        }
    },
    actions: {
        async initUser() {
            let res = await getUserId();
            if (res.status == 200)
                this.user.id = res.data.ip;
        },
        async getInfo() {
            let res = await getUserInfo();
            let { name, userId, email, role, avatar, brief, sex, birthday } = res.data;
            if (res.status == 200) {
                this.user.userId = userId;
                this.user.name = name;
                this.user.email = email;
                this.user.role = role;
                this.user.avatar = avatar;
                this.user.brief = brief;
                this.user.sex = sex;
                this.user.birthday = birthday;
            }
            //本地存储用户信息
            localStorage.setItem('userInfo', JSON.stringify(this.user));
        },
        async login(data: IUser) {
            let res = await userLogin(data);
            localStorage.setItem('token', res.token);
            this.getInfo();
            message.success(res.msg);
        },
        async submitInfo(userInfo: InfoForm) {
            let res = await updateUserInfo(userInfo);
            this.user = userInfo;
            localStorage.setItem('userInfo', JSON.stringify(this.user));
            message.success(res.msg);
        },
        //退出登录
        logOut() {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
        }
    },
    getters: {

    },
})
