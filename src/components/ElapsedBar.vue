<template>
  <div class="elapsed mb-2">
    <div class="elapsed-bar" :style="{ width: `${percentage}%` }"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { percentage } from './utils'

@Component
export default class ElapsedBar extends Vue {
  @Prop({ type: Number, required: true }) readonly elapsed!: number
  @Prop({ type: Number, required: true }) readonly duration!: number

  get percentage() {
    return percentage(this.duration, this.elapsed)
  }
}
</script>

<style>
.elapsed {
  width: 100%;
  height: 5px;
}
.elapsed-bar {
  @apply transition-all duration-500 bg-green-500;
  height: 5px;
}
</style>
