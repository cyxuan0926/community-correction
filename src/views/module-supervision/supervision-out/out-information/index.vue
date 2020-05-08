<template>
  <div class="supervision-out-information">
    <p class="supervision-out-information-title title-information__common">
      <strong>外出申请信息</strong>
    </p>

    <div class="supervision-out-information-form form-information__common">
      <el-form class="form" ref="form" :model="formData" :rules="rules" inline>
        <el-form-item
          label="矫正人员姓名"
          prop="correctionName"
          :rules="{ required: true, message: '请输入矫正人员姓名' }"
        >
          <el-input
            v-model="formData.correctionName"
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
          prop="roundType"
          :rules="{ required: true, message: '请选择单程往返' }"
        >
          <el-select
            v-model="formData.roundType"
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
          prop="outwardCityName"
          :rules="{ required: true, message: '请输入出发城市' }"
        >
          <el-input
            v-model="formData.outwardCityName"
            placeholder="请输入出发城市"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="border__right"
          label="目的城市"
          prop="destinationCityName"
          :rules="{ required: true, message: '请输入目的城市' }"
        >
          <el-input
            v-model="formData.destinationCityName"
            placeholder="请输入目的城市"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="el-form_fullWidth border__right"
          label="目的地详细地址"
          prop="detailedAddress"
          :rules="{ required: true, message: '请输入目的地详细地址' }"
        >
          <el-input
            v-model="formData.detailedAddress"
            placeholder="请输入目的地详细地址"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="border-right__none"
          label="去程班次"
          prop="outwardVehicleNum"
          :rules="{ required: true, message: '请输入去程班次' }"
        >
          <el-input
            v-model="formData.outwardVehicleNum"
            placeholder="请输入去程班次"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="border__right"
          label="交通工具"
          prop="outwardVehicleType"
          :rules="{ required: true, message: '请选择交通工具' }"
        >
          <el-select
            v-model="formData.outwardVehicleType"
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
          prop="outwardStartTime"
          :rules="{ required: true, message: '请选择开始时间' }"
        >
          <el-date-picker
            v-model="formData.outwardStartTime"
            type="date"
            placeholder="请选择开始时间"
            disabled
          />
        </el-form-item>

        <el-form-item
          class="border__right"
          label="结束时间"
          prop="outwardeEndTime"
          :rules="{ required: true, message: '请选择结束时间' }"
        >
          <el-date-picker
            v-model="formData.outwardeEndTime"
            type="date"
            placeholder="请选择结束时间"
            disabled
          />
        </el-form-item>

        <template v-if="formData.roundType === '1'">
          <el-form-item
            label="往程班次"
            prop="backVehicleNum"
            :rules="{ required: true, message: '请输入往程班次' }"
          >
            <el-input
              v-model="formData.backVehicleNum"
              placeholder="请输入往程班次"
              disabled
            />
          </el-form-item>

          <el-form-item
            label="交通工具"
            prop="backVehicleType"
            :rules="{ required: true, message: '请选择交通工具' }"
          >
            <el-select
              v-model="formData.backVehicleType"
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
          prop="awayReasons"
          :rules="{ required: true, message: '请输入外出事由' }"
        >
          <el-input
            v-model="formData.awayReasons"
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
                status === 'detail' && formData.auditResult === 1
            }
          ]"
          label="审核结果"
          prop="auditResult"
          :rules="{ required: true, message: '请选择审核结果' }"
        >
          <el-select
            v-model="formData.auditResult"
            placeholder="请选择审核结果"
            :disabled="status === 'detail' || !!formData.status"
            @change="onStatusChange"
          >
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
            placeholder="请选择审核时间"
            disabled
          />
        </el-form-item>

        <el-form-item
          v-if="!(status === 'detail' && formData.auditResult === 0)"
          class="el-form_fullWidth form-item__refuse-reason form-item__selection"
          label="拒绝原因"
          prop="refusalReasons"
        >
          <el-input
            v-model.trim="formData.refusalReasons"
            type="textarea"
            placeholder="请输入拒绝原因"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :disabled="!formData.auditResult || !!formData.status"
          />
        </el-form-item>
      </el-form>
    </div>

    <div class="supervision-out-button information-button__common">
      <el-button
        v-if="status === 'audit' && !formData.status"
        type="primary"
        @click="onSave"
        >保存</el-button
      >

      <el-button type="primary" @click="onGoBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

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
    const checkRefusalReasons = (rule, value, callback) => {
      if (this.formData.auditResult) {
        if (!value) callback(new Error('请输入拒绝原因'))
        else callback()
      } else callback()
    }

    return {
      sex,
      roundType,
      vehicleType,
      outCheckOperation,
      formData: {
        correctionName: '',
        sex: '',
        roundType: 1,
        outwardCityName: '',
        destinationCityName: '',
        detailedAddress: '',
        outwardVehicleType: '',
        outwardVehicleNum: '',
        outwardStartTime: '',
        outwardeEndTime: '',
        awayReasons: '',
        auditResult: 0,
        auditTime: '',
        refusalReasons: '',
        createTime: '',
        backVehicleNum: '',
        backVehicleType: '',
        backStartTime: '',
        backEndTime: '',
        duration: ''
      },
      rules: {
        refusalReasons: [{ validator: checkRefusalReasons, trigger: 'blur' }]
      }
    }
  },

  computed: {
    ...mapState('supervision', ['reportOutResult', 'reportOutDetails'])
  },

  methods: {
    ...mapActions('supervision', ['getReportOutDetails', 'approveReportOut']),

    async gettingData() {
      this.$showLoading()

      await this.getReportOutDetails({ applicationId: this.applicationId })

      this.formData = Object.assign({}, this.reportOutDetails)
    },

    onGoBack() {
      this.$router.back()
    },

    onStatusChange() {
      this.$set(this.formData, 'refusalReasons', '')

      this.$refs.form.clearValidate('refusalReasons')
    },

    onSave() {
      const { auditResult, refusalReasons } = this.formData

      this.$refs.form.validate(async () => {
        this.$showLoading()

        await this.approveReportOut({
          applicationId: this.applicationId,
          auditResult,
          refusalReasons,
          type: '1'
        })

        if (this.reportOutResult) this.gettingData()
      })
    }
  },

  async created() {
    await this.gettingData()
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
