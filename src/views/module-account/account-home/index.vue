<template>
  <div class="home">
      <home-justice-staff v-if="isJusticeStaff" />
      <home-other-justice-staff v-else />
  </div>
</template>

<script>
  import homeJusticeStaff from './home-justice-staff/index.vue'
  import homeOtherJusticeStaff from './home-other-justice-staff/index.vue'

  export default {
    name: 'home',

    components: {
      homeJusticeStaff,
      homeOtherJusticeStaff
    },

    data() {
      return {
        isJusticeStaff: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>