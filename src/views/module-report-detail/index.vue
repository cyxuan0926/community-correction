<template>
  <div class="supervision-remind">
    <div class="supervision-remind_search search">
      <base-filter
        v-model="filterParams"
        :filterItems="filterItems"
        :on-filter="onFilterForms"
        :on-select-change="onSelectChange"
        clearable
      />
    </div>

    <div class="supervision-remind_content content">
      <base-table :cols="tableCols" :data="pageData.content" stripe>
        <template #registVideo="{ row }">
          <base-video :videoUrl="row.videoUrl" />
        </template>

        <template #audioSlot="{ row }">
          <base-audio :audioUrl="row.audioUrl" />
        </template>

        <template #status="{ row }">{{
            row.status | filterInput({ filterEl: registrationStatus })
          }}</template>
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
import {
  pagination,
  registrationDetail,
  jurisdictionsFilterCreator
} from '@/common/mixins'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'reportDetailList',

  mixins: [pagination, registrationDetail, jurisdictionsFilterCreator],

  data() {
    return {}
  },

  computed: {
    ...mapState('registration', ['reportDetailLists']),

    ...mapGetters('account', [
      'isJudiciaryAccount',
      'isJusticeDepartmentAccount',
      'isJusticeBureauAccount',
      'isJudiceOfficeAccount'
    ]),

    tableCols() {
      return this.commonRegistrationDetailTableCols.slice(
        this.isJudiciaryAccount ? 0 : 
          this.isJusticeDepartmentAccount ? 1 : 2
      )
    }
  },

  methods: {
    ...mapActions('registration', [
      'getReportDetailsPage',
    ]),

    async gettingPageData() {
      let content, total
      const {time, ...params} = {
        ...this.pagination,
        ...this.filterParams
      }
      if( time ) {
        params.startDate = time[0]
        params.endDate = time[1]
      }
      await this.getReportDetailsPage(params)
      content = this.reportDetailLists['content']
      total = this.reportDetailLists['totalCount']
      this.$set(this.pageData, 'content', content)
      this.$set(this.pageData, 'totalElements', total)
    }
  },

  async created() {
    this.filterItems = [...this.hasFilterItems, ...this.allFilterItems]
    this.gettingPageData()
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
