<template>
    <div class="top-bar">
        <div class="left">
            <img src="@/assets/img/logo.svg" class="logo" alt="">
            <h3>轻语留言</h3>
        </div>
        <div class="middle">
            <a-button shape="round" :class="{ 'active': id == 0 }" @click="changeWall(0)">留言墙</a-button>
            <a-button shape="round" :class="{ 'active': id == 1 }" middle @click="changeWall(1)">照片墙</a-button>
        </div>
        <div class="right">
            <!-- 登录状态 -->
            <a-popover placement="bottom" v-if="type == 1">
                <template #content>
                    <div style="cursor: pointer;" @click="userLogOut">退出登录</div>
                </template>
                <!-- <div class="user" @click="handleLogin"></div> -->
                <a-avatar size="large" :src="img" @click="handleLogin">
                    <template #icon>
                        <UserOutlined />
                    </template>
                </a-avatar>
            </a-popover>
            <!-- 未登录状态 -->
            <div class="user" v-else @click="handleLogin"></div>
        </div>
        <transition name="modal">
            <div class="login" v-if="isShow">
                <a-card bodyStyle="{padding-top:'0'}">
                    <div class="close" @click="handleLogin">
                        <i><close-outlined /></i>
                    </div>
                    <div class="user-info">

                        <p>欢迎登录</p>
                        <h2>留言墙</h2>
                        <a-input style="height: 36px" placeholder="用户" v-model:value="userInfo.name"></a-input>
                        <a-input-password class="pwd" v-model:value="userInfo.password" placeholder="密码" />
                        <a-button :style="{ 'background-color': disabled ? '#ccc' : 'black' }" @click="login"
                            :disabled="disabled">登录</a-button>
                    </div>
                    <!-- 忘记密码和注册操作 -->
                    <div class="control">
                        <span class="forget" @click="forgetPwd">忘记密码？</span>
                        <span class="register" @click="register">注册</span>
                    </div>

                </a-card>
            </div>
        </transition>

    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { computed, reactive, ref, onMounted } from "vue"
import { getUserInfo } from "@/api"
import { IUser } from "@/type";
import { useMainStore } from "@/store";
import { CloseOutlined, UserOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia"
const route = useRoute();
const router = useRouter();
const store = useMainStore();
//控制登录页面和用户详情页
let { type } = storeToRefs(store);
let id = computed(() => route.query.id);
//用户头像
const user = JSON.parse(localStorage.getItem("userInfo") as string) || {};
const img = user.avatar || "";

let disabled = computed((): boolean => {
    if (userInfo.name.trim().length > 0 && userInfo.password.trim().length > 0)
        return false;
    else
        return true;
})

type.value = localStorage.getItem("token") ? 1 : 0;
let userInfo = reactive<IUser>({
    name: '',
    password: ''
});
let isShow = ref<boolean>(false);

//点击用户头像
const handleLogin = () => {
    if (type.value == 0)
        isShow.value = !isShow.value;
    else {
        router.push("/personal");
    }
}
//跳转留言墙或照片墙
const changeWall = (e: number): void => {
    isShow.value = false
    userInfo.name = '';
    userInfo.password = '';
    router.push({
        query: {
            id: e
        },
    })
}
//用户登录
const login = () => {
    userInfo.name = userInfo.name.trim();
    userInfo.password = userInfo.password.trim();
    //通知仓库发请求登录
    store.login(userInfo);
    isShow.value = false;
    type.value = 1;
}
//用户注册
const register = () => {
    isShow.value = false
    router.push("/register");
}
//用户退出登录
const userLogOut = () => {
    store.logOut();
    userInfo.name = "";
    userInfo.password = "";
    type.value = 0;
}
//忘记密码
const forgetPwd = () => {
    router.push("/repsw");
}
</script>

<style lang="less" scoped>
.top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    box-shadow: 0px 0px 1px 0px;
    top: 0;
    padding: 0 30px;
    z-index: 10;
    height: 52px;
    width: 100%;
    background-color: #fff;

    .left {
        display: flex;


        h3 {
            padding-top: 3px;
        }

        .logo {
            width: 32px;
            height: 32px;
            margin-right: 10px;
        }
    }

    .middle {
        flex: 1;
        display: flex;
        margin-right: 20px;
        justify-content: center;

        .active {
            background-color: #3b73f0;
            color: #fff;
        }

        .ant-btn {
            margin: 0 15px;
        }
    }

    .right {

        .user {
            border-radius: 50%;
            height: 40px;
            width: 40px;
            background-image: linear-gradient(180deg, #7BE7FF 2%, #1EB5E2);
            cursor: pointer;
        }
    }

    .modal-enter {
        &-from {
            transform: translateY(-20px);
        }

        &-active {
            transition: linear .2s;
        }

        &-to {
            transform: translateY(0px);
        }
    }

    .modal-leave {
        &-from {
            transform: translateY(0px);
        }

        &-active {
            transition: linear .2s;
        }

        &-to {
            transform: translateY(-20px);
        }
    }

    .login {
        position: fixed;
        right: 20px;
        top: 65px;
        transition: all .3;

        /deep/ .ant-card-body {
            padding-top: 10px;
        }

        .ant-card {

            width: 280px;
            height: 320px;

            border-right: 1px solid #ccc;

            .close {
                width: 24px;
                height: 24px;
                cursor: pointer;

                i {
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    right: 10px;
                    font-size: 16px;
                }
            }



            .user-info {
                display: flex;

                flex-direction: column;
                align-items: center;



                p {
                    color: @primary;
                    font-weight: 600;
                }

                h2 {
                    font-weight: 700;
                    font-size: @size-24;
                }

                .pwd {
                    height: 36px;
                    margin: 10px 0;
                }

                .ant-btn {
                    width: 100%;
                    height: 36px;
                    margin-top: 15px;
                    color: #fff;
                }
            }

            .control {
                display: flex;
                justify-content: space-between;
                margin: 15px 0;
                width: 100%;

                .forget {
                    color: @gray-2;
                    cursor: pointer;
                }

                .register {
                    color: @link;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>