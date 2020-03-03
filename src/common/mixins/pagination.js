export default {
  data() {
    return {
      // 分页参数
      pagination: { page: 1, size: 10 },
      pageData: { page: 1, size: 10, totalElements: 0, content: [] }
    }
  },

  computed: {
    currentPageElements() {
      const { page, size, totalElements } = this.pageData

      return page > 1 ? totalElements - (page - 1) * size : totalElements
    }
  },

  methods: {
    // 页码切换
    onPageChange(page) {
      this.pagination.page = page
      this.gettingPageData()
    },

    // 每页条数切换
    onSizeChange(size) {
      this.pagination.page = 1
      this.pagination.size = size
      this.gettingPageData()
    },

    resetPagination() {
      this.updatePagination(1, 10)
    },

    updatePagination(page = 1, size = 10) {
      this.pagination.page = page
      this.pagination.size = size
    },

    calculatePagination(rowsRemoved = 1) {
      if (this.pagination.page > 1 && rowsRemoved >= this.currentPageElements) {
        this.pagination.page--
      }
    },

    // 表格自定义排序列
    sn(index) {
      return index + 1 + (this.pageData.page - 1) * this.pageData.size
    },

    // 获取数据的方法
    gettingPageData() {
      throw new Error('必须提供 gettingPageData 方法')
    }
  }
}
