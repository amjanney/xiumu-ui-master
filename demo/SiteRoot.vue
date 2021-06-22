<!--
 * @Author: your name
 * @Date: 2021-06-22 16:40:25
 * @LastEditTime: 2021-06-22 19:33:14
 * @LastEditors: Please set LastEditors
 * @Description: 入口文件，相当于App.vue
 * @FilePath: /xiumu-ui-master/demo/SiteRoot.vue
-->

<template>
  <component
    :is="configProvider"
    class="demo"
    namespace="naive-ui-doc"
    :theme-name="themeName"
    :theme="theme"
    :locale="locale"
    :date-locale="dateLocale"
    :hljs="hljs"
  >
    <n-theme-editor :style="themeEditorStyle">
      <n-loading-bar-provider>
        <n-message-provider>
          <n-notification-provider>
            <n-dialog-provider>
              <Site />
            </n-dialog-provider>
          </n-notification-provider>
        </n-message-provider>
      </n-loading-bar-provider>
      <n-global-style />
    </n-theme-editor>
  </component>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { initRouter, siteSetup } from './store'
import Site from './Site.vue'

export default {
  name: 'SiteProvider',
  components: {
    Site
  },
  setup () {
    initRouter(useRouter(), useRoute())
    return siteSetup()
  }
}
</script>
