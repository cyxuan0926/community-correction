<template>
  <div class="home__main-staff">
    <div class="home__content-information">
      <div class="information-item_registration">
        <div class="registration-item_weather">
          <div id="weather-view-he" />
        </div>

        <div class="registration-item_warnning">
          <strong>报到提醒</strong>

          <el-link @click="onMore('SUPERVISION_REMIND')">
            <strong>更多 ></strong>
          </el-link>
        </div>

        <div class="registration-item_near">
          <div>
            <i class="el-icon-ship icon" />

            <span>临近报到</span>
          </div>

          <div>
            {{ reportRemindNearbyPersons }}
          </div>
        </div>

        <div class="registration-item_late">
          <div>
            <i class="el-icon-ship icon" />

            <span>报到范围内未报到</span>
          </div>

          <div>未报到人数：{{ reportRemindUnreportPersons }}</div>
        </div>
      </div>

      <div class="information-item_supervision">
        <div class="supervision-item_title">
          <strong>外出申请报到</strong>

          <el-link @click="onMore('SUPERVISION_OUT')">
            <strong>更多 ></strong>
          </el-link>
        </div>

        <base-table
          stripe
          :cols="tabelCols"
          :data="reportOutLists.content"
          empty-text="暂无外出申请数据"
        >
          <template #roundType="{ row }">{{
            row.roundType | filterInput({ filterEl: roundType })
          }}</template>

          <template #vehicleType="{ row }">
            <!-- 往返 -->
            <span v-if="row.roundType">{{
              row.backVehicleType | filterInput({ filterEl: vehicleType })
            }}</span>

            <!-- 单程 -->
            <span v-else>{{
              row.leaveVehicleType | filterInput({ filterEl: vehicleType })
            }}</span>
          </template>

          <template #tocityName="{ row }">
            <!-- 往返 -->
            <span v-if="row.roundType">{{ row.backTocityName }}</span>

            <!-- 单程 -->
            <span v-else>{{ row.leaveTocityName }}</span>
          </template>

          <template #operation="{ row }">
            <el-button @click="onAudit(row.id)">审批</el-button>
          </template>
        </base-table>
      </div>
    </div>

    <div class="home__content-calendar">
      <el-date-picker
        v-model="dateMonth"
        type="month"
        placeholder="选择月"
        value-format="timestamp"
        :picker-options="pickerOptions"
      />

      <el-calendar v-model="dateMonth">
        <template #dateCell="{ data: { isSelected, day, type }}">
          <!-- 不是当月的日期/当前月无特殊内容的日期 -->
          <span
            v-if="
              type !== 'current-month' ||
                !calendarMonthReportInfomations['showDays'].includes(day)
            "
            :class="[
              'calendar-day_nonecurrntmonth',
              { 'calendar-day_disabled': type !== 'current-month' },
              { 'calendar-day_noreport': day === Today },
              { 'calendar-day_default': type === 'current-month' }
            ]"
            @click.stop
          >
            {{ day | toDateString('dd', false) }}</span
          >
          <!-- 当月有特殊内容的日期 -->
          <el-popover
            v-else
            v-model="showDay[day]"
            placement="bottom"
            width="200"
            trigger="click"
            :content="calendarOnedayReportInfofomations"
            @click.stop
          >
            <div
              slot="reference"
              :class="calendarMonthReportInfomations['dayConfigs'][day]"
              @click.stop="onGetDayDetails(day)"
            >
              {{ day | toDateString('dd', false) }}
            </div>
          </el-popover>
          <!-- <el-popover
            v-else
            v-model="showDay[day]"
            placement="top"
            trigger="manual"
            :content="calendarOnedayReportInfofomations"
            @click.stop
          >
            <div
              slot="reference"
              :class="calendarMonthReportInfomations['dayConfigs'][day]"
              @click.stop="onGetDayDetails(day)"
            >
              {{ day | toDateString('dd', false) }}
            </div>
          </el-popover> -->
        </template>
      </el-calendar>
    </div>
  </div>
</template>
<script>
import { toDateString } from '@/utils/lang'

import { mapState, mapActions } from 'vuex'

import routesPath from '@/router/routes-path'

const NOW = Date.now()

const TIME = toDateString(NOW, 'yyyy-MM-dd')

export default {
  name: 'home-justice-staff',

  data() {
    return {
      dateMonth: NOW,

      Today: TIME,

      pickerOptions: {
        disabledDate: time => {
          const year = time.getFullYear()
          const month = time.getMonth()
          const now = new Date()
          const currentYear = now.getFullYear()
          const currentMonth = now.getMonth()
          const disabled =
            year > currentYear || (year === currentYear && month > currentMonth)
          return disabled
        }
      },

      tabelCols: [
        {
          label: '矫正人员姓名',
          prop: 'realName',
          minWidth: '95px'
        },
        {
          label: '判处类型',
          prop: 'sentenceType'
        },
        {
          label: '申请时间',
          prop: 'createTime',
          minWidth: '130px'
        },
        {
          label: '出发时间',
          prop: 'leaveStartTime',
          minWidth: '130px'
        },
        {
          label: '单程往返',
          prop: 'roundType',
          slotName: 'roundType'
        },
        {
          label: '交通工具',
          prop: 'vehicleType',
          slotName: 'vehicleType'
        },
        {
          label: '目的城市',
          prop: 'tocityName',
          slotName: 'tocityName'
        },
        {
          label: '操作',
          slotName: 'operation'
        }
      ],

      showDay: []
    }
  },

  computed: {
    ...mapState('account', [
      'calendarMonthReportInfomations',
      'calendarOnedayReportInfofomations',
      'reportRemindNearbyPersons',
      'reportRemindUnreportPersons'
    ]),

    ...mapState('supervision', ['reportOutLists'])
  },

  methods: {
    ...mapActions('account', [
      'getCalendarOfMonthReportDetails',
      'getCalendarOfOnedayReportDetails',
      'getReportRemindOfReportNearby',
      'getReportRemindOfUnreportPersons'
    ]),

    ...mapActions('supervision', ['getReportOutLists']),

    async onLoadWeatherView() {
      try {
        await (function(d) {
          let cs = d.createElement('link')
          cs.rel = 'stylesheet'
          cs.href =
            'https://apip.weatherdt.com/view/static/css/tqw_widget_view.css?v=0101'
          let s = d.createElement('script')
          s.src =
            'https://apip.weatherdt.com/view/static/js/tqw_widget_view.js?v=0101'
          let sn = d.getElementsByTagName('script')[0]
          let w = d.createElement('script')
          w.type = 'text/javascript'
          w.innerHTML = 'WIDGET = {ID: "kXTvvwoUih"}'
          sn.parentNode.insertBefore(w, sn)
          sn.parentNode.insertBefore(cs, sn)
          sn.parentNode.insertBefore(s, sn)
        })(document)
      } catch (err) {
        Promise.reject(err)
      }
    },

    // 获取具体某一天的数据
    async onGetDayDetails(day) {
      this.calendarMonthReportInfomations['showDays'].forEach(item => {
        if (item !== day) this.$set(this.showDay, item, false)
      })

      await this.getCalendarOfOnedayReportDetails({ day })
    },

    onAudit(id) {
      this.$router.push({
        path: `${routesPath.SUPERVISION_OUT_INFORMATION_AUDIT}/${id}`
      })
    },

    getIndexOfDay(day) {
      return toDateString(day, 'dd', false)
    },

    onMore(name) {
      this.$router.push({ path: `${routesPath[name]}` })
    }
  },

  async created() {
    this.$showLoading()

    await Promise.all([
      this.onLoadWeatherView(),
      this.getCalendarOfMonthReportDetails(),
      this.getReportRemindOfReportNearby(),
      this.getReportRemindOfUnreportPersons(),
      this.getReportOutLists({ page: 1, rows: 10, auditPending: 1 })
    ])

    this.$hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.home__main-staff {
  .home__content {
    &-information {
      padding-bottom: 15px;
      display: flex;

      .information-item {
        &_registration {
          width: 260px;
          flex: 0 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .registration-item {
            &_weather {
              height: 204px;
            }

            &_near,
            &_late {
              color: $--color-white;
              background-color: #f29d70;
              width: 95%;
              div {
                padding: 10px 0px 5px 10px;

                span {
                  padding-left: 5px;
                }
                &:last-child {
                  padding: 5px 0px 10px 10px;
                }
              }
            }

            &_near {
              background-color: #eb333d;
            }

            &_warnning {
              padding: 8px 7px 8px 6px;
              width: 90%;
            }
          }
        }

        &_supervision {
          flex: 1;

          .supervision-item_title {
            padding: 6px 16px 6px 6px;
          }

          ::v-deep .el-link {
            &--inner {
              color: $--color-text-primary;
              font-size: $--font-size-extra-small;
            }
          }
        }
      }

      .supervision-item_title,
      .registration-item_warnning {
        display: flex;
        justify-content: space-between;
        background-color: #e8e8e8;
      }
    }

    &-calendar {
      background-color: $--color-white;
      border: 1px solid #e8e8e8;
      border-bottom: 0;

      ::v-deep .el-date-editor {
        margin: 20px 0px 0px 20px;
      }

      ::v-deep .el-calendar-table {
        td {
          border: none;
          &,
          & .el-calendar-day,
          &.is-selected {
            background: $--color-white;

            :focus {
              outline: none;
            }
          }
        }
      }

      ::v-deep .el-calendar__header {
        display: none;
      }

      ::v-deep .el-calendar-day {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px;
        height: auto;

        span {
          text-align: center;
          width: 100%;
          padding: 1px 0px;
          // cursor: not-allowed;

          div,
          &.calendar-day_nonecurrntmonth {
            width: auto;
            padding: 10px 14px;
          }

          div {
            color: $--color-text-primary;
            margin: 0px auto;
            width: 10%;
            cursor: pointer;
          }
        }
      }
    }
  }

  ::v-deep #weather-view-he {
    width: 95% !important;
  }

  ::v-deep .wv-v-v-copyright {
    display: none !important;
  }

  // .calendar-day_noreport {
  //   background-color: #fefdc5;
  //   border-radius: 50%;
  // }


  .calendar-day_report {
    background-color: #ddfcc8;
    border-radius: 50%;
  }

  .calendar-day_danger {
    background-color: #eb333d;
    border-radius: 50%;
  }

  .calendar-today_normal {
    background-color: $--color-primary;
    border-radius: 50%;
  }

  .calendar-day_disabled {
    cursor: not-allowed;
  }

  .calendar-day_default {
    cursor: default;
  }
}

</style>
