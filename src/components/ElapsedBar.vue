<template>
  <div class="elapsed">
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
  transition: width 0.5 ease;
  height: 5px;
  background-color: #629460;
}
</style>
