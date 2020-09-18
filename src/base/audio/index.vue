<template>
  <div class="audio">
    <!-- <div class="audio-placeholder" v-if="!audioUrl">
      <i class="iconfont icon-audio" />
    </div> -->
    <div v-if="audioUrl" class="audio-container">
      <img v-if="audioImg === 3" :src="audioIcon" alt="音频" @click="onPlay" />
      <img
        v-if="audioImg === 1"
        :src="audioNo"
        alt="音频播放最开始"
        @click="onPlay"
      />
      <img
        v-if="audioImg === 2"
        :src="audioOne"
        alt="音频播放过程中"
        @click="onPlay"
      />

      <div class="audio-container-source">
        <div
          class="source-progress_bar"
          :style="{ width: progressBarVal + '%' }"
        />
        <audio
          ref="audio"
          @timeupdate="onTimeUpdate"
          @loadedmetadata="onGetTotalDuration"
        >
          <source :src="audioUrl" type="audio/mp3" />
          <source :src="audioUrl" type="audio/ogg" />
          <source :src="audioUrl" type="audio/mpeg" />
          您的浏览器不支持Audio标签
        </audio>
      </div>
      <div class="audio-container-duration">
        <span>{{ duration }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import audioIcon from '@/assets/img/audio-icon.png'
import audioOne from '@/assets/img/audio-one.png'
import audioNo from '@/assets/img/audio-no.png'
import Moment from 'moment'

export default {
  props: {
    audioUrl: String
  },

  data() {
    return {
      duration: null,
      progressBarVal: 0,
      audioImg: 3,
      interval: null,
      audioIcon,
      audioOne,
      audioNo
    }
  },

  methods: {
    onTimeUpdate() {
      if (!this.$refs.audio) return
      let totalDuration = parseInt(this.$refs.audio.duration)
      let currentTime = parseInt(this.$refs.audio.currentTime)
      this.duration = this.onFormatDuration(totalDuration - currentTime)
      if (
        this.$refs.audio.currentTime / this.$refs.audio.duration === 1 ||
        this.$refs.audio.ended
      ) {
        this.progressBarVal = 0
        this.interval && clearInterval(this.interval)
        this.audioImg = 3
        this.duration = this.onFormatDuration(totalDuration)
      } else {
        this.progressBarVal = (currentTime / totalDuration) * 100
      }
    },

    onPlay() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        let index = 0
        this.interval = setInterval(() => {
          this.audioImg = index + 1
          index++
          if (index > 2) index = 0
        }, 1000)
      } else {
        this.$refs.audio.paused()
        clearInterval(this.interval)
        this.audioImg = 3
      }
    },

    onGetTotalDuration() {
      if (
        this.$refs.audio &&
        this.$refs.audio.duration &&
        !isNaN(this.$refs.audio.duration)
      ) {
        this.duration = this.onFormatDuration(this.$refs.audio.duration)
      }
    },

    onFormatDuration(seconds) {
      const m = Moment.duration(seconds, 's').minutes()
      const s = Moment.duration(seconds, 's').seconds()
      const prem = m < 10 ? `0${m}` : m
      const pres = s < 10 ? `0${s}` : s
      return `${prem}:${pres}`
    }
  }
}
</script>
<style lang="scss" scoped>
.audio {
  display: flex;
  align-items: center;
  &-container {
    display: flex;
    width: 97%;
    height: 36px;
    justify-content: flex-start;
    align-items: center;
    background-color: rgba(235, 235, 235, 1);
    padding: 0 4px;
    border-radius: 4px;

    &-source {
      width: calc(100% - 70px);
      height: 10px;
      border: 1px solid #2b569a;
      margin: 0px auto;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding: 0px 4px;

      .source-progress_bar {
        height: 2px;
        background-color: #264c90;
      }
    }

    &-duration {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }

  img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    cursor: pointer;
  }

  &-placeholder {
    width: 100%;
    text-align: center;
    background-color: rgba(235, 235, 235, 1);
    border-radius: 4px;

    .iconfont {
      font-size: 20px;
    }
  }
}
</style>
