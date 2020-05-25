<template>
    <div class="info__panel">
        <table class="info__panel__table">
            <tbody>
                <tr>
                    <td width="25%">姓名：</td>
                    <td width="25%">张三</td>
                    <td width="25%">罪名：</td>
                    <td width="25%">欺诈罪</td>
                </tr>
                <tr>
                    <td>报到规则：</td>
                    <td>每月18日</td>
                    <td>接管日期：</td>
                    <td>2019-10-24</td>
                </tr>
                <tr>
                    <td>应报到日期：</td>
                    <td>每月18日</td>
                    <td>所属司法所：</td>
                    <td>湖北省司法所</td>
                </tr>
                <tr>
                    <td>历史报到日期：</td>
                    <td colspan="3">
                        <el-select 
                            v-model="historyReportDate" 
                            placeholder="请选择历史报到日期"
                            :change="handleHistoryReportChange">
                            <el-option
                                v-for="item in historyReportDateOps"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                </tr>

                <tr>
                    <td>外出请假情况：</td>
                    <td colspan="3">
                        <div class="info__panel__scroll" @scroll.stop>
                            <p>2019年12月20日08点去湖北省司法所，11点按时返回；</p>
                            <p>2019年12月25日09点去湖北省司法所，11点30未按时返回；下午7点才返回；</p>
                            <p>2019年12月25日09点去湖北省司法所，11点30未按时返回；下午7点才返回；</p>
                            <p>2019年12月25日09点去湖北省司法所，11点30未按时返回；下午7点才返回；</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { getReportHistory } from '@/services/api/module-registration'
    const now = Date.now()
    export default {
        name: 'info-panel',
        
        props: {
            // infoData: {
            //     type: Object,
            //     default: {}
            // }
        },

        data() {
            return {
                historyReportDate: '2020-05-01',
                historyReportDateOps: [{
                    label: '2020-05-01',
                    value: '2020-05-01'
                },{
                    label: '2020-05-02',
                    value: '2020-05-02'
                },{
                    label: '2020-05-03',
                    value: '2020-05-03'
                }],
                tableData: [{
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }, {
                    id: '12987123',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12
                }]
            }
        },

        methods: {
            async handleHistoryReportChange() {
                const reportHistoryList = await getReportHistory(this.historyReportDate)
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
                }
            }
        }

        .info__panel__scroll {
                    height: 50px;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
    }
</style>