<template>
  <el-form class="com-filter" :model="filterParams" inline>
    <el-form-item
      v-for="item in filterItems"
      :key="item.name"
      :prop="item.name"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="filterParams[item.name]"
        v-bind="item"
        clearable
      />

      <el-select
        clearable
        filterable
        v-if="item.type === 'select'"
        v-model="filterParams[item.name]"
        v-bind="item"
      >
        <el-option
          v-for="(option, i) in item.options"
          :key="i"
          :label="option[item.labelKey || 'label']"
          :value="option[item.valueKey || 'value']"
        />
      </el-select>

      <el-date-picker
        v-if="isDatePicker(item.type)"
        v-model="filterParams[item.name]"
        v-bind="item"
      />
    </el-form-item>

    <el-form-item class="operate">
      <el-button type="primary" @click="onFilter(normalizedFilterParams)">
        查询
      </el-button>

      <el-button v-if="clearable" type="warning" @click="onClear">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { filterObject, hasValue } from '@/utils/lang'

export default {
  name: 'ComFilter',

  props: {
    clearable: Boolean,

    value: {
      type: Object,
      default: () => ({})
    },

    filterItems: {
      type: Array,
      default: () => []
    },

    onFilter: {
      type: Function,
      default: function() {}
    }
  },

  data() {
    return {
      filterParams: {}
    }
  },

  computed: {
    normalizedFilterParams() {
      return filterObject(this.filterParams, val => hasValue(val))
    }
  },

  watch: {
    filterParams: {
      deep: true,
      handler() {
        this.$emit('input', this.normalizedFilterParams)
      }
    }
  },

  created() {
    this.initFilterParams()
  },

  methods: {
    initFilterParams() {
      this.filterItems.forEach(item => {
        this.$set(this.filterParams, item.name, item.defaultValue)
      })
    },

    onClear() {
      Object.keys(this.filterParams).forEach(k => {
        this.filterParams[k] = undefined
      })

      this.$emit('input', this.normalizedFilterParams)
      this.onFilter(this.normalizedFilterParams)
    },

    isDatePicker(type) {
      const types = [
        'year',
        'month',
        'date',
        'dates',
        'week',
        'datetime',
        'datetimerange',
        'daterange',
        'monthrange'
      ]

      return types.includes(type)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0 !important;
}
</style>
