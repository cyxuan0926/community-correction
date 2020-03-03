import { Table, TableColumn } from 'element-ui'
import { attrLisenersHack } from '@/common/mixins'

export default {
  name: 'BaseTable',

  mixins: [attrLisenersHack],

  props: {
    cols: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    tableCols(cols) {
      const result = []

      cols.forEach(col => {
        const options = {
          attrs: { ...col },
          key: `${col.label}-${col.prop}-${col.slotName}`
        }
        const slot = col.slotName && this.$scopedSlots[col.slotName]

        if (slot) options.scopedSlots = { default: props => slot(props) }

        let childrens = []

        if (Array.isArray(col.cols) && col.cols.length > 0) {
          childrens.push(...this.tableCols(col.cols))
        }

        result.push(this.$createElement(TableColumn, options, childrens))
      })

      return result
    }
  },

  render(h) {
    return h(
      Table,
      {
        class: 'base-table',
        attrs: { ...this.$data.$_attrs },
        on: { ...this.$data.$_listeners }
      },
      this.tableCols(this.cols)
    )
  }
}
