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

// 交通工具类型
export const vehicleType = [
  {
    label: '飞机',
    value: 0
  },
  {
    label: '火车',
    value: 1
  },
  {
    label: '汽车',
    value: 2
  },
  {
    label: '其他',
    value: 3
  }
]

// 状态
export const status = [
  {
    label: '未审核',
    value: 0
  },
  {
    label: '已通过',
    value: 1
  },
  {
    label: '已拒绝',
    value: 2
  },
  {
    label: '已取消',
    value: 3
  }
]

// 返回类型
export const roundType = [
  {
    label: '单程',
    value: '0'
  },
  {
    label: '往返',
    value: '1'
  }
]

// 性别
export const sex = [
  {
    label: '男',
    value: '男'
  },
  {
    label: '女',
    value: '女'
  }
]

// 外出审批审核
export const outCheckOperation = [
  {
    label: '通过',
    value: 0
  },
  {
    label: '不通过',
    value: 1
  }
]

// 账户角色
export const roles = {
  // 司法部账户
  JUDICIARY_ACCOUNT: 'judiciary_account',

  // 司法厅账户
  JUSTICE_DEPARTMENT_ACCOUNT: 'justice_department_account',

  // 司法局账户
  JUSTICE_BUREAU_ACCOUNT: 'justice_bureau_account',

  // 司法所账户
  JUSTICE_OFFICE_ACCOUNT: 'justice_office_account'
}
