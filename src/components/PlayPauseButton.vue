<template>
  <span>
    <button v-if="isPlaying" @click="send('PAUSE')" class="button">
      Pause
    </button>
    <button v-else @click="send('PLAY')" class="button">
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
.button {
  @apply px-2 py-1 text-white bg-green-500;
}
</style>
