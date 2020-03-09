<template>
  <el-header>
    <div class="logo">
      <img src="@/assets/img/the-layout-header-CN.png" />
      <h1>社区矫正管理信息系统</h1>
    </div>

    <div class="toolbar">
      <el-row class="toolbar__item toolbar__date">
        <div>
          <span>{{ nowTime['date'] }}</span>
          <span>{{ nowTime['week'] }}</span>
        </div>
      </el-row>
      <el-row class="toolbar__item toolbar__user">
        <div>
          <el-avatar :src="userAvatar" size="small" />
          <span>欢迎您，管理员</span>
        </div>
      </el-row>
      <el-row class="toolbar__item toolbar__logout">
        <div @click="onLogout">
          <i class="el-icon-switch-button icon" />
          <span>退出</span>
        </div>
      </el-row>
    </div>
  </el-header>
</template>

<script>
import * as helper from '@/utils/helper'
import routesPath from '@/router/routes-path'
import userAvatar from '@/assets/img/layout-header-AR.png'
import logoutAvatar from '@/assets/img/layout-header-loginout.png'
import { toDateString, toWeekString } from '@/utils/lang'

export default {
  data() {
    return {
      userAvatar,
      logoutAvatar
    }
  },

  computed: {
    nowTime() {
      const now = Date.now()
      const date = toDateString(now, 'yyyy年MM月dd日')
      const week = toWeekString(now)

      return { date, week }
    }
  },

  methods: {
    async onLogout() {
      try {
        await helper.$confirm('确定退出登录吗?')

        this.$store.dispatch('global/logout')
        this.$router.push(routesPath.ACCOUNT_LOGIN)
      } catch (err) {
        Promise.reject(err)
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
      font-size: $--font-size-base;
      + .toolbar__item {
        padding-left: $base-space * 3;
      }
    }

    &__date {
      span {
        + span {
          margin-left: $base-space * 2;
        }
      }
    }

    &__user {
      color: #fff;
      cursor: pointer;

      .el-avatar {
        margin-right: $base-space * 2;
        vertical-align: middle;
      }

      span {
        vertical-align: middle;
      }
    }

    &__logout {
      cursor: pointer;

      i {
        font-size: $--font-size-medium;
        margin-right: $base-space * 2;
      }
    }
  }
}
</style>
