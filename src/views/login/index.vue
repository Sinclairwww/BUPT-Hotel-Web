<template>

  <div class="login-container">
    <div class="login-box">
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>

      <el-form ref="accountLoginForm" :model="accountForm" :rules="accountFormRules" :inline-message="true">
        <el-form-item label="" prop="position">
          <el-select v-model="query.position" placeholder="请选择职位">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option v-for="item in group.positions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" v-if="query.position != 'customer'">
          <el-input v-model="accountForm.username" placeholder="请输入用户名" autocomplete="on" type="text" tabindex="1"
            clearable>
            <template #prepend>
              <SvgIcon name="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-tooltip v-if="query.position != 'customer'" v-model:visible="capsTooltip" content="大写锁定(Caps lock is On)"
          placement="right" manual>
          <el-form-item prop="password">
            <el-input type="password" v-model="accountForm.password" placeholder="请输入密码" autocomplete="on" show-password
              clearable @keyup.enter="onLogin" name="password" tabindex="2" @keyup="checkCapslock"
              @blur="capsTooltip = false">
              <template #prepend>
                <SvgIcon name="password" />
              </template>
            </el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item>
          <div class="agreement">
            <el-checkbox v-model="agreementChecked" style="color:white">我已阅读并同意</el-checkbox>
            <el-link class="agreement-info" @click="() => (agreementDialogVisible = true)">
              《{{ protocolName }}》
            </el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button v-if="query.position != 'customer'" size="large" :loading="loading" type="primary" @click="onLogin"
            style="width: 100%; margin-bottom: 30px; letter-spacing: 10px" @keyup.enter="onLogin">
            登 录
          </el-button>
          <el-button v-else size="large" :loading="loading" type="primary" @click="onLogin"
            style="width: 100%; margin-bottom: 30px; letter-spacing: 10px" @keyup.enter="onLogin">
            进入酒店
          </el-button>
        </el-form-item>
      </el-form>


      <el-dialog v-model="agreementDialogVisible" :title="protocolName" :close-on-click-modal="true" :center="false">
        <p class="dialog-footer" style="margin: 20px 24px 0 0; text-align: right">
          <el-button type="primary" @click="() => (agreementDialogVisible = false)">确 认</el-button>
        </p>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import loginApi from '@/api/login'
import encryptor from '@/libs/utils/encryptor'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
const router = useRouter()
const userStore = useUserStore()
const title = ref('BUPT酒店管理系统')
enum LoginTypeEnum {
  sms = 1,
  account = 2,
}
const tabSelectKey = ref(LoginTypeEnum.account)

const SMS_TIME = 60

const loading = ref(false)
const smsLoginForm = ref()
const accountLoginForm = ref()

const agreementDialogVisible = ref(false)
const agreementChecked = ref(true)
const protocolName = '用户隐私管理协议'

const capsTooltip = ref(false)
const options = [{
  label: "外部",
  positions: [{
    label: "顾客",
    value: "customer"
  }]
},
{
  label: "内部",
  positions: [{
    label: "管理员",
    value: "admin"
  },
  {
    label: "前台",
    value: "front"
  }
  ]
}
];

const accountFormRules = {
  username: [
    { required: true, trigger: 'blur', message: '请填写用户名' },
    {
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        callback()
      },
    },
  ],
  password: [{ required: true, trigger: 'change', message: '请填写密码' }],
}

const smsForm = reactive({
  phone: '18600000001',
  code: '123456',
})

const accountForm = reactive({
  username: 'admin',
  password: '123456',
})

const query = reactive({
  loginName: "",
  password: "",
  position: ""
});

const visible = {
  isCustomer: false
}

//#region  事件
async function onLogin() {

  if (!agreementChecked.value)
    return ElMessage.warning('请阅读相关内容并勾选同意')
  if (tabSelectKey.value === LoginTypeEnum.sms) {
    await smsLoginForm.value.validate()
  } else {
    await accountLoginForm.value.validate()
  }
  try {
    if (tabSelectKey.value === LoginTypeEnum.sms) {
      const res = await loginApi.smsLogin(smsForm)
      userStore.setToken(res?.data)
    } else {
      const res = await loginApi.userLogin({
        username: accountForm?.username,
        password: encryptor.sha256AndBase64(accountForm?.password),
      })
      userStore.setToken(res?.data)
    }
    router.push({ path: userStore.preHistory || '/' })
  } catch (err: any) {
    ElMessage.error(err?.message)
  }
}

watch(query, () => {
  if (query.position === 'customer') {
    visible.isCustomer = true
  } else {
    visible.isCustomer = false
  }
})


function checkCapslock(e: any) {
  const key = e.key
  capsTooltip.value = key && key.length === 1 && key >= 'A' && key <= 'Z'
}
//#endregion
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #86747455;
$cursor: #0d0909;
$defaultColor: #a5a5a5;
$theme-color: white;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("https://dimg04.c-ctrip.com/images/2008070000002p3r15CC0_W_1080_808_R5_D.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  overflow: hidden;

  .login-box {
    position: relative;
    top: 10%;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-input) {
      font-size: medium;
      display: inline-block;
      height: 47px;
      width: 100%;
      border: 1px solid rgba(11, 10, 10, 0.1);
      background: rgba(243, 241, 241, 0.1);
      border-radius: 5px;
      color: #f3f1f1;

      .el-input__inner {
        color: black;
        text-size-adjust: 20px;
      }

      .el-input__wrapper {
        box-shadow: 0 0 0 0px !important;
        height: 100%;
        width: calc(100% - 70px);
        vertical-align: top;
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px !important;
        padding: 0px;
        // padding: 12px 5px 12px 15px;
        color: black;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px inset !important;
          // box-shadow: 0px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }

      .el-input-group__prepend {
        box-shadow: 0px 0px 0px 0px !important;
        background: transparent;
        color: white;
      }
    }

    :deep(.el-form-item__error) {
      font-size: 14px !important;
      margin-top: 2px !important;
    }
  }

  .tab-box {
    :deep(.el-tabs__header) {
      background: #159b38;
      color: #110606;
    }

    :deep(.el-tabs__item) {
      color: $defaultColor;
      font-size: 16px;
    }

    :deep(.is-active) {
      color: $theme-color;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    .title {
      font-size: 40px;
      color: black;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .agreement {
    margin: 20px 0 80px 0;
    width: 100%;
    font-size: 12px !important;
    font-weight: 400;
    line-height: 16px;
    vertical-align: text-top;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    white-space: normal;

    .agreement-info {
      color: $theme-color;
      font-size: 12px !important;
      font-weight: 400;
      display: inline-block;
      position: relative;
      vertical-align: top;
    }

    :deep(.el-checkbox) {
      height: 16px !important;
      vertical-align: text-top !important;
    }

    :deep(.el-checkbox__label) {
      font-size: 12px !important;
      vertical-align: text-top !important;
      line-height: 16px !important;
      color: white;
    }

    :deep(.el-checkbox__inner) {
      background-color: $defaultColor;
    }

    :deep(.el-link) {
      display: inline-block;
      vertical-align: text-top !important;
      line-height: 14px !important;
    }
  }


}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.el-dialog__footer {
  text-align: center;
}
</style>
