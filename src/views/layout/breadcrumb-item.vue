<template>
  <el-breadcrumb class="com-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
    >
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
  height: 52px;
  padding: 0 $base-space * 3;
  line-height: 52px;
  background-color: #f7f8fa;

  ::v-deep .el-breadcrumb__inner.is-link {
    font-weight: normal;
  }
}
</style>
