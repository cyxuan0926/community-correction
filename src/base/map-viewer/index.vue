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
import AmapUtil from '@/utils/helper'

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
        if (!this.map) {
          this.$nextTick(function() {
            this.initAMap()
          })
        }
      } else this.onMapDestroy()
    },

    radius(value) {
      if (value && this.map) {
        this.$nextTick(function() {
          this.initAMap()
        })
      }
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

        const utilIns = await AmapUtil.getMapInstance().loadMap({
          id: this.$refs.map,
          zoomEnable: false,
          ...mapClass
        })
        
        utilIns
        .addCircle({
          radius: this.radius,
          ...circleConfigs
        })
        .addMarks({
          config: markerConfigs
        })
        .setFitView()

        //this.map = utilIns.map

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
    width: 64%;

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
