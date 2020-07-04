// 省-市-区县-司法所联动
import { mapGetters } from 'vuex'

export default {
  data() {
    const basicFilterItem = {
      type: 'select',
      loading: true,
      defaultValue: null,
      options: [],
      labelKey: 'name',
      valueKey: 'code'
    }

    const provinceFilterItem = {
      ...basicFilterItem,
      name: 'provinceCode',
      placeholder: '请选择省份'
    }

    const cityFilterItem = {
      ...basicFilterItem,
      name: 'cityCode',
      placeholder: '请选择市'
    }

    const countyFilterItem = {
      ...basicFilterItem,
      name: 'areaCode',
      placeholder: '请选择区县'
    }

    const jurisdictionFilterItem = {
      ...basicFilterItem,
      name: 'jurisdictionCode',
      placeholder: '请选择司法机构'
    }
    return {
      jurisdictionFilterItem,
      countyFilterItem,
      provinceFilterItem,
      cityFilterItem,
      hasFilterItems: []
    }
  },

  computed: {
    ...mapGetters('account', [
      'getJusticeCode',
      'isJudiciaryAccount',
      'isJusticeDepartmentAccount',
      'isJusticeBureauAccount',
      'isJudiceOfficeAccount'
    ])
  },

  methods: {
    async onSelectChange({
      name = '',
      value = '',
      filterItems = [],
      filterParams = {}
    }) {
      if (name === 'provinceCode') {
        if (filterItems.some(item => item.name === 'cityCode')) {
          const index = filterItems.findIndex(item => item.name === 'cityCode')
          if (value) {
            await this.initOrganizationData({
              actionName: 'getCities',
              actionPayload: {
                provinceCode: value
              },
              filterItem: filterItems[index],
              stateName: 'cityLists',
              isChanged: true,
              isInitItems: false
            })
          } else this.$set(filterItems[index], 'options', [])

          this.$set(filterParams, 'cityCode', null)

          if (filterItems.some(item => item.name === 'areaCode')) {
            const index = filterItems.findIndex(
              item => item.name === 'areaCode'
            )

            this.$set(filterParams, 'areaCode', null)

            this.$set(filterItems[index], 'options', [])
          }
        }

        if (filterItems.some(item => item.name === 'jurisdictionCode')) {
          const index = filterItems.findIndex(
            item => item.name === 'jurisdictionCode'
          )

          if (
            filterItems.some(item => item.name === 'cityCode') ||
            filterItems.some(item => item.name === 'areaCode')
          ) {
            this.$set(filterItems[index], 'options', [])
          } else {
            const pid = value || 0

            this.initOrganizationData({
              actionName: 'getJurisdictions',
              actionPayload: { pid },
              filterItem: filterItems[index],
              stateName: 'jurisdictions',
              isChanged: true,
              isInitItems: false
            })
          }
          this.$set(filterParams, 'jurisdictionCode', null)
        }
      }

      if (name === 'cityCode') {
        if (filterItems.some(item => item.name === 'areaCode')) {
          const index = filterItems.findIndex(item => item.name === 'areaCode')

          if (value) {
            await this.initOrganizationData({
              actionName: 'getCounties',
              actionPayload: {
                cityCode: value
              },
              filterItem: filterItems[index],
              stateName: 'countyLists',
              isChanged: true,
              isInitItems: false
            })
          } else this.$set(filterItems[index], 'options', [])

          this.$set(filterParams, 'areaCode', null)
        }

        if (filterItems.some(item => item.name === 'jurisdictionCode')) {
          const index = filterItems.findIndex(
            item => item.name === 'jurisdictionCode'
          )

          if (filterItems.some(item => item.name === 'areaCode')) {
            this.$set(filterItems[index], 'options', [])
          } else {
            if (value) {
              this.initOrganizationData({
                actionName: 'getJurisdictions',
                actionPayload: {
                  adCode: value
                },
                filterItem: filterItems[index],
                stateName: 'jurisdictions',
                isChanged: true,
                isInitItems: false
              })
            } else this.$set(filterItems[index], 'options', [])
          }
          this.$set(filterParams, 'jurisdictionCode', null)
        }
      }

      if (name === 'areaCode') {
        if (filterItems.some(item => item.name === 'jurisdictionCode')) {
          const index = filterItems.findIndex(
            item => item.name === 'jurisdictionCode'
          )

          if (value) {
            this.initOrganizationData({
              actionName: 'getJurisdictions',
              actionPayload: {
                adCode: value
              },
              filterItem: filterItems[index],
              stateName: 'jurisdictions',
              isChanged: true,
              isInitItems: false
            })
          } else this.$set(filterItems[index], 'options', [])

          this.$set(filterParams, 'jurisdictionCode', null)
        }
      }
    },

    // 初始化省/市/区县/司法机构数据
    async initOrganizationData({
      actionName = '',
      actionPayload = {},
      filterItem = {},
      moduleName = 'global',
      stateName = '',
      isInitData = false,
      isInitItems = true,
      isChanged = false
    }) {
      if (isInitItems)
        this.hasFilterItems = [filterItem, ...this.hasFilterItems]

      if (
        (this.$store.state[moduleName][stateName].length === 0 && isInitData) ||
        isChanged
      ) {
        this.$set(filterItem, 'loading', true)

        await this.$store.dispatch(`${moduleName}/${actionName}`, actionPayload)

        this.$set(filterItem, 'loading', false)
      }

      const data = this.$store.state[moduleName][stateName]

      this.$set(filterItem, 'options', data || [])

      if (filterItem['loading']) this.$set(filterItem, 'loading', false)
    },

    // 省份
    async createProvinceFilter(isInitData) {
      await this.initOrganizationData({
        actionName: 'getProvinces',
        filterItem: this.provinceFilterItem,
        stateName: 'provinceLists',
        isInitData
      })
    },

    // 市
    async createCityFilter(isInitData, actionPayload = {}) {
      await this.initOrganizationData({
        actionName: 'getCities',
        actionPayload,
        filterItem: this.cityFilterItem,
        stateName: 'cityLists',
        isInitData
      })
    },

    // 区县
    async createCountyFilter(isInitData, actionPayload = {}) {
      await this.initOrganizationData({
        actionName: 'getCounties',
        actionPayload,
        filterItem: this.countyFilterItem,
        stateName: 'countyLists',
        isInitData
      })
    },

    // 司法机构
    async createJurisdictionFilter(isInitData, actionPayload = {}) {
      await this.initOrganizationData({
        actionName: 'getJurisdictions',
        actionPayload,
        filterItem: this.jurisdictionFilterItem,
        stateName: 'jurisdictions',
        isInitData
      })
    }
  },

  created() {
    
    // 司法部 省 市
    if (this.isJudiciaryAccount) {
      this.createCityFilter()
      this.createProvinceFilter(true)
    
    // 司法厅 市 区县
    }else if (this.isJusticeDepartmentAccount) {
      let provinceCode = this.getJusticeCode.provinceCode
      this.createCountyFilter()
      this.createCityFilter(true, {
        provinceCode
      })
      this.filterParams.provinceCode = provinceCode
    
    // 市司法局 区县
    }else if (this.isJusticeBureauAccount) {
      let cityCode = this.getJusticeCode.cityCode
      this.createCountyFilter(true, {
        cityCode
      })
      this.filterParams.cityCode = cityCode
    // 区县司法局 司法所
    }else {
      let areaCode = this.getJusticeCode.areaCode
      this.createJurisdictionFilter(true, {
        adCode: areaCode
      })
      this.filterParams.areaCode = areaCode
    }

  }
}
