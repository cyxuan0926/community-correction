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
        :cols="tableCols"
        :data="pageData.content"
        stripe
      >
        <template #registVideo="{ row }">
          <base-video :videoUrl="row.videoUrl" />
        </template>

        <template #status="{ row }">{{
          row.status | filterInput({ filterEl: registrationStatus })
        }}</template>

        <template #normalReportRate="{ row }">{{ row.normalReportRate + '%' }}</template>
      </base-table>
    </div>

    <base-pagination
      :total="pageData.totalElements"
      :page-size.sync="pagination.rows"
      :current-page.sync="pagination.page"
      @size-change="onSizeChange"
      @current-change="onPageChange"
    />
  </div>
</template>
<script>
import { pagination, registrationDetail } from '@/common/mixins'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Registration',

  mixins: [pagination, registrationDetail],

  data() {
    const tabStatus = {
      STATISTICS: 'STATISTICS',
      DETAILS: 'DETAILS'
    }

    const tabOptions = [
      {
        label: '报到详情',
        name: tabStatus['DETAILS']
      },
      {
        label: '报到统计',
        name: tabStatus['STATISTICS']
      }
    ]

    const statisticsTableCols = [
      {
        label: '矫正人员姓名',
        prop: 'realName'
      },
      {
        label: '接管时间',
        prop: 'handoverTime',
        minWidth: 100
      },
      {
        label: '应报到次数',
        prop: 'shouldReport'
      },
      {
        label: '正常报到次数',
        prop: 'normalReport'
      },
      // {
      //   label: '异常报到次数',
      //   prop: 'abnormalReport'
      // },
      {
        label: '外出报到次数',
        prop: 'awayReport'
      },
      {
        label: '未报到次数',
        prop: 'notReport'
      },
      {
        label: '正常报到率',
        prop: 'normalReportRate',
        slotName: 'normalReportRate'
      }
    ]

    return {
      activeTabName: tabStatus['STATISTICS'],
      tabOptions,
      tabStatus,
      statisticsTableCols
    }
  },

  computed: {
    ...mapState('registration', ['reportDetailLists', 'reportStatisticsLists']),

    tableCols() {
      if (this.activeTabName === this.tabStatus['STATISTICS'])
        return this.statisticsTableCols
      else {
        let cols = this.commonRegistrationDetailTableCols.slice(0)
        cols.splice(0, 3)
        return cols
      }
    }
  },

  watch: {
    activeTabName(tabName) {
      const cloneFilterItems = this.allFilterItems.slice(0)

      if (tabName === this.tabStatus['STATISTICS'])
        cloneFilterItems.splice(-1, 1)

      this.filterItems = cloneFilterItems
    }
  },

  methods: {
    ...mapActions('registration', [
      'getReportDetailsPage',
      'getReportStatisticsPage'
    ]),

    async gettingPageData() {
      this.$showLoading()

      const { correctionalName, time, status } = this.filterParams

      let params = {
        ...this.pagination,
        correctionalName,
        status
      }

      if (time) {
        params = {
          ...params,
          startDate: time[0],
          endDate: time[1]
        }
      }

      let content, total

      if (this.activeTabName === this.tabStatus['STATISTICS']) {
        await this.getReportStatisticsPage(params)

        content = this.reportStatisticsLists['content']

        total = this.reportStatisticsLists['totalCount']
      }

      if (this.activeTabName === this.tabStatus['DETAILS']) {
        await this.getReportDetailsPage(params)

        content = this.reportDetailLists['content']

        total = this.reportDetailLists['totalCount']
      }

      this.$set(this.pageData, 'content', content)

      this.$set(this.pageData, 'totalElements', total)
    }
  },

  async created() {
    const initFilterItems = this.allFilterItems.slice(0)

    initFilterItems.splice(-1, 1)
    this.filterItems = [...initFilterItems]

    await this.gettingPageData()
  }
}
</script>
