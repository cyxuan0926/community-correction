<template>
  <el-submenu
    v-if="menu.children && menu.children.length > 0"
    :index="menu.path"
  >
    <template v-slot:title>
      <base-svg :href="menu.meta.icon" />
      <span>{{ menu.meta.title }}</span>
    </template>
    <menu-item
      v-for="childMenu in menu.children"
      :key="childMenu.path"
      :menu="childMenu"
    />
  </el-submenu>
  <el-menu-item v-else :index="menu.path">
    <template v-slot:title>
      <base-svg :href="menu.meta.icon" />
      <span>{{ menu.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: Object
  }
}
</script>

<style lang="scss" scoped>
.base-svg {
  margin-left: 12px;
  margin-right: $base-space * 2;
}
</style>
