<template>
  <div class="registration">
    <div class="registration_search search">
      <base-filter
        v-model="filterParams"
        :filterItems="filterItems"
        :on-filter="onFilterForms"
        clearable
      />
    </div>

    <div class="registration_content content">
      <el-tabs type="card" v-model="activeTabName">
        <template v-for="{ name, label } in tabOptions">
          <el-tab-pane :key="label + name" :label="label" :name="name" />
        </template>
      </el-tabs>

      <base-table
        class="table-tabs_card"
        :cols="tableCols"
        :data="reportOutLists.content"
        stripe
      >
        <template #roundType="{ row }">{{
          row.roundType | filterInput({ filterEl: roundType })
        }}</template>

        <template #vehicleType="{ row }">
          <!-- 往返 -->
          <span v-if="row.roundType === '1'">{{
            row.backVehicleType | filterInput({ filterEl: vehicleType })
          }}</span>

          <!-- 单程 -->
          <span v-else>{{
            row.leaveVehicleType | filterInput({ filterEl: vehicleType })
          }}</span>
        </template>

        <template #tocityName="{ row }">
          <!-- 往返 -->
          <span v-if="row.roundType === '1'">{{ row.backTocityName }}</span>

          <!-- 单程 -->
          <span v-else>{{ row.leaveTocityName }}</span>
        </template>

        <template #status="{ row }">{{
          row.status | filterInput({ filterEl: status })
        }}</template>

        <template #operation="{ row }">
          <el-button v-if="!row.status" @click="onAudit(row.id)"
            >审批</el-button
          >

          <el-button v-else @click="onGetDetails(row.id)">详情</el-button>
        </template>
      </base-table>
    </div>

    <base-pagination
      :total="reportOutLists.totalCount"
      :page-size.sync="pagination.rows"
      :current-page.sync="pagination.page"
      @size-change="onSizeChange"
      @current-change="onPageChange"
    />
  </div>
</template>
<script>
import { pagination } from '@/common/mixins'

import { mapState, mapActions } from 'vuex'

import { status, vehicleType, roundType } from '@/common/constants'

import routesPath from '@/router/routes-path'

export default {
  name: 'supervisionOut',

  mixins: [pagination],

  data() {
    const tabOptions = [
      {
        label: '外出申请',
        name: '0'
      },
      {
        label: '待审核',
        name: '1'
      }
    ]

    const cols = [
      {
        label: '矫正人员姓名',
        prop: 'realName'
      },
      {
        label: '判处类型',
        prop: 'sentenceType'
      },
      {
        label: '申请时间',
        prop: 'createTime'
      },
      {
        label: '出发日期',
        prop: 'leaveStartTime'
      },
      {
        label: '单程往返',
        prop: 'roundType',
        slotName: 'roundType'
      },
      {
        label: '交通工具',
        prop: 'vehicleType',
        slotName: 'vehicleType'
      },
      {
        label: '目的城市',
        prop: 'tocityName',
        slotName: 'tocityName'
      },
      {
        label: '申请状态',
        prop: 'status',
        slotName: 'status'
      },
      {
        label: '操作',
        slotName: 'operation'
      }
    ]

    const initItems = [
      {
        name: 'correctionName',
        type: 'input',
        placeholder: '请输入矫正人员姓名'
      },
      {
        name: 'time',
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        valueFormat: 'yyyy-MM-dd'
      }
    ]

    return {
      activeTabName: '1',
      tabOptions,
      tableCols: cols,
      initItems,
      status,
      vehicleType,
      roundType
    }
  },

  computed: {
    ...mapState('supervision', ['reportOutLists'])
  },

  watch: {
    activeTabName(tabName) {
      const item = {
        name: 'status',
        type: 'select',
        placeholder: '请选择申请状态',
        options: this.status
      }

      if (tabName === '1') this.filterItems = this.initItems
      else this.filterItems = [...this.initItems, item]
    }
  },

  methods: {
    ...mapActions('supervision', ['getReportOutLists']),

    async gettingPageData() {
      this.$showLoading()

      const { correctionName, time, status } = this.filterParams

      let params = {
        ...this.pagination,
        status,
        correctionName,
        auditPending: this.activeTabName
      }

      if (time) {
        params = {
          ...params,
          startTime: time[0],
          endTime: time[1]
        }
      }

      await this.getReportOutLists(params)

      this.$set(
        this.pageData,
        'totalElements',
        this.reportOutLists['totalCount']
      )
    },

    onGetDetails(id) {
      this.$router.push({
        path: `${routesPath.SUPERVISION_OUT_INFORMATION}/${id}`
      })
    },

    onAudit(id) {
      this.$router.push({
        path: `${routesPath.SUPERVISION_OUT_INFORMATION_AUDIT}/${id}`
      })
    }
  },

  async activated() {
    this.filterItems = this.initItems
    await this.gettingPageData()
  }
}
</script>
