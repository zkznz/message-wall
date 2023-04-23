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
                            <a-form :model="infoForm" ref="formRef" :rules="rules">
                                <a-form-item style="margin-left: -12px;" name="name" label="昵称">
                                    <a-input style="height: 45px;" v-model:value="infoForm.name"></a-input>
                                </a-form-item>
                                <a-form-item style="margin-left: -12px;" label="邮箱" name="email">
                                    <a-input style="height: 45px;" v-model:value="infoForm.email"></a-input>
                                </a-form-item>
                                <a-form-item label="简介">
                                    <a-textarea v-model:value="infoForm.brief"
                                        style="height: 80px;resize:none;"></a-textarea>
                                </a-form-item>
                                <a-form-item label="性别">
                                    <a-radio-group v-model:value="infoForm.sex">
                                        <a-radio :value="1">男</a-radio>
                                        <a-radio :value="2">女</a-radio>
                                        <a-radio :value="3">保密</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item label="生日">
                                    <a-date-picker :locale="locale" v-model:value="infoForm.birthday"
                                        value-format="YYYY-MM-DD" />
                                </a-form-item>
                                <a-form-item style="padding-left: 42px;">
                                    <a-button type="primary" @click="submit">保存</a-button>
                                    <a-button style="margin-left: 10px" @click="cancel">取消</a-button>
                                </a-form-item>
                            </a-form>
                        </a-col>
                        <a-col :span="10">
                            <div class="user-img">
                                <a-avatar shape="square" :src="infoForm.avatar" :size="160">
                                    <template #icon>
                                        <UserOutlined />
                                    </template>
                                </a-avatar>

                                <a-upload v-model:file-list="fileList" :show-upload-list="false" :action="uploadAPI"
                                    :headers="headers" @change="handleChange" :before-upload="beforeUpload" name="file">
                                    <a-button>
                                        修改头像
                                    </a-button>
                                </a-upload>
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
import { reactive, ref } from "vue"
import { uploadAPI } from "@/api/upload"
import { checkName } from '@/api';
import { UserOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useMainStore } from "@/store"
import type { UploadChangeParam, FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { useRouter, useRoute } from "vue-router"
import loadsh from "lodash"
//设置中文日期
dayjs.locale('zh-cn');
const store = useMainStore();
const router = useRouter();
//表单信息
const userInfo = JSON.parse(localStorage.getItem("userInfo") as string)
//保存原来的用户信息
const user = loadsh.cloneDeep(userInfo);
let infoForm = reactive(userInfo);

let validateName = async (rule: Rule, value: string) => {
    if (!value)
        return Promise.reject("名称不能为空");
    let res = await checkName(value);
    if (value !== user.name && res)
        return Promise.reject('名称已被占用，请换个名称');
}
//校验邮箱
let checkEmail = async (rule: Rule, value: string) => {
    if (value.length === 0)
        return Promise.reject("邮箱不能为空！");
    let reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
    if (!reg.test(value))
        return Promise.reject('请输入正确的邮箱');
}
const rules: Record<string, Rule[]> = {
    name: [{ required: true, validator: validateName, trigger: 'change' }],
    email: [{ required: true, validator: checkEmail, trigger: 'change' }],
};
//请求头
const headers = {
    authorization: store.token
}
const formRef = ref<FormInstance>();
const fileList = ref([]);
//限制文件格式
const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('请上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小需要小于2MB');
    }
    return isJpgOrPng && isLt2M;
};
//上传图片
const handleChange = (info: UploadChangeParam) => {
    const { file } = info;
    if (file.status === 'uploading') {
        return;
    }
    if (file.status === 'done') {
        infoForm.avatar = file.response.data.img;
        message.success("修改成功");
    }
    if (info.file.status === 'error') {
        if (info.file.response) {
            message.error(info.file.response.msg);
        }
        else {
            message.error('图片上传失败');
        }
    }
}
//提交用户信息修改
const submit = () => {
    formRef.value?.validate().then(async (res: any) => {
        store.submitInfo(infoForm);
        router.push("/");
    }).catch(() => {
        return;
    });
}
//取消修改
const cancel = () => {
    formRef.value?.resetFields();
    infoForm = user;
    router.push("/");
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
        .ant-card {
            padding: 10px 20px;
        }

        .title {
            h2 {
                font-weight: 600;
            }

            margin-bottom: 20px;


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