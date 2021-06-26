<template>
  <n-layout
    id="doc-layout"
    :has-sider="showSider"
    :position="isMobile ? 'static' : 'absolute'"
    :style="{
      top: isMobile ? '' : 'var(--header-height)'
    }"
  >
    <n-layout-sider
      :native-scrollbar="false"
      :collapsed-width="0"
      collapse-mode="transform"
      bordered
      show-trigger="bar"
      trigger-style="top: calc(50% - var(--header-height));"
      v-if="showSider"
    >
      <n-menu
        :value="menuValue"
        :options="options"
        @update:value="handleMenuUpdateValue"
      />
    </n-layout-sider>
    <n-layout
      ref="layoutInstRef"
      :native-scrollbar="false"
      :position="isMobile || showSider ? 'static' : 'absolute'"
      content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
    >
      <router-view />
      <site-footer />
    </n-layout>
  </n-layout>
</template>

<script>
// Frame component for components & docs page
import { computed, watch, toRef, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findMenuValue } from '../utils/route'
import { useIsMobile, useIsTablet } from '../utils/composables'
import SiteFooter from './home/Footer.vue'
import {
  useDocOptions,
  useComponentOptions,
  useComponentTestOptions
} from '../store'
import { useMemo } from 'vooks'

export default {
  components: {
    SiteFooter
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const layoutInstRef = ref(null)
    const docOptionsRef = useDocOptions()
    const componentOptionsRef = useComponentOptions()
    const componentTestOptionsRef = useComponentTestOptions()
    const optionsRef = computed(() => {
      if (route.path.includes('/docs/')) {
        // 文档路由
        return docOptionsRef.value
      } else if (route.path.includes('/components/')) {
        // 组件路由
        return componentOptionsRef.value
      } else {
        // 组件测试路由
        // (route.path.includes('/componentsTest/'))
        return componentTestOptionsRef.value
      }
    })

    const menuValueRef = computed(() => {
      return findMenuValue(optionsRef.value, route.path)
    })
    watch(toRef(route, 'path'), (value, oldValue) => {
      const langAndThemeReg = /\/(zh-CN|en-US)\/(light|dark|os-theme)/g
      // only theme & lang change do not restore the scroll status
      if (
        value.replace(langAndThemeReg, '') !==
        oldValue.replace(langAndThemeReg, '')
      ) {
        layoutInstRef.value.scrollTo(0, 0)
      }
    })
    const isMobileRef = useIsMobile()
    const isTabletRef = useIsTablet()
    return {
      showSider: useMemo(() => {
        return !isMobileRef.value && !isTabletRef.value
      }),
      layoutInstRef,
      options: optionsRef,
      menuValue: menuValueRef,
      isMobile: isMobileRef,
      handleMenuUpdateValue: (_, option) => {
        router.push(option.path)
      }
    }
  }
}
</script>
