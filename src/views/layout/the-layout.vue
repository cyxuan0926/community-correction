<template>
  <el-container direction="vertical" class="app-container">
    <the-header />

    <el-container>
      <the-aside />

      <el-container
        class="main-container"
        direction="vertical"
        v-loading="$loading"
        element-loading-background="rgba(255, 255, 255, 0.4)"
      >
        <BreadcrumbItem v-show="!$route.meta.hideBreadcrumb" />

        <el-scrollbar>
          <el-main>
            <keep-alive :include="componentsKeepAlive">
              <router-view />
            </keep-alive>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import TheHeader from './the-header'
import TheAside from './the-aside'
import BreadcrumbItem from './breadcrumb-item'
import { mapState } from 'vuex'

export default {
  components: { BreadcrumbItem, TheHeader, TheAside },

  computed: {
    ...mapState('global', ['componentsKeepAlive'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/var';

.app-container {
  background-color: #f0f2f5;
}

.main-container {
  height: $layout-main-height;
}

.el-aside {
  height: $layout-main-height;
  border-right: 1px solid #e6e6e6;
}

.el-main {
  padding: $base-space * 3;
}

.el-scrollbar {
  height: 100%;

  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
    background-color: $--color-white;
  }

  ::v-deep .el-scrollbar__view {
    display: flex;
    flex-direction: column;
  }
}
</style>
