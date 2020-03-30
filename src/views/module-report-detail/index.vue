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
      <base-table :cols="tableCols" :data="[]" stripe />
    </div>

    <base-pagination
      :total="0"
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

// import { mapState, mapActions } from 'vuex'

export default {
  name: 'reportDetailList',

  mixins: [pagination, registrationDetail, jurisdictionsFilterCreator],

  data() {
    return {}
  },

  computed: {
    // ...mapState('supervision', ['reportRemindLists', 'reportRemindResult'])
    tableCols() {
      return this.commonRegistrationDetailTableCols
    }
  },

  methods: {
    // ...mapActions('supervision', ['getReportRemindLists', 'sendReportRemind']),

    async gettingPageData() {
      // this.$showLoading()

      const params = {
        ...this.pagination,
        ...this.filterParams
      }

      console.log(params)
    }
  },

  async created() {
    this.filterItems = [...this.hasFilterItems, ...this.allFilterItems]
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
