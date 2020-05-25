// 省-市-区县-司法所联动
import { roles } from '@/common/constants'
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
      name: 'provinceName',
      placeholder: '请选择省份'
    }

    const cityFilterItem = {
      ...basicFilterItem,
      name: 'cityName',
      placeholder: '请选择市'
    }

    const countyFilterItem = {
      ...basicFilterItem,
      name: 'areaName',
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
    ...mapGetters([
      'account/isJudiciaryAccount',
      'account/isJusticeDepartmentAccount',
      'account/isJusticeBureauAccount',
      'account/isJudiceOfficeAccount'
    ])
  },

  methods: {
    async onSelectChange({
      name = '',
      value = '',
      filterItems = [],
      filterParams = {}
    }) {
      if (name === 'provinceName') {
        if (filterItems.some(item => item.name === 'cityName')) {
          const index = filterItems.findIndex(item => item.name === 'cityName')
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

          this.$set(filterParams, 'cityName', null)

          if (filterItems.some(item => item.name === 'areaName')) {
            const index = filterItems.findIndex(
              item => item.name === 'areaName'
            )

            this.$set(filterParams, 'areaName', null)

            this.$set(filterItems[index], 'options', [])
          }
        }

        if (filterItems.some(item => item.name === 'jurisdictionCode')) {
          const index = filterItems.findIndex(
            item => item.name === 'jurisdictionCode'
          )

          if (
            filterItems.some(item => item.name === 'cityName') ||
            filterItems.some(item => item.name === 'areaName')
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

      if (name === 'cityName') {
        if (filterItems.some(item => item.name === 'areaName')) {
          const index = filterItems.findIndex(item => item.name === 'areaName')

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

          this.$set(filterParams, 'areaName', null)
        }

        if (filterItems.some(item => item.name === 'jurisdictionCode')) {
          const index = filterItems.findIndex(
            item => item.name === 'jurisdictionCode'
          )

          if (filterItems.some(item => item.name === 'areaName')) {
            this.$set(filterItems[index], 'options', [])
          } else {
            if (value) {
              this.initOrganizationData({
                actionName: 'getJurisdictions',
                actionPayload: {
                  pid: value
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

      if (name === 'areaName') {
        if (filterItems.some(item => item.name === 'jurisdictionCode')) {
          const index = filterItems.findIndex(
            item => item.name === 'jurisdictionCode'
          )

          if (value) {
            this.initOrganizationData({
              actionName: 'getJurisdictions',
              actionPayload: {
                pid: value
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
    async createCityFilter(isInit) {
      await this.initOrganizationData({
        actionName: 'getCities',
        filterItem: this.cityFilterItem,
        stateName: 'cityLists',
        isInit
      })
    },

    // 区县
    async createCountyFilter(isInit) {
      await this.initOrganizationData({
        actionName: 'getCounties',
        filterItem: this.countyFilterItem,
        stateName: 'countyLists',
        isInit
      })
    },

    // 司法机构
    async createJurisdictionFilter(isInit) {
      await this.initOrganizationData({
        actionName: 'getJurisdictions',
        filterItem: this.jurisdictionFilterItem,
        stateName: 'jurisdictions',
        isInit
      })
    }
  },

  created() {
    if (this.isJudiciaryAccount) {
      // 司法部
      this.createCityFilter()
      this.createProvinceFilter(true)
    }else if (this.isJusticeDepartmentAccount) {
      // 司法厅
      this.createCountyFilter()
      this.createCityFilter()
    }else if (this.isJusticeBureauAccount) {
      //this.createJurisdictionFilter()
      this.createCountyFilter()
      // this.createCityFilter()
      // this.createProvinceFilter(true)
    }else {
      this.createJurisdictionFilter()
    }
  }
}
