import { REGISTRATION } from '@/common/constants'

export default {
  data() {
    const commonRegistrationDetailTableCols = [
      {
        label: '省份',
        prop: 'provinceName',
        width: 60,
        showOverflowTooltip: true
      },
      {
        label: '地市',
        prop: 'cityName',
        width: 60,
        showOverflowTooltip: true
      },
      {
        label: '机构名称',
        prop: 'jurisdictionName',
        minWidth: 60,
        showOverflowTooltip: true
      },
      {
        label: '矫正人员姓名',
        prop: 'prisonerName',
        minWidth: 80,
        showOverflowTooltip: true
      },
      {
        label: '判处类型',
        minWidth: 65,
        prop: 'sentenceType',
        showOverflowTooltip: true
      },
      {
        label: '应报到时间',
        prop: 'shouldTime'
      },
      {
        label: '实际报到时间',
        prop: 'realityTime',
        minWidth: 120
      },
      {
        label: '报到地址定位',
        prop: 'detailAddress',
        showOverflowTooltip: true
      },
      {
        label: '报到视频',
        slotName: 'registVideo',
        minWidth: 130
      },
      {
        label: '朗读内容',
        prop: 'readContents',
        showOverflowTooltip: true
      },
      {
        label: '报到音频',
        prop: 'audio',
        slotName: 'audioSlot'
      },
      {
        label: '报到状态',
        prop: 'status',
        slotName: 'status',
        minWidth: 65
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
