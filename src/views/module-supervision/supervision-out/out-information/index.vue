<template>
  <div class="supervision-out-information">
    <p class="supervision-out-information-title title-information__common">
      <strong>外出申请信息</strong>
    </p>

    <div class="supervision-out-information-form form-information__common">
      <el-form class="form" :model="{}" inline :rules="{}">
        <el-form-item label="矫正人员姓名"></el-form-item>

        <el-form-item label="性别"></el-form-item>

        <el-form-item
          class="el-form_fullWidth border__right"
          label="单程往返"
        ></el-form-item>

        <el-form-item
          class="border-right__none"
          label="出发城市"
        ></el-form-item>

        <el-form-item class="border__right" label="目的城市"></el-form-item>

        <el-form-item
          class="el-form_fullWidth border__right"
          label="目的地详细地址"
        ></el-form-item>

        <el-form-item
          class="border-right__none"
          label="去程班次"
        ></el-form-item>

        <el-form-item class="border__right" label="交通工具"></el-form-item>

        <el-form-item
          class="border-right__none"
          label="开始时间"
        ></el-form-item>

        <el-form-item class="border__right" label="结束时间"></el-form-item>

        <el-form-item label="往程班次"></el-form-item>

        <el-form-item label="交通工具"></el-form-item>

        <el-form-item label="开始时间"></el-form-item>

        <el-form-item label="结束时间"></el-form-item>

        <el-form-item label="时长（天）"></el-form-item>

        <el-form-item label="申请时间"></el-form-item>

        <el-form-item
          class="el-form_fullWidth border__right"
          label="外出事由"
        ></el-form-item>

        <el-form-item class="el-form_fullWidth" label="审核结果"></el-form-item>

        <el-form-item
          v-if="false"
          class="border__right"
          label="审核时间"
        ></el-form-item>

        <el-form-item class="el-form_fullWidth" label="拒绝原因"></el-form-item>
      </el-form>
    </div>

    <div class="supervision-out-button information-button__common">
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="onGoBack">返回</el-button>
    </div>
  </div>
</template>
<script>
// import { mapState, mapActions } from 'vuex'

export default {
  name: 'correctionStaffInformation',

  props: ['applicationId'],

  data() {
    return {}
  },

  // computed: {
  //   ...mapState('correctionStaff', [
  //     'correctionalDetail',
  //     'correctionalDetailfileLists',
  //     'correctionalDetailResult'
  //   ])
  // },

  methods: {
    // ...mapActions('correctionStaff', [
    //   'getCorrectionalDetail',
    //   'saveCorrectionalInformation'
    // ]),

    // async gettingData() {
    //   this.$showLoading()
    // },

    onGoBack() {
      this.$router.back()
    }
  },

  async created() {
    console.log(this.applicationId)
    // await this.gettingData()
  }
}
</script>

<style lang="scss" scoped>
.supervision-out-information {
  &-form {
    width: 99.8%;
    .el-form {
      .el-form-item {
        width: 49.6%;
        text-align: right;

        &:nth-child(odd) {
          border-right: none;
        }

        &:last-child {
          border-right: $-boder-style;
          border-bottom: $-boder-style;
        }

        &.el-form_fullWidth {
          width: 96.3%;
          padding-left: 3%;
        }

        &.border-right__none {
          border-right: none;
        }

        &.border__right {
          border-right: $-boder-style;
        }
      }
    }
  }
}
</style>
