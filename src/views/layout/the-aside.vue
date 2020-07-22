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
import { mapState } from 'vuex'
import menuItem from './menu-item.vue'

export default {
  components: { menuItem },

  data() {
    return {}
  },

  computed: {
    ...mapState('account', ['menus']),

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
  background-color: $--color-white;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  transition: width 0.3s ease-in-out;
}

.el-menu {
  width: $layout-siderbar-width;
  padding-top: $--font-size-large;
  border: none;
  background-color: $--color-white;
}

.el-scrollbar {
  height: 100%;
  background-color: $--color-white;

  ::v-deep &__wrap {
    overflow-x: hidden;
  }

  ::v-deep &__bar {
    right: 0;
  }
}
</style>
