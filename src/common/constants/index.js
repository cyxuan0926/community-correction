// 地图的有效范围选项
export const RADIUSOPTIONS = [100, 200, 300, 400, 500, 600, 700, 800]

//矫正人员注册审核不通过驳回原因选项
export const REMARKOPTIONS = ['身份信息错误', '信息与矫正人员不符', '其他']

// 是否填写的选项
export const ISWRITE = [
  {
    label: '已填写',
    value: 1
  },
  {
    label: '未填写',
    value: 0
  }
]

// 矫正人员报到周期选项
export const REPORTCYCLEOPTIONS = [
  {
    label: '月报到',
    value: 'M'
  },
  {
    label: '日报到',
    value: 'D'
  },
  {
    label: '周报到',
    value: 'W'
  }
]

// 矫正人员报到期
export const REPORTDURATIONOPTIONS = [3, 4, 5]

// 矫正人员判处类型
export const SENTENCETYPEOPTIONS = [
  '判处管制',
  '宣告缓刑',
  '裁定假释',
  '暂予监外执行'
]

// 矫正人员附加刑
export const SUPPLEMENTARYPENALTYOPTIONS = [
  '罚金',
  '剥夺政治权利',
  '没收财产',
  '驱逐出境'
]

export const REGISTRATION = [
  {
    label: '正常报到',
    value: 1
  },
  {
    label: '外出报到',
    value: 2
  },
  {
    label: '迟到报到',
    value: 3
  },
  {
    label: '未报到',
    value: 4
  },
  {
    label: '异常报到',
    value: 5
  }
]
