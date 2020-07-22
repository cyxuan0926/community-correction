import baseFilter from '@/components/filter'

export default {
  components: { baseFilter },

  data() {
    return {
      // 分页参数
      pagination: { page: 1, rows: 10 },

      // 当前页的数据
      pageData: { totalElements: 0, content: [] },

      // 搜索元素
      filterItems: [],

      // 查询参数
      filterParams: {}
    }
  },

  computed: {
    currentPageElements() {
      const { page, rows } = this.pagination

      const { totalElements } = this.pageData

      return page > 1 ? totalElements - (page - 1) * rows : totalElements
    }
  },

  methods: {
    // 页码切换
    onPageChange(page) {
      this.pagination.page = page
      this.gettingPageData()
    },

    // 每页条数切换
    onSizeChange(rows) {
      this.pagination.page = 1
      this.pagination.rows = rows
      this.gettingPageData()
    },

    resetPagination() {
      this.updatePagination(1, 10)
    },

    updatePagination(page = 1, rows = 10) {
      this.pagination.page = page
      this.pagination.rows = rows
    },

    calculatePagination(rowsRemoved = 1) {
      if (this.pagination.page > 1 && rowsRemoved >= this.currentPageElements) {
        this.pagination.page--
      }
    },

    // 表格自定义排序列
    sn(index) {
      return index + 1 + (this.pagination.page - 1) * this.pagination.rows
    },

    onFilterForms() {
      this.resetPagination()
      this.gettingPageData()
    },

    // 获取数据的方法
    gettingPageData() {
      throw new Error('必须提供 gettingPageData 方法')
    }
  }
}
