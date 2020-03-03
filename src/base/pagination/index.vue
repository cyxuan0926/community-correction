<template>
  <el-row>
    <el-pagination
      background
      hide-on-single-page
      layout="prev, pager, next, slot"
      :page-sizes="[10, 20, 30, 40, 50]"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <span>共 {{ $attrs.total }} 条</span>
  </el-row>
</template>

<style lang="scss" scoped>
.el-row {
  display: flex;
  justify-content: flex-end;
  margin-top: $base-space * 3;
  line-height: 32px;
  padding-right: 2px;
}
</style>
