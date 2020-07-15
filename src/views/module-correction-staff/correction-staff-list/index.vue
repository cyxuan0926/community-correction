<template>
  <div class="correction-staff">
    <div class="correction-staff_search search">
      <base-filter
        v-model="filterParams"
        :filterItems="filterItems"
        :on-filter="onFilterForms"
        clearable
      />
    </div>

    <div class="correction-staff_content content">
      <el-tabs type="card" v-model="activeTabName">
        <template v-for="{ name, label } in tabOptions">
          <el-tab-pane :key="label + name" :label="label" :name="name" />
        </template>
      </el-tabs>

      <base-table
        class="table-tabs_card"
        :cols="tableCols"
        :data="correctionalPage.content"
        stripe
      >
        <template #operation="{ row }">
          <el-button
            v-if="row.status === tabStatus['PENDING']"
            type="primary"
            @click="onVerify(row)"
            >审核</el-button
          >

          <el-button
            v-if="row.status === tabStatus['PASSED']"
            type="primary"
            @click="onEdit(row)"
            >{{ +row.edited ? '查看' : '编辑' }}</el-button
          >
        </template>
      </base-table>
    </div>

    <base-pagination
      :total="correctionalPage.totalCount"
      :page-size.sync="pagination.rows"
      :current-page.sync="pagination.page"
      @size-change="onSizeChange"
      @current-change="onPageChange"
    />

    <el-dialog
      :visible.sync="show.dialogVisible"
      title="审核"
      @close="onVerifyClose"
    >
      <div class="row">
        <label>矫正人员姓名:</label>
        <span>{{ correctionStaff.realName }}</span>
      </div>

      <div class="row row-verifier">
        <label>请核对申请人信息:</label>
        <div class="row-verifier_files">
          <template>
            <base-img-viewer
              v-for="file of correctionStaff.attachmentFileList"
              :key="file.fileUuid"
              :url="file.url"
              :title="file.title"
            />
          </template>
        </div>
      </div>

      <div
        class="row"
        v-for="(address, index) of correctionStaff.addressList"
        :key="address.id"
      >
        <label>报到地点:</label>
        <span
          class="cursor_pointer"
          @click="onMapShow(correctionStaff.addressList[index])"
        >
          {{ address.addressDetail }}
        </span>
      </div>

      <div class="row">
        <label>有效范围:</label>
        <el-select v-model="radius" placeholder="请选择有效范围">
          <el-option
            v-for="radius of radiusOptions"
            :key="radius"
            :label="radius"
            :value="radius"
          />
        </el-select>
      </div>

      <div class="row row-remark" v-if="show.verifyDisagreeVisible">
        <label>请选择驳回原因:</label>
        <div>
          <el-select
            v-model="remark"
            placeholder="请选择驳回原因"
            @change="onRemarkChange"
          >
            <el-option
              v-for="remark of remarkOptions"
              :key="remark"
              :label="remark"
              :value="remark"
            />
          </el-select>
        </div>

        <div class="remark-others" v-if="remark === '其他'">
          <el-form :model="formModel" :rules="rules" ref="form">
            <el-form-item prop="remarkReason">
              <el-input
                v-model.trim="formModel.remarkReason"
                type="textarea"
                placeholder="请填写驳回原因"
                maxlength="50"
                show-word-limit
              />
            </el-form-item>
          </el-form>
        </div>
      </div>

      <repetition-button
        v-if="!show.verifyArgeeVisible && !show.verifyDisagreeVisible"
        class="row row-button row-flex"
        :buttonItems="verifyButtons"
      />

      <repetition-button
        v-if="show.verifyArgeeVisible"
        class="row row-button row-flex row-argee"
        :buttonItems="verifyArgeeButtons"
      />

      <repetition-button
        v-if="show.verifyDisagreeVisible"
        class="row row-button row-flex"
        :buttonItems="verifyDisagreeButtons"
      />
    </el-dialog>

    <base-map-viewer
      :visible="show.mapVisible"
      :radius="radius"
      :on-map-close="onMapClose"
      :map-configs="mapConfigs"
    />
  </div>
</template>
<script>
import repetitionButton from '@/components/repetition-button'

import { pagination } from '@/common/mixins'

import routesPath from '@/router/routes-path'

import { RADIUSOPTIONS, REMARKOPTIONS, ISWRITE } from '@/common/constants'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'correctionStaff',

  mixins: [pagination],

  components: { repetitionButton },

  data() {
    const tabStatus = {
      PASSED: 'PASSED',
      PENDING: 'PENDING'
    }

    const tabOptions = [
      {
        label: '矫正人员管理',
        name: tabStatus['PASSED']
      },
      {
        label: '待审核',
        name: tabStatus['PENDING']
      }
    ]

    const allTableCols = [
      {
        label: '矫正人员姓名',
        prop: 'realName',
        showOverflowTooltip: true
      },
      {
        label: '电话号码',
        prop: 'phone',
        minWidth: '90px'
      },
      {
        label: '性别',
        prop: 'sex',
        minWidth: '60px'
      },
      {
        label: '申请时间',
        prop: 'createTime',
        minWidth: '130px'
      },
      {
        label: '户籍地址',
        prop: 'address',
        minWidth: '180px',
        showOverflowTooltip: true
      },
      {
        label: '居住地',
        prop: 'livingPlace',
        minWidth: '180px',
        showOverflowTooltip: true
      },
      {
        label: '接管日期',
        prop: 'handoverTime'
      },
      {
        label: '操作',
        slotName: 'operation',
        minWidth: '80px'
      }
    ]

    const pengdingFilterItems = [
      {
        name: 'name',
        type: 'input',
        placeholder: '请输入矫正人员姓名'
      },
      {
        name: 'time',
        type: 'datetimerange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        defaultTime: ['00:00:00', '23:59:59'],
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        }
      }
    ]

    const goBackButton = {
      text: '返回',
      attrs: {
        plain: true
      }
    }

    const closeButton = {
      text: '关闭',
      attrs: {
        plain: true,
        type: 'danger'
      },
      events: {
        click: this.onVerifyClose
      }
    }

    const verifyArgeeButtons = [
      {
        text: '确定审核通过？',
        attrs: {
          plain: true
        },
        events: {
          click: this.OnAuthCorrectionStaff
        },
        authStatus: 'PASSED'
      },
      {
        ...goBackButton,
        events: {
          click: this.onVerifyArgeeGoBack
        }
      },
      closeButton
    ]

    const verifyButtons = [
      {
        text: '通过',
        attrs: {
          plain: true
        },
        events: {
          click: this.onVerifyArgee
        }
      },
      {
        text: '不通过',
        attrs: {
          plain: true
        },
        events: {
          click: this.onVerifyDisargee
        }
      },
      closeButton
    ]

    const verifyDisagreeButtons = [
      {
        text: '提交',
        attrs: {
          plain: true
        },
        events: {
          click: this.OnAuthCorrectionStaff
        },
        authStatus: 'DENIED'
      },
      {
        ...goBackButton,
        events: {
          click: this.onVerifyDisargeeGoBack
        }
      },
      closeButton
    ]

    return {
      activeTabName: tabStatus['PENDING'],
      tabOptions,
      tabStatus,
      allTableCols,
      filterItems: pengdingFilterItems,
      pengdingFilterItems,
      radius: 300,
      radiusOptions: RADIUSOPTIONS,
      remarkOptions: REMARKOPTIONS,
      remark: '身份信息错误',
      verifyButtons,
      verifyArgeeButtons,
      verifyDisagreeButtons,
      show: {
        dialogVisible: false,
        verifyArgeeVisible: false,
        verifyDisagreeVisible: false,
        mapVisible: false
      },
      map: null,
      formModel: {
        remarkReason: ''
      },
      rules: {
        remarkReason: [
          { required: true, message: '请填写驳回原因', trigger: 'blur' }
        ]
      },
      correctionStaff: {},
      mapConfigs: {}
    }
  },

  computed: {
    ...mapState('correctionStaff', ['correctionalPage', 'authResult']),
    tableCols() {
      let cols = this.allTableCols.slice(0)
      if (this.activeTabName === this.tabStatus['PENDING']) cols.splice(-2, 1)
      return cols
    }
  },

  watch: {
    activeTabName(tabName) {
      if (tabName !== this.tabStatus['PENDING']) {
        const edited = {
          name: 'edited',
          type: 'select',
          placeholder: '请选择填写状态',
          options: ISWRITE
        }

        this.filterItems = [...this.pengdingFilterItems, edited]
      } else this.filterItems = this.pengdingFilterItems
    }
  },

  methods: {
    ...mapActions('correctionStaff', [
      'getCorrectionalPage',
      'authCorrectionalStaff'
    ]),

    async gettingPageData() {
      this.$showLoading()

      const { name, edited, time } = this.filterParams

      let params = {
        ...this.pagination,
        status: this.activeTabName,
        name,
        edited
      }

      if (time) {
        params = {
          ...params,
          startTime: time[0],
          endTime: time[1]
        }
      }

      await this.getCorrectionalPage(params)

      this.$set(
        this.pageData,
        'totalElements',
        this.correctionalPage['totalCount']
      )
    },

    onVerify(row) {
      this.show.dialogVisible = true

      this.correctionStaff = Object.assign({}, row)

      this.radius = this.correctionStaff.effectiveRange
    },

    onVerifyArgee() {
      this.show.verifyArgeeVisible = true
    },

    onVerifyArgeeGoBack() {
      this.show.verifyArgeeVisible = false
    },

    onVerifyDisargee() {
      this.show.verifyDisagreeVisible = true
    },

    onVerifyDisargeeGoBack() {
      this.show.verifyDisagreeVisible = false

      this.remark = '身份信息错误'

      this.$refs.form && this.$refs.form.resetFields()
    },

    onVerifyClose() {
      this.show.dialogVisible = false

      this.show.verifyArgeeVisible = false

      this.show.verifyDisagreeVisible = false

      this.radius = 300

      this.remark = '身份信息错误'

      this.$refs.form && this.$refs.form.resetFields()
    },

    async OnAuthCorrectionStaff(e) {
      this.$showLoading()

      const { username } = this.correctionStaff

      let params = {
        effectiveRange: this.radius,

        opStatus: e.currentTarget.dataset.status,

        username
      }

      let isSuccess = false

      if (e.currentTarget.dataset.status === 'DENIED') {
        const remarks = this.formModel.remarkReason || this.remark

        params = { ...params, remarks }

        if (this.remark === '其他') {
          this.$refs.form.validate(async valid => {
            if (valid) isSuccess = await this.authCorrectionalStaff(params)
          })
        } else isSuccess = await this.authCorrectionalStaff(params)
      } else isSuccess = await this.authCorrectionalStaff(params)

      if (isSuccess) this.onVerifyClose()

      if (this.authResult.isPassed) this.activeTabName = 'PASSED'

      if (this.authResult.isDenied) {
        this.calculatePagination()
        this.gettingPageData()
      }
    },

    onRemarkChange() {
      this.$refs.form && this.$refs.form.resetFields()
    },

    onMapClose() {
      this.show.mapVisible = false
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

      this.show.mapVisible = true
    },

    onEdit(staff) {
      const { username } = staff
      this.$router.push({
        path: `${routesPath.CORRECTION_STAFF_INFORMATION}/${username}`
      })
    }
  },

  activated() {
    this.gettingPageData()
  }
}
</script>

<style lang="scss" scoped>
.correction-staff {
  &_content {
    .el-table {
      ::v-deep .el-button {
        &--primary {
          width: 100%;
        }
      }

      // ::v-deep .cell {
      //   height: 32px;
      //   line-height: 32px;
      // }
    }
  }

  .row {
    &-flex {
      display: flex;
    }

    &-remark {
      & > div {
        padding-top: 10px;

        .el-textarea,
        .el-select {
          width: 60%;
        }
      }
    }

    &-button {
      justify-content: space-between;

      ::v-deep button {
        width: 20%;
      }
    }

    &-verifier {
      &_files {
        padding-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-image,
        .video,
        .audio {
          width: 48%;
          height: 150px;
          box-shadow: 0 0 5px #ddd;
          margin-bottom: 5px;

          img {
            width: 100%;
            cursor: pointer;
          }

          ::v-deep .video-placeholder,
          .audio {
            line-height: 150px;
          }
        }
      }
    }
  }
}
</style>
