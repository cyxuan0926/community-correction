<template>
  <div class="supervision-remind">
    <div class="supervision-remind_search search">
      <base-filter
        v-model="filterParams"
        :filterItems="filterItems"
        :on-filter="onFilterForms"
        clearable
      >
        <template #append>
          <el-button class="button_warnning" plain @click="onRemind"
            >提醒</el-button
          >
        </template>
      </base-filter>
    </div>

    <div class="supervision-remind_content content">
      <base-table :cols="tableCols" :data="reportRemindLists.content" stripe />
    </div>

    <base-pagination
      :total="reportRemindLists.totalCount"
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

import { Message } from 'element-ui'

export default {
  name: 'supervisionRemind',

  mixins: [pagination],

  data() {
    const cols = [
      {
        label: '矫正人员姓名',
        prop: 'realName'
      },
      {
        label: '电话号码',
        prop: 'phone'
      },
      {
        label: '判处类型',
        prop: 'sentenceType'
      },
      {
        label: '接管日期',
        prop: 'handoverTime'
      },
      {
        label: '报到日',
        prop: 'reportingDay'
      },
      {
        label: '报到期限',
        prop: 'reportDeadline'
      },
      {
        label: '剩余时间',
        prop: 'surplusDate'
      }
    ]

    const items = [
      {
        name: 'realName',
        type: 'input',
        placeholder: '请输入矫正人员姓名'
      }
    ]
    return {
      tableCols: cols,
      filterItems: items
    }
  },

  computed: {
    ...mapState('supervision', ['reportRemindLists', 'reportRemindResult'])
  },

  methods: {
    ...mapActions('supervision', ['getReportRemindLists', 'sendReportRemind']),

    async gettingPageData() {
      this.$showLoading()

      const params = {
        ...this.pagination,
        ...this.filterParams
      }

      await this.getReportRemindLists(params)
    },

    async onRemind() {
      this.$showLoading()

      // await this.sendReportRemind()

      if (this.reportRemindResult) {
        Message.closeAll()

        Message({
          type: 'success',
          message: '提醒短信已发送！',
          duration: 3000,
          showClose: true
        })
      }
    }
  },

  async created() {
    await this.gettingPageData()
  }
}
</script>

<style lang="scss" scoped>
.supervision-remind {
  &_search {
    .button_warnning {
      margin-left: 40px;
    }
  }
}
</style>
