<template>
  <el-image lazy :src="url" :alt="title" @click.native="showImg" />
</template>

<script>
import Viewer from 'viewerjs'

export default {
  props: {
    url: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: '图片'
    },

    // 工具条
    toolbar: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    showImg() {
      const commonToolbar = {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 1,
        reset: 1,
        prev: 0,
        play: 1,
        next: 0,
        rotateLeft: 1,
        rotateRight: 1,
        flipHorizontal: 1,
        flipVertical: 1
      }
      const toolbar = Object.assign({}, commonToolbar, this.toolbar)
      return new Viewer(this.$el.parentNode, {
        title: false,
        navbar: false,
        zIndex: 100000000,
        // 工具条配置
        toolbar,
        hidden: function() {
          this.viewer.destroy()
        },
        url: this.url
      })
    }
  }
}
</script>
