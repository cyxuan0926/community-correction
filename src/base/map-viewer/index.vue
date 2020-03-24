<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    class="map-dialog"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <div class="map-container" ref="map" />
    <div slot="footer" class="map-dialog-footer">
      <el-button type="primary" @click="onMapClose">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 需要传过来得是地图得配置选项
import { MapLoader } from '@/utils/helper'

export default {
  name: 'MapViewer',

  props: {
    // 对话框的显示
    visible: Boolean,

    // 地图的配置
    mapConfigs: {
      type: Object,
      default: () => ({})
    },

    // 关闭地图
    onMapClose: {
      type: Function,
      default: function() {}
    },

    radius: {
      type: Number,
      default: 300
    }
  },

  data() {
    return {
      // 高德地图的地图类
      map: null
    }
  },

  watch: {
    visible(value) {
      if (value) {
        if (!this.map) this.initAMap()
      } else this.onMapDestroy()
    },

    radius(value) {
      if (value && this.map) this.initAMap()
    }
  },

  methods: {
    // 初始化高德地图组件
    async initAMap() {
      try {
        const {
          circleConfigs = {},
          markerConfigs = {},
          mapClass = {}
        } = this.mapConfigs

        const mapInstance = await MapLoader()

        this.map = new mapInstance.Map(this.$refs.map, {
          zoomEnable: false,
          ...mapClass
        })

        new mapInstance.Circle({
          map: this.map,
          radius: this.radius,
          strokeColor: '#3366ff',
          strokeOpacity: 0.3,
          strokeWeight: 3,
          fillColor: '#ffa500',
          fillOpacity: 0.35,
          ...circleConfigs
        })

        new mapInstance.Marker({
          map: this.map,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
          ...markerConfigs
        })

        this.map.setFitView()
      } catch (err) {
        Promise.reject(err)
      }
    },

    // 关闭对话框 销毁高德地图组件
    onMapDestroy() {
      this.map && this.map.destroy()

      this.map = null
    }
  }
}
</script>

<style lang="scss" scoped>
.map-dialog {
  ::v-deep .el-dialog {
    width: 90%;

    &__header {
      display: none;
    }

    &__footer {
      padding-top: 0px;

      button {
        width: 8%;
      }
    }
  }

  .map-container {
    width: 100%;
    height: 68vh;
  }
}
</style>
