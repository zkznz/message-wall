<template>
    <div class="content">
        <div class="header">
            <img src="@/assets/img/logo.svg" alt="">
            <span>轻语留言欢迎你</span>
        </div>
        <div class="card">
            <a-card style="width: 390px">
                <h2>账号注册</h2>
                <div class="info">
                    <a-form layout="vertical" :model="formData" :rules="rules" ref="formRef">
                        <a-form-item label="用户名" name="name">
                            <a-input size="large" v-model:value.trim="formData.name" placeholder="取一个昵称" />
                        </a-form-item>
                        <a-form-item label="邮箱" name="email">
                            <a-input size="large" v-model:value.trim="formData.email" placeholder="规范的邮箱" />
                        </a-form-item>
                        <a-form-item label="密码" name="password">
                            <a-input-password size="large" v-model:value.trim="formData.password" placeholder="不小于6位数" />
                        </a-form-item>
                        <a-form-item style="height: 120px;">
                            <a-button type="primary" class="btn" @click="submitForm">注册</a-button>
                            <p v-show="isExist" class="exist">邮箱已被注册,请直接登录</p>
                        </a-form-item>

                    </a-form>

                </div>

            </a-card>
        </div>
        <p class="footer">该注册账号只限于在网站内测试、学习，请妥善保护自己个人隐私和个人信息，以免造成不必要的影响。谢谢～</p>
    </div>
</template>

<script setup lang="ts">
import type { Rule, FormInstance } from 'ant-design-vue/es/form';
import { IRegForm } from '@/type'
import { reactive, ref } from 'vue'
import { register, checkName } from '@/api'
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router"

const router = useRouter();
const formData = reactive<IRegForm>({
    name: '',
    password: '',
    email: ''
})
const formRef = ref<FormInstance>();
let isExist = ref<boolean>(false);
//校验邮箱
let checkEmail = async (rule: Rule, value: string) => {
    if (value.length === 0)
        return Promise.reject("邮箱不能为空！");
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    if (!reg.test(value))
        return Promise.reject('请输入正确的邮箱');
}
//校验名称
let validName = async (rule: Rule, value: string) => {
    if (value.length === 0)
        return Promise.reject('名称不能为空！');
    let res = await checkName(value);
    if (res)
        return Promise.reject('名称已被占用，请换个名称');
}
const rules: Record<string, Rule[]> = {
    name: [{ required: true, validator: validName, trigger: 'blur' }],
    password: [{ required: true, trigger: 'blur', message: "密码不能为空！" }, { min: 6, trigger: 'change', message: '密码不能小于6位' }],
    email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
};
//提交表单
const submitForm = () => {
    formRef.value?.validate().then(async (res: any) => {
        let result = await register(res);
        //用户已存在
        if (result.status === 441) {
            isExist.value = result.exist;
        }
        else {
            isExist.value = false;
            message.success(result.msg);
            router.push("/");
        }
    }).catch(() => {
        return;
    });
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

    .card {
        margin: 20px 0;

        h2 {
            font-weight: 600;
        }

        .info {
            width: 100%;



            .btn {
                width: 100%;
                height: 48px;
                margin-top: 20px;
            }
        }
    }

    .exist {
        text-align: center;
        margin-top: 5px;
        color: #ff4d4f;
        font-size: 14px;
    }

    .footer {
        margin-top: 20px;
        color: @gray-2;
    }
}
</style>