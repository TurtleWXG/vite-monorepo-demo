<script setup lang="ts">
// import { ThemeSwitch } from '../../components/ThemeSwitch'
// import { LocaleDropdown } from '../../components/LocaleDropdown'
import { useDesign } from '@mgmt/hooks'
import { PasswordForm } from './components'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@mgmt/store'

const router = useRouter()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('login')

const AuthStore = useAuthStore()

const loginCb = (form) => {
  console.log('loginCb => form:', form)
  return new Promise<void>((resolve) => {
    AuthStore.setStore({
      access_token: '1111'
    })
    router.replace('/')
    resolve()
  })
}
</script>

<template>
  <div
    :class="prefixCls"
    class="h-[100%] relative lt-xl:bg-[var(--login-bg-color)] lt-sm:px-10px lt-xl:px-10px lt-md:px-10px"
  >
    <div class="relative flex mx-auto min-h-100vh">
      <div
        :class="`${prefixCls}__left flex-1 bg-gray-500 bg-opacity-20 relative p-30px lt-xl:hidden`"
      >
        <div class="flex items-center relative text-white">
          <img src="/logo.png" alt="" class="w-48px h-48px mr-10px" />
          <span class="text-20px font-bold">系统名称</span>
        </div>
        <div class="flex justify-center items-center h-[calc(100%-60px)]">
          <TransitionGroup
            appear
            tag="div"
            enter-active-class="animate__animated animate__bounceInLeft"
          >
            <img key="1" src="./assets/login-box-bg.svg" alt="" class="w-350px" />
            <div key="2" class="text-3xl text-white">欢迎使用</div>
            <div key="3" class="mt-5 font-normal text-white text-14px">登录欢迎语</div>
          </TransitionGroup>
        </div>
      </div>
      <div class="flex-1 p-30px lt-sm:p-10px dark:bg-[var(--login-bg-color)] relative">
        <div
          class="flex justify-between items-center text-white at-2xl:justify-end at-xl:justify-end"
        >
          <div class="flex items-center at-2xl:hidden at-xl:hidden">
            <img src="/logo.png" alt="" class="w-48px h-48px mr-10px" />
            <span class="text-20px font-bold">系统名称</span>
          </div>

          <div class="flex justify-end items-center space-x-10px">
            <!-- <ThemeSwitch /> -->
            <!-- <LocaleDropdown class="lt-xl:text-white dark:text-white" /> -->
          </div>
        </div>
        <Transition appear enter-active-class="animate__animated animate__bounceInRight">
          <div
            class="h-full flex items-center m-auto w-[100%] at-2xl:max-w-500px at-xl:max-w-500px at-md:max-w-500px at-lg:max-w-500px"
          >
            <PasswordForm
              :login="loginCb"
              class="p-20px h-auto m-auto lt-xl:rounded-3xl lt-xl:bg-white"
            ></PasswordForm>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$prefix-cls: '#{$g-namespace}-login';

.#{$prefix-cls} {
  overflow: auto;

  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('./assets/login-bg.svg');
      background-repeat: no-repeat;
      background-position: center;
      content: '';
    }
  }
}
</style>
