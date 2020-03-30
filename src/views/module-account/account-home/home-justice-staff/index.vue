<template>
  <div class="home">
    <div class="home__content-information">
      <div class="information-item_registration">
        <div class="registration-item_weather">
          <div id="weather-view-he" />
        </div>
        <div class="registration-item_warnning">
          <strong>报到提醒</strong>
          <el-link>
            <strong>更多 ></strong>
          </el-link>
        </div>
        <div class="registration-item_near">
          <div>
            <i class="el-icon-ship icon" />
            <span>临近报到</span>
          </div>
          <div>10位矫正人员报到时间只剩1天</div>
        </div>
        <div class="registration-item_late">
          <div>
            <i class="el-icon-ship icon" />
            <span>报到范围内未报到</span>
          </div>
          <div>未报到人数：28</div>
        </div>
      </div>
      <div class="information-item_supervision">
        <div class="supervision-item_title">
          <strong>外出申请报到</strong>
          <el-link>
            <strong>更多 ></strong>
          </el-link>
        </div>
        <base-table
          stripe
          :cols="tabelCols"
          :data="tableData"
          empty-text="暂无外出申请数据"
        >
          <template #operation>
            <el-link :underline="false">审核</el-link>
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
        @change="onMonthPickerChange"
      />
      <el-calendar v-model="dateMonth">
        <template #dateCell="{ data: { isSelected, day, type }}">
          <!-- 不是当月的日期/当前月无特殊内容的日期 -->
          <span
            v-if="type !== 'current-month'"
            :class="['calendar-day_nonecurrntmonth', 'calendar-day_disabled']"
            @click.stop
          >
            {{ day | toDateString('dd', false) }}</span
          >
          <!-- 当月有特殊内容的日期 -->
          <el-popover v-else placement="right" trigger="click">
            <div slot="reference" :class="isSelected ? 'red' : ''">
              {{ day | toDateString('dd', false) }}
            </div>
          </el-popover>
        </template>
      </el-calendar>
    </div>
  </div>
</template>
<script>
import { toDateString } from '@/utils/lang'

const NOW = Date.now()

const TIME = toDateString(NOW, 'yyyy-MM-dd')

export default {
  name: 'home',

  data() {
    return {
      dateMonth: NOW,

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
          prop: 'name',
          minWidth: '95px'
        },
        {
          label: '判处类型',
          prop: 'type'
        },
        {
          label: '申请时间',
          prop: 'time',
          minWidth: '130px'
        },
        {
          label: '出发时间',
          prop: 'out',
          minWidth: '130px'
        },
        {
          label: '单程往返',
          prop: 'fc'
        },
        {
          label: '交通工具',
          prop: 'gj'
        },
        {
          label: '目的城市',
          prop: 'city'
        },
        {
          label: '操作',
          slotName: 'operation',
          prop: 'cz',
          minWidth: '50px'
        }
      ],

      basciData: {
        index: 1,
        name: '张三丰',
        type: '裁定假释',
        time: '2020-02-02 10:00:00',
        out: '2020-02-02 10:00:00',
        fc: '单程',
        gj: '火车',
        city: '乌鲁木齐'
      },

      tableData: []
    }
  },

  methods: {
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

    // 月份选择器
    onMonthPickerChange(time) {
      console.log(time, toDateString(time, 'yyyy-MM'))
    }
  },

  async mounted() {
    console.log(TIME)
    this.tableData = new Array(9).fill(this.basciData)
    await this.onLoadWeatherView()
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__content {
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

          div,
          &.calendar-day_nonecurrntmonth {
            padding: 10px 14px;
          }

          div {
            color: $--color-text-primary;
            margin: 0px auto;
            width: 10%;
          }

          &.calendar-day_noreport {
            background-color: #fefdc5;
          }

          &.calendar-day_report {
            background-color: #ddfcc8;
          }

          &.calendar-day_danger {
            background-color: #eb333d;
          }

          &.calendar-today_normal {
            background-color: $--color-primary;
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

  .red {
    background-color: red;
    border-radius: 50%;
  }

  .calendar-day_disabled {
    cursor: not-allowed;
  }
}
</style>
