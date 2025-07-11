<script setup lang="ts">
import { ref } from 'vue'
import type { FormRules } from 'element-plus'
import { useDesign } from '@mgmt/hooks'
import { useCompRef, useStateRef, useToggle } from '@gx-web/tool'

const props = defineProps<{
  login: (params: FormData) => Promise<any>
  captchaUrl?: string
}>()

const emit = defineEmits<{
  refreshCode: []
}>()

interface FormData {
  username: string
  password: string
  captcha_code: string
  captcha_uuid: string
}

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('password-form')

const FormRef = useCompRef<(typeof import('element-plus'))['ElForm']>()

const rules = ref<FormRules>({
  username: [{ required: true, message: '请输入', trigger: 'blur' }],
  password: [{ required: true, message: '请输入', trigger: 'blur' }],
  captcha_code: [{ required: true, message: '请输入', trigger: 'blur' }]
})

const [loading, setLoading] = useToggle()

const [form] = useStateRef<FormData>(() => ({
  username: '',
  password: '',
  captcha_code: '',
  captcha_uuid: ''
}))

const signIn = async () => {
  try {
    setLoading(true)
    await FormRef.value?.validate()
    await props.login(form.value)
  } catch (error) {
    console.error('sign-in error =>', error)
  } finally {
    setLoading(false)
  }
}
</script>

<template>
  <ElForm
    ref="FormRef"
    :rules="rules"
    label-position="top"
    :model="form"
    :class="prefixCls"
    class="w-[100%]"
    hide-required-asterisk
    @submit.prevent
  >
    <ElFormItem>
      <h2 class="text-2xl font-bold text-center w-[100%]">登录</h2>
    </ElFormItem>
    <ElFormItem label="用户名" prop="username">
      <ElInput v-model="form.username" autocomplete="false" clearable placeholder="用户名" />
    </ElFormItem>
    <ElFormItem label="密码" prop="password">
      <ElInput
        v-model="form.password"
        type="password"
        autocomplete="false"
        clearable
        show-password
        placeholder="请输入密码"
      />
    </ElFormItem>
    <ElFormItem v-if="captchaUrl" label="验证码" prop="captcha_code">
      <ElRow class="w-[100%]" :span="24">
        <ElCol :span="16">
          <ElInput
            v-model="form.captcha_code"
            autocomplete="false"
            clearable
            placeholder="请输入验证码"
          />
        </ElCol>
        <ElCol :span="8">
          <div class="login-code">
            <img :src="captchaUrl" class="w-full h-full" @click="emit('refreshCode')" />
          </div>
        </ElCol>
      </ElRow>
    </ElFormItem>
    <!-- <ElFormItem>
      <div class="flex justify-between items-center w-[100%]">
        <ElCheckbox v-model="remember" :label="t('login.remember')" size="small" />
        <ElLink type="primary" :underline="false">{{ t('login.forgetPassword') }}</ElLink>
      </div>
    </ElFormItem> -->
    <ElFormItem>
      <ElButton
        :loading="loading"
        type="primary"
        class="w-[100%]"
        native-type="submit"
        @click="signIn"
      >
        登录
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>

<style lang="scss" scoped>
.login-code {
  box-sizing: border-box;
  height: 100%;
  margin-left: 10px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  cursor: pointer !important;
}
</style>
