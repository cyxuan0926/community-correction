<template>
  <el-submenu
    v-if="menu.children && menu.children.length > 0"
    :index="menu.path"
  >
    <template v-slot:title>
      <i :class="['iconfont', `${menu.icon}`]" />
      <span>{{ menu.name }}</span>
    </template>
    <menu-item
      v-for="childMenu in menu.children"
      :key="childMenu.path"
      :menu="childMenu"
    />
  </el-submenu>
  <el-menu-item v-else :index="menu.path">
    <template v-slot:title>
      <i :class="['iconfont', `${menu.icon}`]" />
      <span>{{ menu.name }}</span>
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

<style lang="scss" scoped></style>
