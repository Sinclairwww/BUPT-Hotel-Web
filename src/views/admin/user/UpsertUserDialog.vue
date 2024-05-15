<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    width="480px"
    :before-close="onCancel"
    :destroy-on-close="true"
  >
    <el-form
      ref="formRef"
      :rules="rules"
      :model="data"
      label-width="80px"
      label-position="left"
    >
    <el-form-item prop="room" label="房间号" >
    <el-text  class="mx-1">
     {{ data.room }}
    </el-text>
    </el-form-item>



      <el-form-item label="温度">
          <el-input-number v-model="data.temperature" :min="16" :max="30"  />
      </el-form-item>
      <el-form-item label="风速">
          <el-input-number v-model="data.speed" :min="1" :max="5" />
      </el-form-item>
    </el-form>

    <el-form-item label="工作模式">
        <el-select v-model="data.mode" placeholder="Select" size="large" width="200px">
            <el-option v-for="item in options.mode" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>

    <el-form-item label="空调状态">
      <el-select v-model="data.state" placeholder="Select" size="large" width="200px">
        <el-option v-for="item in options.state" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

    <template #footer>
      <span>
        <el-button :loading="submitLoading" type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import adminApi from '@/api/admin-user'
import { isPhone } from '@/libs/utils'
import { useUserStore } from '@/store/modules/user'
import { isValidUsername } from '@/libs/validate'

const userStore = useUserStore()
const submitLoading = ref(false)
const formRef = ref()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  userInfo: {
    type: Object,
    default: null,
  },
})
let isEidtUser = ref(false)
const title = ref('新增用户')
const emit = defineEmits(['update:visible', 'submit'])

const rules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入用户名',
    },
    {
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (!isValidUsername(value)) {
          callback(new Error('用户名只支持英文和数字'))
        } else if (value?.length < 8 || value?.length > 16) {
          callback(new Error('用户名为8-16位字符'))
        } else {
          callback()
        }
      },
    },
  ],
  phone: [
    {
      required: true,
      trigger: 'blur',
      validator: null,
      message: '请输入手机号',
    },
    {
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (!isPhone(value)) {
          callback(new Error('手机号格式不正确'))
        } else {
          callback()
        }
      },
    },
  ],
  nickname: [
    {
      required: true,
      trigger: 'blur',
      validator: null,
      message: '请输入姓名',
    },
    {
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
          callback(new Error('姓名只支持汉字'))
        } else if (value?.length < 2) {
          callback(new Error('姓名位数不能小于2位'))
        } else {
          callback()
        }
      },
    },
  ],
}
const createForm = () => ({
  room: '',
  speed: 1,
  temperature: 24,
  state: '',
  mode: '',

})
const data = reactive(createForm())
const options = {
    state: [
      {
        label: '开机',
        value: 'on',
      },
      {
        label: '关机',
        value: 'off',
      },
    ],
    mode: [
    {
      label: '制冷',
      value: 'cool',
    },
    {
      label: '制暖',
      value: 'warm',
    },]
  }
const visible = ref(false)
watch(
  () => props.visible,
  (val: boolean) => {
    visible.value = val
  }
)
watch(
  () => props.userInfo,
  (val: any) => {
    isEidtUser.value = !!Object.keys(props.userInfo || {}).length
    console.log(val)
    title.value = isEidtUser.value ? '编辑用户' : '新增用户'
    data.room = val.room
    data.speed = val.speed
    data.temperature = val.temperature

  }
)

const onCancel = () => {
  visible.value = false
  emit('update:visible', false)
}

const onSubmit = async () => {
  await unref(formRef)?.validate()
  try {
    if (isEidtUser.value) {
      await adminApi.updateUser({
        room: data.room,
        mode: data.mode,
        speed: data.speed,
        temperature: data.temperature,
        onlineStatus: data.state,
      })
      if (userStore.userInfo?.userId === props.userInfo?.userId) {
        userStore.setUserInfo({
         
        })
      }
    } else {
      await adminApi.addUser({
        room: data.room,
        mode: data.mode,
        speed: data.speed,
        temperature: data.temperature,
        onlineStatus: data.state,
      })
    }
    visible.value = false
    emit('update:visible', false)
    emit('submit')
    ElMessage.success(title.value + '成功')
  } catch (err: any) {
    ElMessage.error(err?.message)
  }
}
function onSendSms() {
  console.log(11)
}
</script>

<style lang="scss" scoped>
.w-450 {
  :deep(.el-input__suffix) {
    z-index: 2;
  }
}
</style>
