import { REGISTRATION } from '@/common/constants'

export default {
  data() {
    const commonRegistrationDetailTableCols = [
      {
        label: '省份',
        prop: 'provinceName'
      },
      {
        label: '地市',
        prop: 'cityName'
      },
      {
        label: '机构名称',
        prop: 'jurisdictionName'
      },
      {
        label: '矫正人员姓名',
        prop: 'prisonerName'
      },
      {
        label: '判处类型',
        prop: 'sentenceType'
      },
      {
        label: '应报到时间',
        prop: 'shouldTime'
      },
      {
        label: '实际报到时间',
        prop: 'realityTime'
      },
      {
        label: '报到地址定位',
        prop: 'detailAddress',
        showOverflowTooltip: true
      },
      {
        label: '报到状态',
        prop: 'status',
        slotName: 'status'
      }
    ]
    const allFilterItems = [
      {
        name: 'correctionalName',
        type: 'input',
        placeholder: '请输入矫正人员姓名'
      },
      {
        name: 'time',
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        name: 'status',
        type: 'select',
        placeholder: '请选择报到状态',
        options: REGISTRATION
      }
    ]

    return {
      commonRegistrationDetailTableCols,
      allFilterItems,
      registrationStatus: REGISTRATION
    }
  }
}
