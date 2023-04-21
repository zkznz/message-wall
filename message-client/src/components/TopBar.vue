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
            <div class="user"></div>
        </div>
        <div class="login">
            <a-card bodyStyle="{padding-top:'0'}">
                <div class="close">
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
                    <span class="forget">忘记密码？</span>
                    <span class="register">注册</span>
                </div>

            </a-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { computed, reactive, ref } from "vue"
import { IUser } from "@/type";
import { CloseOutlined } from "@ant-design/icons-vue";
const route = useRoute();
const router = useRouter();
let id = computed(() => route.query.id);
//跳转留言墙或照片墙
const changeWall = (e: number): void => {
    router.push({
        query: {
            id: e
        },
    })
}
let disabled = ref<boolean>(true);
let userInfo = reactive<IUser>({
    name: '',
    password: ''
});
//用户登录
const login = () => {

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
            height: 36px;
            width: 36px;
            background-image: linear-gradient(180deg, #7BE7FF 2%, #1EB5E2);
        }
    }

    .login {
        position: fixed;
        right: 20px;
        top: 65px;


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