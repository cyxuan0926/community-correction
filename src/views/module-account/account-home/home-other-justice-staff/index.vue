<template>
    <div class="home__otherstaff">
        <div class="home__otherstaff__maplayer">
            <div class="maplayer__header">
                <div class="maplayer__header__flex">
                    <div class="maplayer__header__flex__form"></div>
                    <el-button type="primary" @click="toDetail">报表展示</el-button>
                </div>
            </div>
            <div class="maplayer__content" id="homeMap"></div>
            <div class="maplayer__amap__infowin" ref="mapInfoWin" :style="{'visibility': isInfowinOpen ? 'visible' : 'hidden'}">
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
    import { mapGetters } from 'vuex'
    import { getReportMapmarks } from '@/services/api/module-registration'

    export default {
        name: 'home-other-justice-staff',

        components: {
            InfoPanel
        },

        computed: {
            ...mapGetters([
                'account/isJudiciaryAccount',
                'account/isJusticeDepartmentAccount',
                'account/isJusticeBureauAccount',
                'account/isJudiceOfficeAccount'
            ])
        },

        data() {
            return {
                instance: null,
                mapCenterAddress: '中国',
                infoData: {},
                markList: [
                    {   
                        mkid: 1234324423,
                        position: [114.222995, 30.608725]
                    },
                    {
                        mkid: 1234324423,
                        position: [114.329533, 30.620461]
                    },
                    {
                        mkid: 1234324423,
                        position: [114.217745, 30.512932]
                    },
                    {
                        mkid: 1234324423,
                        position: [114.363267, 30.535269]
                    },
                    {
                        mkid: 1234324423,
                        position: [114.407621, 30.49732]
                    }, 
                    {
                        mkid: 1234324423,
                        position: [114.407621, 30.49732]
                    },
                    {
                        mkid: 1234324423,
                        position: [114.427307, 30.606648]
                    },
                    {
                        mkid: 1234324423,
                        position: [113.012181, 28.198226]
                    },
                    {
                        mkid: 1234324423,
                        position: [112.904387, 28.03851]
                    },
                    {
                        mkid: 1234324423,
                        position: [112.592975, 26.884069]
                    },
                    {
                        mkid: 1234324423,
                        position: [112.708859, 26.895487]
                    }
                ],
                desc: '测试测试标题',
                isInfowinOpen: false
            }
        },
        methods: {
            async initAMap() {
                try {
                    const that = this
                    const utilIns = that.instance = AmapUtil.getMapInstance()
                    await utilIns.loadMap({id: 'homeMap'})
                    await utilIns.loadPlugin('Geocoder')

                    that.markList = await getReportMapmarks()

                    utilIns
                    .addDistrictLayerWorld()
                    .addDistrictLayerCountry()
                    .addInfoWindow({
                        content: that.$refs.mapInfoWin,
                        offset: new AMap.Pixel(0, -48),
                        isCustom: true,
                        closeWhenClickMap: true
                    })
                    .addMarks(that.markList)
                    .bindMarkEvent('click', (e) => {
                        const pos = e.target._position
                        utilIns.infoWindow.open( utilIns.map, pos )
                        if( utilIns.currentZoom >= utilIns.maxZoom ) {
                            utilIns.map.setCenter(pos, false, 400 )
                        }else {
                            utilIns.map.setZoomAndCenter(utilIns.maxZoom, pos, false, 400 )
                        }
                        that.isInfowinOpen = true
                    })
                    .bindMapEvent('zoomchange', debounce((e) => {
                        if( (utilIns.currentZoom = utilIns.map.getZoom()) >=  utilIns.maxZoom - 2) {
                            utilIns.hideDistrictLayer()
                        }else {
                            utilIns.showDistrictLayer()
                        }
                    }, 300))
                    this.isJudiciaryAccount = true
                    if( !this.isJudiciaryAccount ) {
                        const location = await utilIns.getLocation(this.mapCenterAddress)
                        this.mapCenterAddress = location && location.length && location[0].adcode
                        utilIns.addDistrictLayerProvince({
                            adcode: [this.mapCenterAddress]
                        })
                    }
                    utilIns.setCity(this.mapCenterAddress)

                } catch (err) {
                    Promise.reject(err)
                }
            },

            handleInfowinClose() {
                this.instance.infoWindow.close()
            },

            toDetail() {
                this.$router.push(routesPath.REGISTRATION)
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
            left: 0;
            width: 100%;
            overflow: hidden;
            background-color: #fff;
            padding: 0 16px;
            box-sizing: border-box;

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
            top: 56px;
            left: 0;
            bottom: 0;
            width: 100%;
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
        }
    }
</style>