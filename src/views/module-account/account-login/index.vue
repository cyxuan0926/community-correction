<template>
  <div class="login">
    <img class="login-bg" src="@/assets/img/login-bg-left.png" />
    <div class="login-form">
      <h2>社区矫正管理信息系统</h2>
      <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        @keyup.enter.native="onLogin"
      >
        <el-form-item prop="username">
          <i class="el-icon-mobile-phone icon " />
          <el-input
            v-model.trim="formData.username"
            placeholder="请输入账号"
            size="default"
          />
        </el-form-item>
        <el-form-item prop="password">
          <i class="el-icon-lock icon" />
          <el-input
            v-model.trim="formData.password"
            type="password"
            placeholder="请输入密码"
            size="default"
          />
        </el-form-item>
        <el-button
          class="submit"
          type="primary"
          size="default"
          round
          :loading="$loading"
          @click="onLogin"
        >
          登 录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import routesPath from '@/router/routes-path'
import {
  saveToken,
  saveMenus,
  saveAuthorities,
  savePublicUserInfo
} from '@/utils/storage'

export default {
  name: 'AccountLogin',

  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [{ required: true, message: '请输入账户' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },

  computed: {
    ...mapState('account', ['menus', 'authorities', 'publicUserInfo', 'token'])
  },

  methods: {
    ...mapActions('account', ['login']),

    async onLogin() {
      try {
        await this.$refs.form.validate()

        this.$showLoading()

        const isLogin = await this.login(this.formData)

        if (isLogin) {
          saveToken(this.token)
          saveMenus(this.menus)
          saveAuthorities(this.authorities)
          savePublicUserInfo(this.publicUserInfo)

          const redirectPath = this.$route.query.redirect

          const nextPath =
            redirectPath && !redirectPath.includes('login')
              ? redirectPath
              : routesPath.HOME

          this.$router.replace(nextPath)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  display: flex;
  min-height: 100vh;

  &-bg {
    height: 100vh;
  }
}

.login-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  h2 {
    margin-top: -8vh;
    font-size: 24px;
    font-weight: 800;
    color: #4381e6;
    line-height: 18px;
  }

  .el-form {
    width: 61.8%;
    max-width: 366px;
    margin-top: $base-space * 6;

    .submit {
      width: 100%;
      height: 50px;
      margin-top: $base-space * 3;
      box-shadow: 0px 1px 2px 0px rgba(8, 82, 176, 0.24),
        0px 10px 9px -6px rgba(8, 78, 174, 0.32);
    }

    ::v-deep .el-form-item {
      position: relative;
      margin-bottom: $base-space * 2;

      .icon {
        position: absolute;
        top: 50%;
        left: 12px;
        z-index: 1;
        font-size: 16px;
        transform: translateY(-50%);
        color: $--color-text-placeholder;
      }

      input {
        height: 42px;
        padding-left: 35px;
      }
    }
  }
}
</style>
