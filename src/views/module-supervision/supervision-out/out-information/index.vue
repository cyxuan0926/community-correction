<template>
  <div class="supervision-out-information">
    <p class="supervision-out-information-title title-information__common">
      <strong>外出申请信息</strong>
    </p>

    <div class="supervision-out-information-form form-information__common">
      <el-form class="form" :model="formData" inline>
        <el-form-item
          label="矫正人员姓名"
          prop="name"
          :rules="{ required: true, message: '请输入矫正人员姓名' }"
        >
          <el-input
            v-model="formData.name"
            placeholder="请输入矫正人员姓名"
            disabled
          />
        </el-form-item>

        <el-form-item
          label="性别"
          prop="sex"
          :rules="{ required: true, message: '请选择性别' }"
        >
          <el-select v-model="formData.sex" placeholder="请选择性别" disabled>
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          class="el-form_fullWidth border__right form-item__selection"
          label="单程往返"
          prop="dfc"
          :rules="{ required: true, message: '请选择单程往返' }"
        >
          <el-select
            v-model="formData.dfc"
            placeholder="请选择单程往返"
            disabled
          >
            <el-option
              v-for="item in roundType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          class="border-right__none"
          label="出发城市"
          prop="cityName"
          :rules="{ required: true, message: '请输入出发城市' }"
        >
          <el-input
            v-model="formData.cityName"
            placeholder="请输入出发城市"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="border__right"
          label="目的城市"
          prop="destination"
          :rules="{ required: true, message: '请输入目的城市' }"
        >
          <el-input
            v-model="formData.destination"
            placeholder="请输入目的城市"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="el-form_fullWidth border__right"
          label="目的地详细地址"
          prop="details"
          :rules="{ required: true, message: '请输入目的地详细地址' }"
        >
          <el-input
            v-model="formData.details"
            placeholder="请输入目的地详细地址"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="border-right__none"
          label="去程班次"
          prop="leaveBanci"
          :rules="{ required: true, message: '请输入去程班次' }"
        >
          <el-input
            v-model="formData.leaveBanci"
            placeholder="请输入去程班次"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="border__right"
          label="交通工具"
          prop="gongju"
          :rules="{ required: true, message: '请选择交通工具' }"
        >
          <el-select
            v-model="formData.gongju"
            placeholder="请选择交通工具"
            disabled
          >
            <el-option
              v-for="item in vehicleType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          class="border-right__none"
          label="开始时间"
          prop="leaveStartTime"
          :rules="{ required: true, message: '请选择开始时间' }"
        >
          <el-date-picker
            v-model="formData.leaveStartTime"
            type="date"
            placeholder="请选择开始时间"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="border__right"
          label="结束时间"
          prop="leaveEndTime"
          :rules="{ required: true, message: '请选择结束时间' }"
        >
          <el-date-picker
            v-model="formData.leaveEndTime"
            type="date"
            placeholder="请选择结束时间"
            disabled
          />
        </el-form-item>

        <template v-if="formData.dfc">
          <el-form-item
            label="往程班次"
            prop="backBanCi"
            :rules="{ required: true, message: '请输入往程班次' }"
          >
            <el-input
              v-model="formData.backBanCi"
              placeholder="请输入往程班次"
              disabled
            />
          </el-form-item>

          <el-form-item
            label="交通工具"
            prop="backGongju"
            :rules="{ required: true, message: '请选择交通工具' }"
          >
            <el-select
              v-model="formData.bacnGongju"
              placeholder="请选择交通工具"
            >
              <el-option
                v-for="item in vehicleType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="开始时间"
            prop="backStartTime"
            :rules="{ required: true, message: '请选择开始时间' }"
          >
            <el-date-picker
              v-model="formData.backStartTime"
              type="date"
              placeholder="请选择开始时间"
              disabled
            />
          </el-form-item>

          <el-form-item
            label="结束时间"
            prop="backEndTime"
            :rules="{ required: true, message: '请选择结束时间' }"
          >
            <el-date-picker
              v-model="formData.backEndTime"
              type="date"
              placeholder="请选择结束时间"
              disabled
            />
          </el-form-item>
        </template>

        <el-form-item
          label="时长（天）"
          prop="duration"
          :rules="{ required: true, message: '请输入时长（天）' }"
        >
          <el-input
            v-model="formData.duration"
            placeholder="请输入时长（天）"
            disabled
          />
        </el-form-item>

        <el-form-item
          label="申请时间"
          prop="createTime"
          :rules="{ required: true, message: '请选择申请时间' }"
        >
          <el-date-picker
            v-model="formData.createTime"
            type="date"
            placeholder="请选择申请时间"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="el-form_fullWidth border__right form-item__selection"
          label="外出事由"
          prop="outReason"
          :rules="{ required: true, message: '请输入外出事由' }"
        >
          <el-input
            v-model="formData.outReason"
            placeholder="请输入外出事由"
            disabled
          />
        </el-form-item>

        <el-form-item
          :class="[
            { 'form-item__detail-result': status === 'detail' },
            { 'el-form_fullWidth': status === 'audit' },
            { 'form-item__selection': status === 'audit' },
            {
              'form-item__detail-result__none-border_bottom':
                status === 'detail' && formData.status === 0
            }
          ]"
          label="审核结果"
          prop="status"
          :rules="{ required: true, message: '请选择审核结果' }"
        >
          <el-select v-model="formData.status" placeholder="请选择审核结果">
            <el-option
              v-for="item in outCheckOperation"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="status === 'detail'"
          class="border__right"
          label="审核时间"
          prop="auditTime"
        >
          <el-date-picker
            v-model="formData.auditTime"
            type="date"
            placeholder="请选择申请时间"
            disabled
          />
        </el-form-item>

        <el-form-item
          v-if="!(status === 'detail' && formData.status === 1)"
          class="el-form_fullWidth form-item__refuse-reason form-item__selection"
          label="拒绝原因"
          prop="reason"
        >
          <el-input
            v-model="formData.reason"
            type="textarea"
            placeholder="请输入拒绝原因"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :disabled="!!formData.status"
          />
        </el-form-item>
      </el-form>
    </div>

    <div class="supervision-out-button information-button__common">
      <el-button v-if="status === 'audit'" type="primary">保存</el-button>

      <el-button type="primary" @click="onGoBack">返回</el-button>
    </div>
  </div>
</template>
<script>
// import { mapState, mapActions } from 'vuex'

import {
  sex,
  roundType,
  vehicleType,
  outCheckOperation
} from '@/common/constants'

export default {
  name: 'correctionStaffInformation',

  props: ['applicationId', 'status'],

  data() {
    return {
      sex,
      roundType,
      vehicleType,
      outCheckOperation,
      formData: {
        name: '',
        sex: '',
        dfc: 1,
        cityName: '',
        destination: '',
        details: '',
        gongju: '',
        leaveBanci: '',
        leaveStartTime: '',
        leaveEndTime: '',
        outReason: '',
        status: 1,
        auditTime: '',
        reason: '',
        createTime: '',
        backBanCi: '',
        bacnGongju: '',
        backStartTime: '',
        backEndTime: '',
        duration: ''
      }
    }
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
    console.log(this.applicationId, this.status)
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

        ::v-deep .el-form-item__content {
          width: 77.5%;
          .el-input,
          .el-select,
          .el-date-editor {
            width: 100%;
          }
        }

        &.el-form_fullWidth {
          width: 96.3%;
          padding-left: 3%;

          ::v-deep .el-form-item__content {
            width: 86%;
            .el-input,
            .el-select,
            .el-date-editor {
              width: 100%;
            }
          }
        }

        &.form-item__refuse-reason {
          ::v-deep .el-form-item__label {
            height: 50px;
            line-height: 50px;
          }
        }

        &.form-item__selection {
          ::v-deep .el-form-item__content {
            width: 91%;
          }
        }

        &.border-right__none {
          border-right: none;
        }

        &.border__right {
          border-right: $-boder-style;
        }

        ::v-deep &__content {
          padding-right: 1%;
        }

        &.form-item__detail-result {
          border-right: none;

          border-bottom: $-boder-style;
        }

        &.form-item__detail-result__none-border_bottom {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
