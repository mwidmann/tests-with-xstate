<template>
  <span class="timer">
    {{ currentTimer }}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { minutes, seconds } from './utils'

@Component
export default class Timer extends Vue {
  @Prop({ type: Number, required: true }) readonly elapsed!: number
  @Prop({ type: Number, required: true }) readonly duration!: number

  get currentTimer() {
    return `${minutes(this.elapsed)}:${seconds(this.elapsed)} of ${minutes(
      this.duration
    )}:${seconds(this.duration)}`
  }
}
</script>

<style>
.timer {
  display: inline-block;
  margin-left: 5px;
}
</style>
