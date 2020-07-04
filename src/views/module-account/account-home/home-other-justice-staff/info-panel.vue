<template>
    <div class="info__panel">
        <table class="info__panel__table">
            <tbody>
                <tr>
                    <td width="25%">姓名：</td>
                    <td width="25%">{{ infoData.realName }}</td>
                    <td width="25%">罪名：</td>
                    <td width="25%">{{ infoData.charge }}</td>
                </tr>
                <tr>
                    <td>报到规则：</td>
                    <td>每月{{ infoData.reportingDay }}日</td>
                    <td>接管日期：</td>
                    <td>{{ infoData.handoverTime }}</td>
                </tr>
                <tr>
                    <td>应报到日期：</td>
                    <td>{{ infoData.shouldTime }}</td>
                    <td>所属司法所：</td>
                    <td>{{ infoData.jurisdictionName }}</td>
                </tr>
                <tr>
                    <td>历史报到日期：</td>
                    <td colspan="3">
                        <el-select 
                            v-model="selectReportDate" 
                            placeholder="请选择历史报到日期"
                            :change="handleHistoryReportChange">
                            <el-option
                                v-for="item in reportDateList"
                                :key="item"
                                :label="item"
                                :value="item"
                                :class="{'has-reportError': reportDetailedAddress[item][0].status == 5}">
                            </el-option>
                        </el-select>
                    </td>
                </tr>

                <tr>
                    <td>外出请假情况：</td>
                    <td colspan="3">
                        <div class="info__panel__scroll" @scroll.stop>
                            <template v-if="reportAddressList.length">
                                <p v-for="(r, index) in reportAddressList" :key="r.id">{{r.address}}<span v-if="index != reportAddressList.length - 1">；</span></p>
                            </template>
                            <template v-else>
                                <p class="info__panel__noresult">暂无外出请假数据</p>
                            </template>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { getReportHistoryDate } from '@/services/api/module-registration'
    const now = Date.now()
    export default {
        name: 'info-panel',
        
        props: {
            infoData: Object
        },

        data() {
            return {
                selectReportDate: '',
                reportDateList: [],
                reportDetailedAddress: {},
                reportAddressList: []
            }
        },

        watch: {
            infoData() {
                this.setReportData()
            }
        },

        methods: {
            setReportData() {
                this.infoData.historyDates.forEach(d => {
                    const rt = d.reportTime
                    if( !this.reportDateList.includes(rt) ) {
                        this.reportDateList.push(rt)
                    }
                    (this.reportDetailedAddress[rt] = this.reportDetailedAddress[rt] || []).push({
                        id: d.id,
                        status: d.status,
                        address: `${d.leaveTime}去${d.detailedAddress}，${d.backTime}返回`
                    })
                });
                this.selectReportDate = this.reportDateList[0]
                this.setReportAddressList()
            },

            setReportAddressList() {
                this.reportAddressList = this.reportDetailedAddress[ this.selectReportDate ]
            },
            
            handleHistoryReportChange(val) {
                this.selectReportDate = val
                this.setReportAddressList()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .info__panel {
        &__table {
            color: #666;
            border-collapse: collapse;
            border: 1px solid #ebeef5;

            td  {
                border: 1px solid #ebeef5;
                padding: 5px;
                font-size: 12px;
            }
            
            tr:last-child {
                .info__panel__scroll {
                    height: 50px;
                    overflow-x: hidden;
                    overflow-y: auto;

                    .info__panel__noresult {
                        padding-top: 16px;
                        color: #999;
                        text-align: center
                    }   
                }
            }
        }
    }

    .el-select-dropdown__item.has-reportError {
        color: red !important;
    }
</style>