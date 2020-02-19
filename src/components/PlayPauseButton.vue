<template>
  <span>
    <button v-if="isPlaying" @click="send('PAUSE')">
      Pause
    </button>
    <button v-else @click="send('PLAY')">
      Play
    </button>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PlayPauseButton extends Vue {
  @Prop({ type: Object, required: true }) readonly current!: any
  @Prop({ type: Function, required: true }) readonly send!: (
    event: string
  ) => {}

  beforeMount() {
    console.log(`Current`, this.current)
  }

  get isPlaying() {
    return this.current.matches({ ready: 'playing' })
  }
}
</script>

<style>
button {
  background: #a8dba8;
  padding: 0.25rem 0.5rem;
  border: none;
  cursor: pointer;
}
</style>
