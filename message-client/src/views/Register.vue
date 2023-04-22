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
                    <a-form layout="vertical" :model="formData" :rules="rules" ref="formRef" @finish="handleFinish">
                        <a-form-item label="用户名" name="name">
                            <a-input size="large" v-model:value="formData.name" placeholder="取一个昵称" />
                        </a-form-item>
                        <a-form-item label="邮箱" name="email">
                            <a-input size="large" v-model:value="formData.email" placeholder="规范的邮箱" />
                        </a-form-item>
                        <a-form-item label="密码" name="password">
                            <a-input-password size="large" v-model:value="formData.password" placeholder="不小于6位数" />
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" class="btn" @click="submitForm">注册</a-button>
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
import { register } from '@/api'
const formData = reactive<IRegForm>({
    name: '',
    password: '',
    email: ''
})
const formRef = ref<FormInstance>();
let checkEmail = async (rule: Rule, value: string) => {
    let reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
    if (!reg.test(value))
        return Promise.reject('请输入正确的邮箱');
}
const rules: Record<string, Rule[]> = {
    name: [{ required: true, trigger: 'blur', message: "名称不能为空" }],
    password: [{ required: true, trigger: 'blur', message: "密码不能为空" }, { min: 6, trigger: 'change', message: '密码不能小于6位' }],
    email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
};
const handleFinish = () => {
    formRef.value?.resetFields();
}
//提交表单
const submitForm = () => {
    formRef.value?.validate().then(async (res: any) => {
        let result = await register(res);
        console.log(result);
        if (result.status == 200) {
            console.log(result.data);
        }

    }).catch(() => {
        return
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

    .footer {
        margin-top: 20px;
        color: @gray-2;
    }
}
</style>