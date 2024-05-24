<template>

    <div class="container">
        <img class=image src="https://dimg04.c-ctrip.com/images/2008070000002p3r15CC0_W_1080_808_R5_D.jpg"
            alt="checkout" />
        <el-button class="btn1" plain @click="beginFresh">房间情况</el-button>
        <el-button class="btn2" plain @click="visible.dialog = true">入住服务</el-button>
    </div>


    <el-dialog v-model="visible.dialog" title="办理入住" width="15%" style="position: relative; top: 20%; left: 5%;">
        <span>

            <el-form-item label="房间号">
                <el-input v-model="data.room_id" placeholder="请输入房间号" clearable></el-input>
            </el-form-item>

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
                <el-button @click="cancelCheckIn">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="visible.form" style="width: 260px;position: absolute; left: 49%;top: 20%;">
        <el-table :data="roomTable">
            <el-table-column prop="roomNo" label="房间号" width="110" />
            <el-table-column prop="isAvailable" label="是否可用" width="110" />
        </el-table>

        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" size="default" @click="freshRoom">刷新</el-button>
                <el-button type="default" @click="visible.form = false">
                    关闭
                </el-button>
            </div>
        </template>
    </el-dialog>



</template>

<script setup lang="ts">
import QR from '@/assets/QR.jpg'
import { reactive } from 'vue'
import { $Register, $CheckAvailableRoom, $available_room } from '@/api/front';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
const visible = reactive({
    dialog: false,
    form: false
})
const data = reactive({
    "customer_id": '',
    "name": '',
    "password": '',
    "room_id": ''
})

const cancelCheckIn = () => {
    ElMessage({
        type: 'info',
        message: '取消退房',
    })
}

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
    $Register(msg).then(() => {
        console.log('register success')
    })

    const params = {
        "data": {
            "customer_id": Number(data.customer_id),
            "name": data.name,
            "password": data.password,
            "room_id": data.room_id
        }
    }

    $CheckAvailableRoom(params).then(response => {
        res.room = response.data.msg
        open(res.room)
    })

}




const open = (room: string) => {
    visible.dialog = false
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

const roomTable = reactive([])

const freshRoom = async () => {
    roomTable.splice(0, roomTable.length)
    for (let i = 1; i <= 5; i++) {
        const response = await $available_room({ "msg": i });
        roomTable.push({
            roomNo: i.toString(),
            isAvailable: String(response.data.msg)
        })
    }
    visible.form = true
}

const beginFresh = () => {
    // freshRoom()
    visible.form = true
    setInterval(() => {
        if (visible.form) {
            freshRoom()
        }
    }, 5000)
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
.container .btn1 {
    position: absolute;
    top: 70%;
    left: 50.5%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);

    font-size: 30px;
    padding: 20px 30px;

    cursor: pointer;

}

.container .btn2 {
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
