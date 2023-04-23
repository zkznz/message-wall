<template>
    <div class="content">
        <div class="header">
            <img src="@/assets/img/logo.svg" alt="">
            <span>轻语留言账号</span>
        </div>
        <div class="card">
            <a-card style="width: 710px;min-height: 508px;">

                <div class="title">
                    <h2>账号信息</h2>
                </div>
                <!-- 用户信息 -->

                <div class="info">
                    <a-row>
                        <a-col :span="14">
                            <a-form :model="infoForm">
                                <a-form-item label="昵称">
                                    <a-input style="height: 45px;"></a-input>
                                </a-form-item>
                                <a-form-item label="邮箱">
                                    <a-input style="height: 45px;"></a-input>
                                </a-form-item>
                                <a-form-item label="简介">
                                    <a-textarea style="height: 80px;resize:none;"></a-textarea>
                                </a-form-item>
                                <a-form-item label="性别">
                                    <a-radio-group v-model:value="infoForm.sex">
                                        <a-radio value="1">男</a-radio>
                                        <a-radio value="2">女</a-radio>
                                        <a-radio value="3">保密</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item label="生日">
                                    <a-date-picker :locale="locale" v-model:value="infoForm.birthday"
                                        value-format="YYYY-MM-DD" />
                                </a-form-item>
                                <a-form-item style="padding-left: 42px;">
                                    <a-button type="primary">保存</a-button>
                                    <a-button style="margin-left: 10px">取消</a-button>
                                </a-form-item>
                            </a-form>
                        </a-col>
                        <a-col :span="10">
                            <div class="user-img">
                                <a-avatar shape="square" :size="160">
                                    <template #icon>
                                        <UserOutlined />
                                    </template>
                                </a-avatar>



                                <a-button shape="round">修改头像</a-button>
                            </div>



                        </a-col>

                    </a-row>
                    <a-button type="danger" shape="round" style="float: right;">注销账号</a-button>
                </div>




            </a-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { reactive } from "vue"
import { InfoForm } from '@/type'
import { UserOutlined } from '@ant-design/icons-vue';
//设置中文日期
dayjs.locale('zh-cn');
//表单信息
let infoForm = reactive<InfoForm>({
    name: '',
    email: '',
    avatar: '',
    brief: '',
    sex: 3,
    birthday: ''
})
</script>

<style lang="less" >
body {
    background-color: #F4F5F7;
}

.content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        img {
            width: 40px;
            height: 40px;
        }

        span {
            font-weight: 600;
            font-size: 30px;
            margin-left: 5px;
        }
    }

    .card {
        .ant-card {
            padding: 10px 20px;
        }

        .title {
            h2 {
                font-weight: 600;
            }
        }

        .user-img {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-left: 30px;

            .ant-btn {
                margin-top: 20px;
            }
        }

        .info {}
    }
}
</style>