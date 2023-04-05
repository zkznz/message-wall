import { defineStore } from 'pinia'
import { IState } from '@/type'
import { login } from '@/api'
export const useMainStore = defineStore('main', {
    state: (): IState => {
        return {
            user: {
                id: 0
            }
        }
    },
    actions: {
        async userLogin() {
            let res = await login();
            if (res.status == 200)
                this.user.id = res.data.ip;
        }
    },
    getters: {

    }
})
