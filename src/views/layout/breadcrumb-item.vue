<template>
  <el-breadcrumb class="com-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-if="$route.meta.isTheOnlyRoot"
      >首页</el-breadcrumb-item
    >
    <el-breadcrumb-item v-else :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="route in routes" :key="route.path">
      {{ route.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'ComBreadcrumb',

  computed: {
    routes() {
      return this.$route.matched.filter(route => route.meta.title)
    }
  }
}
</script>

<style lang="scss" scoped>
.com-breadcrumb {
  height: 38px;
  padding: 0 $base-space * 3;
  line-height: 38px;
  background-color: #e6e6e6;

  .el-breadcrumb__item {
    ::v-deep .el-breadcrumb__inner.is-link {
      font-weight: normal;
    }

    &:last-child {
      ::v-deep.el-breadcrumb__inner {
        font-weight: bold;
      }
    }

    &:only-child {
      ::v-deep.el-breadcrumb__inner {
        font-weight: normal;
      }
    }
  }
}
</style>
