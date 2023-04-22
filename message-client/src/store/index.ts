import { defineStore } from 'pinia'
import { IUser } from '@/type'
import { getUserId, userLogin } from '@/api'
import { message } from 'ant-design-vue'
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            user: {
                id: 0
            },
            token: localStorage.getItem('token') || ''
        }
    },
    actions: {
        async initUser() {
            let res = await getUserId();
            if (res.status == 200)
                this.user.id = res.data.ip;
        },
        async login(data: IUser) {
            let res = await userLogin(data);
            localStorage.setItem('token', res.token);
            message.success(res.msg);
        }
    },
    getters: {

    }
})
