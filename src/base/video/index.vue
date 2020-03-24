<template>
  <div class="video">
    <div class="video-placeholder" v-if="!videoUrl">
      <i class="iconfont icon-video" />
    </div>
    <video controls v-else>
      <source :src="videoUrl" type="video/mp4" />
      <source :src="videoUrl" type="video/webm" />
      <source :src="videoUrl" type="video/ogg" />
      您的浏览器不支持Video标签。
    </video>
  </div>
</template>
<script>
export default {
  props: {
    videoUrl: String
  }
}
</script>

<style lang="scss" scoped>
.video {
  overflow: hidden;

  video {
    width: 100%;
    cursor: pointer;
  }

  &-placeholder {
    width: 100%;
    text-align: center;
    color: #8c8080;
    background-color: #e5e5e5;

    .iconfont {
      font-size: 28px;
    }
  }
}
</style>
