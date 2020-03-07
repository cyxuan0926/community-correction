<template>
  <el-aside>
    <el-scrollbar>
      <el-menu
        :default-active="activeIndex"
        :router="true"
        :unique-opened="true"
        :collapse-transition="false"
      >
        <menu-item v-for="menu in menus" :key="menu.path" :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import menuItem from './menu-item.vue'

import cloneDeep from 'lodash/cloneDeep'
import routes from '@/router/routes'
import { hasAuth } from '@/utils/auth'

function filterRoutes(routes) {
  const _routes = routes.filter(route => {
    if (!route.meta.isMenu) {
      return false
    }

    return route.meta.auth ? hasAuth(route.meta.auth) : true
  })

  routes.splice(0)
  routes.push(..._routes)

  routes.forEach(route => {
    if (Array.isArray(route.children) && route.children.length > 0) {
      filterRoutes(route.children)
    }
  })
}

const _routes = cloneDeep(routes)

filterRoutes(_routes)

export default {
  components: { menuItem },

  data() {
    return { menus: _routes }
  },

  computed: {
    activeIndex() {
      return this.$route.meta.activeMenu || this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  position: relative;
  width: $layout-siderbar-width !important;
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  transition: width 0.3s ease-in-out;
}

.el-menu {
  width: $layout-siderbar-width;
  padding-top: 18px;
  border: none;
  background-color: #fff;
}

.el-scrollbar {
  height: 100%;

  ::v-deep &__wrap {
    overflow-x: hidden;
  }

  ::v-deep &__bar {
    right: 0;
  }
}
</style>
