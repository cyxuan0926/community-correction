<template>
  <div>
    <el-button
      v-bind="button.attrs"
      v-on="button.events"
      v-for="(button, index) in buttonItems"
      :key="'id-repetition-el-button-' + index"
      :data-status="button.authStatus"
    >
      {{ button.text }}
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    buttonItems: {
      type: Array,
      default: () => []
    }
  }
}
</script>
