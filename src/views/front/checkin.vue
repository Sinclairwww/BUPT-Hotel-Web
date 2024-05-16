<template>

    <div class="container">
        <img class=image src="https://dimg04.c-ctrip.com/images/2008070000002p3r15CC0_W_1080_808_R5_D.jpg"
            alt="checkout" />
        <el-button class="btn" plain @click="visible = true">办理入住</el-button>
    </div>


    <el-dialog v-model="visible" title="办理入住" width="15%">
        <span>
            <el-form-item label="身份号">
                <el-input v-model="data.customer_id" placeholder="请输入身份号" clearable></el-input>
            </el-form-item>

            <el-form-item label="姓名">
                <el-input v-model="data.name" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>

            <el-form-item label="密码">
                <el-input v-model="data.password" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
        </span>

        <template #footer>
            <span>
                <el-button @click="">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </span>
        </template>
    </el-dialog>


</template>

<script setup lang="ts">
import QR from '@/assets/QR.jpg'
import { ref, reactive } from 'vue'
import { $Register, $CheckAvailableRoom } from '@/api/front';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
const visible = ref(false)

const data = reactive({
    "customer_id": '',
    "name": '',
    "password": ''
})

const res = reactive({
    room: ''
})

const confirm = () => {
    const msg = {
        data: {
            "customer_id": Number(data.customer_id),
            "name": data.name,
            "password": data.password
        }
    }
    $Register(msg).then(res => {
    })

    const params = {
        "data": {
            "customer_id": Number(data.customer_id),
            "name": data.name,
        }
    }

    $CheckAvailableRoom(params).then(response => {
        res.room = response.data.msg
        open(res.room)
    })

}




const open = (room: string) => {
    const html = `
        <h1>入住成功！</h1>
        <h1>你的房间号是${room}</h1>
        <h2>请扫描二维码</h2>
        <img src = '${QR}' width="400"/>
    `
    ElMessageBox.alert(html, '', {
        confirmButtonText: 'OK',
        dangerouslyUseHTMLString: true,
        callback: (action: Action) => {
            ElMessage({
                type: 'info',
                message: `action: ${action}`,
            })
        },
    })
}

</script>

<style>
.dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
}

.container {
    position: relative;
    width: 100%;
    height: 825px;
}

/* 使图像具有响应性 */
.container img {
    width: 100%;
    height: 100%;
}

/* 设置按钮样式并将其放置在容器/图像的中间 */
.container .btn {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);

    font-size: 30px;
    padding: 20px 30px;

    cursor: pointer;

}

.msg-box {
    width: 500px;
}
</style>
