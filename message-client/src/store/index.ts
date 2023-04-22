import { defineStore } from 'pinia'
import { IUser } from '@/type'
import { getUserId, userLogin, getUserInfo } from '@/api'
import { message } from 'ant-design-vue'
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            user: {
                id: 0,
                name: '',
                email: '',
                role: ''
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
            this.getInfo();
        },
        async getInfo() {
            let res = await getUserInfo();
            let { name, email, role } = res.data;
            if (res.status == 200) {
                this.user.name = name;
                this.user.email = email;
                this.user.role = role;
            }

        }
    },
    getters: {

    }
})
