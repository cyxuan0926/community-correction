<template>
    <div class="home__otherstaff">
        <div class="home__otherstaff__maplayer">
            <div class="maplayer__header">
                <div class="maplayer__header__flex">
                    <div class="maplayer__header__flex__form"></div>
                    <el-button type="primary" icon="el-icon-full-screen" @click="handleToggle" v-if="$fullscreen.support">全屏展示</el-button>
                    <el-button type="primary" @click="toDetail">报表展示</el-button>
                </div>
            </div>
            <fullscreen ref="fullscreen" @change="handleFullscreenChange">
                <div class="maplayer__content" id="homeMap"></div>
            </fullscreen>
            <div class="maplayer__amap__infowin" ref="mapInfoWin" :class="{'hideInfoWin' : !isInfowinOpen}">
                <div class="maplayer__amap__infowin__header">
                    <span class="maplayer__amap__infowin__header__btn-close" @click="handleInfowinClose">
                        <i class="el-icon-close"></i>
                    </span>
                </div>
                <div class="maplayer__amap__infowin__content">
                    <info-panel :infoData="infoData" />
                    <span class="maplayer__amap__infowin__caret__wrap"><i class="el-icon-caret-bottom"></i></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import routesPath from '@/router/routes-path'
    import AmapUtil from '@/utils/helper'
    import InfoPanel from './info-panel.vue'
    import debounce from 'lodash/debounce'
    import { mapState, mapGetters } from 'vuex'
    import { getReportMapmarks, getReportDetails, getReportHistoryDate } from '@/services/api/module-registration'
    import { URLConfig } from '@/services/urls'
     
    export default {
        name: 'home-other-justice-staff',

        components: {
            InfoPanel
        },

        computed: {
            ...mapState('account', ['accountJurisdictionAreaInfo']),

            ...mapGetters('account', [
                'getJusticeCode',
                'isJudiciaryAccount',
                'isJusticeDepartmentAccount',
                'isJusticeBureauAccount',
                'isJudiceOfficeAccount'
            ])
        },

        data() {
            return {
                instance: null,
                infoData: {
                    historyDates: [],
                    //selectReportDate: ''
                },
                markList: [],
                isInfowinOpen: false,
                isFullscreen: false
            }
        },

        methods: {
            async initAMap() {
                try {
                    const that = this
                    const utilIns = that.instance = AmapUtil.getMapInstance()
                    const adCode = that.getJusticeCode.adCode
                    const { data } = await getReportMapmarks()

                    await utilIns.loadMap({id: 'homeMap'})
                    await utilIns.loadPlugin('DistrictLayer')

                    if( data && data.length ) {
                        that.markList = data.filter(m => m.lng && m.lat && m.username).map(m => ({
                            props: {
                                mkId: m.id,
                                mkUsername: m.username
                            },
                            offset: utilIns.getOffset(-9.5, -32),
                            content: `<img width="19px" height="32px" src="${URLConfig.webHost}/static/img/mark_bs0${m.status}.png">`,
                            position: [m.lng, m.lat]
                        }))
                    }

                    utilIns
                    .addDistrictLayerWorld()
                    .addDistrictLayerCountry()
                    .addInfoWindow({
                        content: that.$refs.mapInfoWin,
                        //高德jsapi2.0的写法
                        //offset: utilIns.getOffset(0, -48),
                        offset: utilIns.getOffset(-2, -21),
                        isCustom: true,
                        closeWhenClickMap: true
                    })
                    .addMarks(that.markList)
                    .bindMarkEvent('click', async (e) => {
                        //高德jsapi2.0的写法
                        //const { _position, mkId, mkUsername } = e.target
                        const { mkId, mkUsername } = e.target
                        const _position = [e.lnglat.lng, e.lnglat.lat]
                        const { data } = await getReportDetails({
                            id: mkId
                        })
                        if( data ) {
                            data.historyDates = (await getReportHistoryDate({
                                username: mkUsername
                            })).data || []

                            if( utilIns.currentZoom >= utilIns.maxZoom ) {
                                utilIns.map.setCenter(_position, false, 300 )
                            }else {
                                utilIns.map.setZoomAndCenter(utilIns.maxZoom, _position, false, 400 )
                            }
                            utilIns.infoWindow.open( utilIns.map, _position )
                            that.isInfowinOpen = true
                            that.infoData = data
                        }
                    })
                    .bindMapEvent('zoomchange', debounce(() => {
                        if( (utilIns.currentZoom = utilIns.map.getZoom()) >  utilIns.maxZoom ) {
                            utilIns.hideDistrictLayer()
                        }else {
                            utilIns.showDistrictLayer()
                        }
                    }, 300))
                    
                    if( !that.isJudiciaryAccount && adCode ) {
                        // const location = await utilIns.getLocation(this.mapCenterAddress)
                        // this.mapCenterAddress = location && location.length && location[0].adcode
                        
                        utilIns.addDistrictLayerProvince({
                            adcode: [adCode]
                        })
                    }
                    utilIns.setCity(adCode)

                } catch (err) {
                    Promise.reject(err)
                }
            },

            handleInfowinClose() {
                this.instance.infoWindow.close()
            },

            toDetail() {
                this.$router.push(routesPath.REPORT_DETAIL_LIST)
            },

            handleFullscreenChange(val) {
                this.isFullscreen = val
            },

            handleToggle() {
                this.$refs['fullscreen'].toggle() 
            }
        },

        mounted() {
            this.initAMap()
        }
    }
</script>

<style lang="scss" scoped>
    .home__otherstaff {
        .maplayer__header {
            position: absolute;
            top: 0;
            right: 0;
            overflow: hidden;
            padding: 0 16px;
            box-sizing: border-box;
            z-index: 11;

            &__flex {
                display: flex;
                width: 100%;
                height: 56px;
                align-items: center;

                &__form {
                    flex: 1;
                    margin-right: 16px;
                }
            }
        }

        .maplayer__content {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 9;
            overflow: hidden
        }

        .maplayer__amap__infowin {
            box-shadow: 3px 3px 5px rgba(0,0,0, .2); 
            
            &__header { 
                padding: 5px 0;
                text-align: right;
                &__btn-close {
                    cursor: pointer;
                    margin: 0 5px;
                }
                background-color:#fff;
            }

            &__content {
                width: 400px; 
                padding: 0 16px 16px;
                position: relative;
                background-color:#fff;
            }

            &__caret__wrap {
                position: absolute;
                left: 50%;
                bottom: -18px;
                margin-left: -15px;

                .el-icon-caret-bottom {
                    font-size: 30px;
                    vertical-align: top;
                    color: #fff;
                }

            }

            &.hideInfoWin {
                transform: translate(0, -9999px)
            }
        }
    }
</style>