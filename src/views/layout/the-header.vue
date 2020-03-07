<template>
  <el-header>
    <div class="logo">
      <img src="@/assets/img/the-layout-header-CN.png" />
      <h1>社区矫正管理信息系统</h1>
    </div>

    <div class="toolbar">
      <el-dropdown class="toolbar__item toolbar__user">
        <div>
          <el-avatar :src="avatar" size="small" />
          <span>asdasd</span>
        </div>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import * as helper from '@/utils/helper'
import routesPath from '@/router/routes-path'
import avatar from '@/assets/img/layout-header-AR.png'

export default {
  data() {
    return {
      avatar
    }
  },

  methods: {
    async logout() {
      try {
        await helper.$confirm('确定退出登录吗?')

        this.$router.push(routesPath.ACCOUNT_LOGIN)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins';

.el-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  height: $layout-header-height !important;
  padding: 0 $base-space * 3;

  font-size: $--font-size-extra-small;
  color: #fff;
  background-color: #4381e6;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);

  .logo {
    position: relative;
    z-index: 3;

    overflow: hidden;
    display: flex;
    align-items: center;

    box-sizing: border-box;
    height: $layout-header-height;

    h1 {
      margin-left: $base-space;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 800;
    }

    img {
      width: 32px;
    }
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    height: 100%;

    &__item {
      + .toolbar__item {
        padding-left: $base-space * 3;
      }
    }

    &__user {
      color: #fff;
      cursor: pointer;

      .el-avatar {
        margin-right: $base-space;
        vertical-align: middle;
      }
    }
  }
}
</style>
