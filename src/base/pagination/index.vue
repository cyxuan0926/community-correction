<template>
  <div class="pagination" v-if="$attrs.total">
    <span class="pagination-total">共 {{ $attrs.total }} 条</span>
    <el-pagination
      background
      layout="sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40, 50]"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: $base-space * 3;
  line-height: 32px;
  padding-right: 2px;

  .pagination-total {
    padding: 0px 10px;
  }

  ::v-deep li.active {
    & + li {
      border-left: 1px solid #e8e8e8;
    }
  }
}
</style>
