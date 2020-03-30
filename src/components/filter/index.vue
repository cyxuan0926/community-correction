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
        v-model.trim="filterParams[item.name]"
        v-bind="item"
        v-on="itemEvents[item.name]"
        clearable
      />

      <el-select
        clearable
        filterable
        v-if="item.type === 'select'"
        v-model="filterParams[item.name]"
        v-bind="item"
        v-on="itemEvents[item.name]"
        @change="
          onSelectChange({
            name: item.name,
            value: filterParams[item.name],
            filterItems,
            filterParams
          })
        "
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
        unlink-panels
        v-bind="item"
        v-on="itemEvents[item.name]"
      />
    </el-form-item>

    <el-form-item class="operate">
      <slot name="pre" />

      <el-button
        icon="el-icon-search"
        @click="onFilter(normalizedFilterParams)"
      />

      <el-button v-if="clearable" type="warning" @click="onClear">
        重置
      </el-button>

      <slot name="append" />
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

    itemEvents: {
      type: Object,
      default: () => ({})
    },

    onFilter: {
      type: Function,
      default: function() {}
    },

    onSelectChange: {
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
    },

    filterItems(item) {
      if (item) this.onClear()
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
  margin: 0px 10px 10px 0px !important;

  ::v-deep .el-input {
    width: 13em;
  }

  ::v-deep .el-date-editor {
    width: 24em;
  }

  ::v-deep .el-button {
    vertical-align: middle;
    height: 34px;
  }
}
</style>
