<template>
  <div class="correction-information">
    <p class="correction-information-title title-information__common">
      <strong>基本信息</strong>
    </p>

    <div class="correction-information-form form-information__common">
      <el-form
        class="form-basic form"
        ref="formBasic"
        :model="formBasicModel"
        inline
        :rules="formBasicRules"
      >
        <el-form-item
          label="矫正人员姓名"
          prop="realName"
          :rules="{ required: true }"
        >
          <el-input
            v-model.trim="formBasicModel.realName"
            disabled
            placeholder="请填写矫正人员姓名"
          />
        </el-form-item>

        <el-form-item label="性别" prop="sex" :rules="{ required: true }">
          <el-input
            v-model.trim="formBasicModel.sex"
            disabled
            placeholder="请填写性别"
          />
        </el-form-item>

        <el-form-item
          label="出生日期"
          prop="birthday"
          :rules="{ required: true }"
        >
          <el-date-picker
            v-model.trim="formBasicModel.birthday"
            placeholder="请选择出生日期"
            value-format="yyyyMMdd"
            disabled
          />
        </el-form-item>

        <el-form-item label="身份证号" prop="uuid" :rules="{ required: true }">
          <el-input
            v-model.trim="formBasicModel.uuid"
            disabled
            placeholder="请填写身份证号"
          />
        </el-form-item>

        <el-form-item
          class="form-item_address"
          label="户籍地址"
          prop="address"
          :rules="{ required: true }"
        >
          <el-input
            v-model.trim="formBasicModel.address"
            disabled
            placeholder="请填写户籍地址"
          />
        </el-form-item>

        <el-form-item label="电话号码" prop="phone" :rules="{ required: true }">
          <el-input
            v-model.trim="formBasicModel.phone"
            disabled
            placeholder="请填写电话号码"
          />
        </el-form-item>

        <el-form-item
          class="form-item_livingPlace"
          label="居住地"
          prop="livingPlace"
          :rules="{ required: true }"
        >
          <el-input
            v-model.trim="formBasicModel.livingPlace"
            disabled
            placeholder="请填写居住地"
          />
        </el-form-item>

        <el-form-item
          label="接管日期"
          prop="handoverTime"
          :rules="{ required: true }"
        >
          <el-date-picker
            v-model="formBasicModel.handoverTime"
            type="date"
            disabled
            placeholder="请选择接管日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          />
        </el-form-item>

        <el-form-item
          label="报到周期"
          class="form-item_fullwidth"
          prop="reportingCycle"
          :rules="{ required: true, message: '请选择报到周期' }"
        >
          <el-select
            v-model="formBasicModel.reportingCycle"
            disabled
            placeholder="请选择报到周期"
          >
            <el-option
              v-for="reportCycleOption of reportCycleOptions"
              :key="reportCycleOption.value"
              :label="reportCycleOption.label"
              :value="reportCycleOption.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="报到期"
          prop="reportingPeriod"
          :rules="{ required: true, message: '请选择报到期' }"
        >
          <el-select
            v-model="formBasicModel.reportingPeriod"
            placeholder="请选择报到期"
            :disabled="!!+formBasicModel.edited"
          >
            <el-option
              v-for="reportDurationOption of reportDurationOptions"
              :key="reportDurationOption"
              :label="reportDurationOption"
              :value="reportDurationOption"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="报到日"
          class="form-item-reportDay"
          prop="reportingDay"
        >
          <el-input
            v-model.number="formBasicModel.reportingDay"
            placeholder="请填写报到日"
            clearable
            :disabled="!!+formBasicModel.edited"
          />
        </el-form-item>

        <el-form-item
          class="form-item_textarea"
          label="判决机关"
          prop="judgmentOrgan"
        >
          <el-input
            v-model.trim="formBasicModel.judgmentOrgan"
            type="text"
            show-word-limit
            maxlength="50"
            placeholder="请填写判决机关"
            clearable
          />
        </el-form-item>

        <el-form-item label="判决日期" prop="judgmentDate">
          <el-date-picker
            v-model="formBasicModel.judgmentDate"
            type="date"
            placeholder="请选择判决日期"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>

        <el-form-item class="form-item_charge" label="罪名" prop="charge">
          <el-input
            v-model.trim="formBasicModel.charge"
            type="text"
            show-word-limit
            maxlength="50"
            placeholder="请填写罪名"
            clearable
          />
        </el-form-item>

        <el-form-item label="判处类型" prop="sentenceType">
          <el-select
            v-model="formBasicModel.sentenceType"
            placeholder="请选择判处类型"
            clearable
          >
            <el-option
              v-for="sentenceTypeOption of sentenceTypeOptions"
              :key="sentenceTypeOption"
              :label="sentenceTypeOption"
              :value="sentenceTypeOption"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="附加刑" prop="supplementaryPenalty">
          <el-select
            v-model="formBasicModel.supplementaryPenalty"
            placeholder="请选择附加刑"
            clearable
          >
            <el-option
              v-for="supplementaryPenaltyOption of supplementaryPenaltyOptions"
              :key="supplementaryPenaltyOption"
              :label="supplementaryPenaltyOption"
              :value="supplementaryPenaltyOption"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="原判刑期" prop="originalSentence">
          <el-input
            v-model.trim="formBasicModel.originalSentence"
            show-word-limit
            maxlength="50"
            placeholder="请填写原判刑期"
            clearable
          />
        </el-form-item>

        <el-form-item
          label="原判刑期起止日"
          class="form-item_fullwidth form-item_dateRange"
          prop="originalSentenceDate"
        >
          <el-date-picker
            v-model="formBasicModel.originalSentenceStart"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
            clearable
            :picker-options="originalSentenceStartDatePickOptions"
          />

          <span>-</span>

          <el-date-picker
            v-model="formBasicModel.originalSentenceEnd"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="结束日期"
            clearable
            :picker-options="originalSentenceEndDatePickOptions"
          />
        </el-form-item>

        <el-form-item
          label="矫正期限"
          class="form-item_fullwidth"
          prop="correctDeadline"
        >
          <el-input
            v-model.trim="formBasicModel.correctDeadline"
            placeholder="请填写矫正期限"
            show-word-limit
            maxlength="50"
            clearable
          />
        </el-form-item>

        <el-form-item
          label="矫正期限起止日"
          class="form-item_fullwidth form-item_dateRange is-required"
          prop="correctDeadlineDate"
        >
          <template>
            <el-date-picker
              v-model="formBasicModel.correctDeadlineStart"
              :class="[
                !onCorrectDeadlineDateBlur(
                  formBasicModel.correctDeadlineStart
                ) && formBasicModel.correctDeadlineStart !== ''
                  ? 'is-error'
                  : ''
              ]"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
              clearable
              :picker-options="correctDeadlineStartDatePickOptions"
              @blur="
                onCorrectDeadlineDateBlur(formBasicModel.correctDeadlineStart)
              "
            />
            <div
              class="el-form-item__error form-item-correctDeadlineStart_error"
              v-if="
                !onCorrectDeadlineDateBlur(
                  formBasicModel.correctDeadlineStart
                ) && formBasicModel.correctDeadlineStart !== ''
              "
            >
              请选择矫正期限开始日期
            </div>
          </template>

          <span>-</span>

          <template>
            <el-date-picker
              v-model="formBasicModel.correctDeadlineEnd"
              :class="[
                !onCorrectDeadlineDateBlur(formBasicModel.correctDeadlineEnd) &&
                formBasicModel.correctDeadlineEnd !== ''
                  ? 'is-error'
                  : ''
              ]"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束日期"
              clearable
              :picker-options="correctDeadlineEndDatePickOptions"
              @blur="
                onCorrectDeadlineDateBlur(formBasicModel.correctDeadlineEnd)
              "
            />
            <div
              class="el-form-item__error form-item-correctDeadlineEnd_error"
              v-if="
                !onCorrectDeadlineDateBlur(formBasicModel.correctDeadlineEnd) &&
                  formBasicModel.correctDeadlineEnd !== ''
              "
            >
              请选择矫正期限结束日期
            </div>
          </template>
        </el-form-item>
      </el-form>

      <base-img-viewer
        class="form-img"
        :title="faceImg.title"
        :url="faceImg.url"
      />

      <el-form
        class="form-supervision form"
        :model="formSupervisionModel"
        inline
      >
        <el-form-item class="form-item_idCard is-required" label="身份证信息">
          <template>
            <base-img-viewer
              v-for="file of uuidImgLists"
              :key="file.fileUuid"
              :title="file.title"
              :url="file.url"
            />
          </template>
        </el-form-item>

        <el-form-item
          label="报到地点"
          class="form-item_location"
          prop="effectiveRange"
          :rules="{ required: true, message: '请选择有效范围' }"
        >
          <template
            v-for="(address, index) of formSupervisionModel.addressList"
          >
            <span
              class="addressDetail"
              :key="address.id"
              >{{ address.addressDetail }}
                <a @click.prevent="onMapShow(formSupervisionModel.addressList[index])">点击查看</a>
              </span>
          </template>

          <label class="label-radius">有效范围</label>

          <el-select
            v-model="formSupervisionModel.effectiveRange"
            placeholder="请选择有效范围"
          >
            <el-option
              v-for="radius of radiusOptions"
              :key="radius"
              :label="radius"
              :value="radius"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div class="correction-information-button information-button__common">
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button type="primary" @click="onGoBack">返回</el-button>
    </div>

    <base-map-viewer
      :visible="visible"
      :radius="formSupervisionModel.effectiveRange"
      :on-map-close="onMapClose"
      :map-configs="mapConfigs"
    />
  </div>
</template>
<script>
import {
  REPORTDURATIONOPTIONS,
  SENTENCETYPEOPTIONS,
  REPORTCYCLEOPTIONS,
  SUPPLEMENTARYPENALTYOPTIONS,
  RADIUSOPTIONS
} from '@/common/constants'
import { mapState, mapActions } from 'vuex'

const CURRENTMONTHDAYS = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  0
).getDate()

export default {
  name: 'correctionStaffInformation',

  props: ['userName'],

  data() {
    const checkReportingDay = (rule, value, callback) => {
      const { max } = rule

      if (value === '') callback(new Error('请填写报到日'))
      else if (isNaN(value) || value < 1 || value > max)
        callback(new Error(`请填写1-${max}之间的正整数`))
      else callback()
    }
    return {
      reportDurationOptions: REPORTDURATIONOPTIONS,
      sentenceTypeOptions: SENTENCETYPEOPTIONS,
      reportCycleOptions: REPORTCYCLEOPTIONS,
      supplementaryPenaltyOptions: SUPPLEMENTARYPENALTYOPTIONS,
      radiusOptions: RADIUSOPTIONS,
      formBasicModel: {
        realName: '',
        sex: '',
        birthday: '',
        uuid: '',
        address: '',
        phone: '',
        livingPlace: '',
        handoverTime: '',
        reportingCycle: '月报到',
        reportingPeriod: 5,
        reportingDay: '',
        judgmentOrgan: '',
        judgmentDate: '',
        charge: '',
        sentenceType: '',
        supplementaryPenalty: '',
        originalSentence: '',
        correctDeadline: '',
        correctDeadlineStart: '',
        correctDeadlineEnd: '',
        originalSentenceStart: '',
        originalSentenceEnd: ''
      },
      formBasicRules: {
        reportingDay: [
          { validator: checkReportingDay, max: CURRENTMONTHDAYS },
          { required: true }
        ],

        charge: [{ required: true, message: '请填写罪名' }]
      },
      formSupervisionModel: {
        effectiveRange: 300
      },
      visible: false,
      currentMonthDays: CURRENTMONTHDAYS,
      mapConfigs: {},
      faceImg: {},
      uuidImgLists: [],
      correctDeadlineStartDatePickOptions: {
        disabledDate: date => {
          return (
            this.formBasicModel.correctDeadlineEnd &&
            new Date(this.formBasicModel.correctDeadlineEnd) < date.getTime()
          )
        }
      },
      correctDeadlineEndDatePickOptions: {
        disabledDate: date => {
          return (
            this.formBasicModel.correctDeadlineStart &&
            new Date(this.formBasicModel.correctDeadlineStart) > date.getTime()
          )
        }
      },
      originalSentenceStartDatePickOptions: {
        disabledDate: date => {
          return (
            this.formBasicModel.originalSentenceEnd &&
            new Date(this.formBasicModel.originalSentenceEnd) < date.getTime()
          )
        }
      },
      originalSentenceEndDatePickOptions: {
        disabledDate: date => {
          return (
            this.formBasicModel.originalSentenceStart &&
            new Date(this.formBasicModel.originalSentenceStart) > date.getTime()
          )
        }
      }
    }
  },

  computed: {
    ...mapState('correctionStaff', [
      'correctionalDetail',
      'correctionalDetailfileLists',
      'correctionalDetailResult'
    ])
  },

  methods: {
    ...mapActions('correctionStaff', [
      'getCorrectionalDetail',
      'saveCorrectionalInformation'
    ]),

    async gettingData() {
      this.$showLoading()

      await this.getCorrectionalDetail({ userName: this.userName })

      this.uuidImgLists = this.correctionalDetailfileLists.filter(file => {
        if (file.type === '3') this.faceImg = file
        return file.type !== '3'
      })

      const cloneData = Object.assign({}, this.correctionalDetail)

      this.formBasicModel = cloneData

      this.formSupervisionModel = cloneData
    },

    onCorrectDeadlineDateBlur(value) {
      return !!value
    },

    onMapShow(addressList) {
      const { lng, lat } = addressList

      this.mapConfigs = {
        mapClass: {
          center: [lng, lat]
        },

        circleConfigs: {
          center: [lng, lat]
        },

        markerConfigs: {
          position: [lng, lat]
        }
      }

      this.visible = true
    },

    onMapClose() {
      this.visible = false
    },

    onGoBack() {
      this.$router.back()
    },

    onSave() {
      const isCorrectDeadlineStartSuccess = this.onCorrectDeadlineDateBlur(
        this.formBasicModel.correctDeadlineStart
      )

      const isCorrectDeadlineEndSuccess = this.onCorrectDeadlineDateBlur(
        this.formBasicModel.correctDeadlineEnd
      )

      this.$set(
        this.formBasicModel,
        'correctDeadlineStart',
        this.formBasicModel.correctDeadlineStart || null
      )

      this.$set(
        this.formBasicModel,
        'correctDeadlineEnd',
        this.formBasicModel.correctDeadlineEnd || null
      )

      this.$refs.formBasic.validate(async vaild => {
        if (
          vaild &&
          isCorrectDeadlineEndSuccess &&
          isCorrectDeadlineStartSuccess
        ) {
          this.$showLoading()

          const handoverTimeDate = `${this.formBasicModel['handoverTime']} 00:00:00`

          this.$set(this.formBasicModel, 'reporting', null)

          this.$set(this.formBasicModel, 'handoverTime', handoverTimeDate)

          await this.saveCorrectionalInformation(this.formBasicModel)

          if (this.correctionalDetailResult) await this.gettingData()
        }
      })
    }
  },

  async created() {
    await this.gettingData()
  }
}
</script>

<style lang="scss" scoped>
.correction-information {
  &-form {
    .form-basic {
      width: 65%;

      .el-form-item {
        width: 49.6%;
        text-align: right;

        &:nth-child(odd) {
          border-right: none;
        }

        &:nth-child(2n + 10) {
          border-right: none;
        }

        &:nth-child(2n + 11) {
          border-right: $-boder-style;
        }

        ::v-deep &__content {
          padding-right: 1%;
        }

        &.form-item_fullwidth {
          width: 96.4%;
          border-right: $-boder-style;
          padding-left: 3%;

          ::v-deep .el-form-item__content {
            width: 81.7%;
            .el-input,
            .el-select,
            .el-date-editor {
              width: 100%;
            }
          }
        }

        &.form-item-reportDay {
          ::v-deep .el-form-item__content {
            width: 66%;
          }
        }

        &.form-item_textarea {
          ::v-deep .el-form-item__content {
            width: 76%;
          }
        }

        &.form-item_charge {
          ::v-deep .el-form-item__content {
            width: 82%;
          }
        }

        &.form-item_dateRange {
          ::v-deep .el-form-item__content {
            width: 80%;

            .el-date-editor {
              width: 49%;
            }
          }
        }

        &.form-item_address {
          ::v-deep .el-form-item__content {
            width: 74%;
          }
        }

        &.form-item_livingPlace {
          ::v-deep .el-form-item__content {
            width: 78%;
          }
        }
      }
    }

    ::v-deep .form-img {
      width: 34.3%;

      .el-image__inner {
        width: 100%;
        height: auto;
      }
    }

    .form-supervision {
      width: 99.2%;

      .el-form-item {
        width: 100%;
        border-top: none;

        &:first-child {
          border-top: $-boder-style;
        }

        &.form-item_location {
          display: flex;
          justify-content: space-around;
          border-bottom: $-boder-style;

          ::v-deep .el-form-item__label {
            width: 9%;
            padding-right: 0px;
          }

          ::v-deep .el-form-item__content {
            display: flex;
            width: 85%;

            .addressDetail {
              width: 70%;
              cursor: pointer;

              a {
                color: #409eff;
              }
            }

            .label-radius {
              width: 8%;

              &:before {
                content: '*';
                color: #f78080;
                margin-right: 4px;
              }
            }

            .el-select {
              width: 20%;
            }

            .el-form-item__error {
              margin-left: 69px;
            }
          }
        }

        &.form-item_idCard {
          display: flex;
          align-items: center;
          border-bottom: $-boder-style;

          ::v-deep .el-form-item__label {
            padding-left: 5%;
          }

          ::v-deep .el-form-item__content {
            display: flex;
            width: 70%;
            padding-left: 4%;
          }

          .el-image {
            width: 17%;

            & + .el-image {
              margin-left: 10%;
            }
          }
        }
      }
    }
  }

  .form-item-correctDeadlineStart_error {
    left: 5px;
  }

  .form-item-correctDeadlineEnd_error {
    left: 51%;
  }

  .is-error {
    ::v-deep .el-input__inner {
      border-color: #f78080;
    }
  }
}
</style>
