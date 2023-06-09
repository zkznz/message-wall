<template>
    <!-- 颜色选择 -->
    <div class="color-list" v-if="id == 0">
        <div class="color" v-for="(item, index) in cardColor1" :key="index"
            :class="{ 'color-select': index == wallInfo.color }" :style="{ background: item }" @click="changeColor(index)">
        </div>
    </div>
    <!-- 上传图片 -->
    <a-upload v-if="wallInfo.imgUrl" v-model:file-list="fileList" :show-upload-list="false" name="file" :action="uploadAPI"
        :headers="headers" :before-upload="beforeUpload" @change="handleChange">
        <div class="upload">
            <img class="upload-image" :src="wallInfo.imgUrl" alt="file" />
            <a-button class="edit-btn" type="primary" shape="circle">
                <template #icon>
                    <edit-outlined />
                </template>
            </a-button>
        </div>
    </a-upload>
    <a-upload v-if="id == 1 && !wallInfo.imgUrl" v-model:file-list="fileList" name="file" list-type="picture-card"
        class="avatar-uploader" :show-upload-list="false" :action="uploadAPI" :headers="headers"
        :before-upload="beforeUpload" @change="handleChange">
        <div v-if="!wallInfo.imgUrl">
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text"></div>
        </div>
    </a-upload>

    <!-- 留言内容 -->
    <div class="card-main" :style="{ background: id == 0 ? cardColor[wallInfo.color] : cardColor[5] }">
        <textarea placeholder="留言..." class="message" maxlength="100" v-model="wallInfo.message"></textarea>
        <input type="text" placeholder="签名" v-model="wallInfo.name" class="name">
    </div>
    <!-- 标签 -->
    <div class="label">
        <p class="title">选择标签</p>
        <div class="label-list">
            <span v-for="(item, index) in label[id]" :key="index" :class="{ 'selected': wallInfo.label == index }"
                @click="changeLabel(index)">{{ item
                }}</span>
        </div>
    </div>
    <!-- 免责声明 -->
    <div class="summary">
        <p class="title">免责声明</p>
        <p class="mzsm">
            该项目是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：
            <br />1、反对宪法所确定的基本原则的；
            <br />2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；
            <br />3、损害国家荣誉和利益的；
            <br />4、煽动民族仇恨、民族歧视，破坏民族团结的；
            <br />5、破坏国家宗教政策，宣扬邪教和封建迷信的；
            <br />6、散布谣言，扰乱社会秩序，破坏社会稳定的；
            <br />7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
            <br />8、侮辱或者诽谤他人，侵害他人合法权益的；
            <br />9、含有法律、行政法规禁止的其他内容的信息。
        </p>
    </div>
    <!-- 按钮 -->
    <div class="control">
        <a-button shape="round" type="danger" size="large" style="margin-right: 10px;" @click="abandon">丢弃</a-button>
        <a-button shape="round" type="primary" size="large" style="width: 200px;" @click="submit"
            :disabled="disabled">确定</a-button>
    </div>
</template>

<script setup lang="ts">
import { cardColor1, cardColor } from "@/mock"
import { ref, inject, reactive, defineEmits, computed } from 'vue'
import { label } from '@/utils/data'
import { useMainStore } from '@/store'
import { IWall } from '@/type'
import { uploadAPI } from '@/api/upload'
import { PlusOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { storeToRefs } from "pinia"

const store = useMainStore();
let { token } = storeToRefs(store);
//请求头
const headers = computed(() => ({
    authorization: token.value
}))
let fileList = ref([]);
let id = ref<number>(inject('id', 0));
let userId: number = store.user.id;
//留言墙信息
let wallInfo: IWall = reactive({
    type: id.value,
    message: '',
    name: '',
    userId,
    moment: new Date(),
    label: 0,
    color: 0,
    imgUrl: ''
})
//按钮禁用
let disabled = computed(() => {
    if (id.value == 1)
        return wallInfo.imgUrl === "" || wallInfo.message.trim() === "" || wallInfo.name.trim() === "";
    else
        return wallInfo.message.trim() === "" || wallInfo.name.trim() === "";
}
);
//图片加载
let loading = ref<boolean>(false);
//自定义事件
const emits = defineEmits<{
    (e: 'submit', wallInfo: IWall): void,
    (e: 'abandon'): void
}>();
//切换颜色
const changeColor = (index: number): void => {
    wallInfo.color = index;
}
//切换标签
const changeLabel = (index: number): void => {
    wallInfo.label = index;
}
//提交
const submit = () => {
    if (wallInfo.type === 1)
        wallInfo.color = 5;
    wallInfo.message = wallInfo.message.trim();
    wallInfo.name = wallInfo.name.trim();
    //提交图片
    emits('submit', wallInfo);
}
//丢弃
const abandon = () => {
    wallInfo.name = "";
    wallInfo.message = "";
    wallInfo.imgUrl = "";
    emits('abandon');
}
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
        loading.value = true;
        return;
    }
    if (file.status === 'done') {
        wallInfo.imgUrl = file.response.data.img;
    }
    if (info.file.status === 'error') {
        if (info.file.response) {
            loading.value = false;
            message.error(info.file.response.msg);
        }
        else {
            loading.value = false;
            message.error('图片上传失败');
        }
    }
}

</script>

<style lang="less" scoped>
.upload {
    position: relative;

    .upload-image {
        height: 200px;
        width: 100%;
        padding: 3px;
        padding-left: 0px;
    }

    margin-bottom: 15px;

    .edit-btn {
        position: absolute;
        top: 15px;
        left: 10px;
        background: rgba(0, 0, 0, .4);
        border: none;
        // opacity: 0.8;
    }
}





.color-list {
    display: flex;
    margin-bottom: 20px;

    .color {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        cursor: pointer;
    }

    .color-select {
        border: 2px solid rgba(59, 115, 240, 1);
    }
}

.card-main {
    width: 100%;
    height: 240px;
    padding: @padding-12;
    transition: .3s;

    .message {
        box-sizing: border-box;
        border: none;
        padding: @padding-8;
        overflow-y: hidden;
        resize: none;
        background: none;
        font-family: HanziPenSC-W3;
        font-size: 14px;
        color: @gray-1;
        height: 172px;
        width: 100%;
    }

    .name {
        box-sizing: border-box;
        padding: @padding-8;
        width: 100%;
        line-height: 20px;
        font-size: 14px;
        color: @gray-0;
        border: none;
        background: none;
        border: 1px solid #fff;
    }

}

// 标签
.label {
    padding-top: 20px;
    // padding: 10px;

    .label-list {
        display: flex;
        flex-wrap: wrap;
        width: 320px;

        span {
            margin: 10px 5px 5px 0;
            font-size: @size-14;
            padding: 4px 8px;
            color: @gray-1;
            cursor: pointer;
        }

        .selected {
            color: @gray-0;
            font-weight: 600;
            background: #ccc;
            border-radius: 14px;
            transition: .3s;
        }
    }
}

// 免责声明
.summary {
    padding-top: 10px;
    padding-bottom: 50px;

    .mzsm {
        padding-top: 5px;
        color: @gray-2;
        line-height: 28px;
    }
}

// 按钮
.control {
    position: fixed;
    margin-bottom: -10px;
    padding: @padding-20;
    width: 100%;
    bottom: 20px;
    // background-color: pink;

}

.title {
    width: 56px;
    height: 20px;
    font-size: 14px;
    color: @gray-0;
    font-weight: 600;
    margin-bottom: 10px;
}
</style>