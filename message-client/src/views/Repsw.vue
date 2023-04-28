<template>
    <div class="content">
        <div class="header">
            <img src="@/assets/img/logo.svg" alt="">
            <span>轻语留言</span>
        </div>
        <div class="card">
            <a-card style="width: 390px">
                <div class="title">
                    <span>修改密码</span>
                    <p>请输入账号注册邮箱获取验证码</p>
                </div>
                <div class="info">
                    <a-form layout="vertical" :model="formData" ref="formRef">
                        <a-form-item label="邮箱" name="email" :rules="emailRules">
                            <a-input size="large" placeholder="用户邮箱" v-model:value="formData.email" />
                        </a-form-item>
                        <a-form-item label="验证码" name="code" :rules="codeRules" validateTrigger="submit">
                            <a-row :gutter="24">
                                <a-col :span="10"><a-input size="large" :validate-event="false"
                                        v-model:value="formData.code" /></a-col>
                                <a-col :span="14"><a-button size="large" shape="round" class="send-btn"
                                        @click="sendCode">发送验证码</a-button></a-col>
                            </a-row>

                        </a-form-item>
                        <a-form-item label="新密码" name="password" :rules="pwdRules">
                            <a-input-password v-model:value="formData.password" size="large" placeholder="不小于6位数" />
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" shape="round" class="btn" @click="submitForm">修改</a-button>
                        </a-form-item>
                    </a-form>

                </div>

            </a-card>
        </div>
        <p class="footer">该注册账号只限于在网站内测试、学习，请妥善保护自己个人隐私和个人信息，以免造成不必要的影响。谢谢～</p>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { getCode, verifyCode } from "@/api"
import type { Rule, FormInstance } from 'ant-design-vue/es/form';
let formData = reactive({
    email: '',
    code: '',
    password: ''
})
//校验邮箱
let checkEmail = async (rule: Rule, value: string) => {
    if (value.length === 0)
        return Promise.reject("邮箱不能为空");
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    if (!reg.test(value))
        return Promise.reject('请输入正确的邮箱');
}
//校验验证码
let validCode = async (rule: Rule, value: string) => {
    if (value.length === 0)
        return Promise.reject("请填入验证码");
    let data = {
        email: formData.email,
        code: formData.code
    }
    let res = await verifyCode(data);
    if (!res.check || value.length < 6)
        return Promise.reject('验证码错误');
}
//校验密码
let checkPwd = async (rule: Rule, value: string) => {
    if (value.length === 0)
        return Promise.reject("密码不能为空");
    if (value.length < 6)
        return Promise.reject("密码不能小于六位");
}
const emailRules: Rule[] = [{ required: true, validator: checkEmail, trigger: 'change' }];
const codeRules: Rule[] = [{ validator: validCode }];
const pwdRules: Rule[] = [{ required: true, validator: checkPwd, trigger: 'change' }];
const formRef = ref<FormInstance>();
const submitForm = () => {
    formRef.value?.validate().then((res) => {

    }).catch(() => {
        return;
    })
}
//发送验证码
const sendCode = async () => {
    let data = { email: formData.email }
    let res = await getCode(data);
    console.log('res', res);
}
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

    .ant-card {
        padding: 0 20px;
    }

    .card {
        margin: 20px 0;

        .title {

            span {
                font-size: @size-20;
                font-weight: 600;
            }

            p {
                color: @gray-2;
            }

            margin-bottom: 25px;
        }


        .info {
            width: 100%;

            .send-btn {
                border: none;
                width: 160px;
                background-color: @primary;
                color: #fff;
                font-size: 14px;
                margin-left: 5px;
            }

            .btn {
                width: 100%;
                border: none;
                height: 48px;
                margin-top: 20px;
                background-color: black;
                color: #fff;
            }
        }
    }

    .footer {
        margin-top: 20px;
        color: @gray-2;
    }
}
</style>