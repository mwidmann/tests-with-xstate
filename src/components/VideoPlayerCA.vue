<template>
  <div class="container">
    <h1>vue composition-api</h1>

    <video
      ref="videoPlayer"
      @canplay="send('LOADED', { video: $refs.videoPlayer })"
      @timeupdate="send('TIMING')"
      @ended="send('END')"
      @error="send('FAIL')"
    >
      <source src="../assets/fox.mp4" type="video/mp4" />
    </video>
    <div v-if="isInPlayableState">
      <ElapsedBar
        :elapsed="state.context.elapsed"
        :duration="state.context.duration"
      />
      <PlayPauseButton :current="state" :send="send" />
      <Timer
        :elapsed="state.context.elapsed"
        :duration="state.context.duration"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import { useMachine } from '@xstate/vue'

import { videoMachine, videoMachineActions } from '../statemachine/VideoMachine'
import PlayPauseButton from './PlayPauseButton.vue'
import ElapsedBar from './ElapsedBar.vue'
import Timer from './Timer.vue'

export default createComponent({
  components: {
    PlayPauseButton,
    ElapsedBar,
    Timer,
  },

  setup() {
    const { state, send } = useMachine(videoMachine, {
      actions: videoMachineActions,
    })

    const isInPlayableState = computed(() =>
      ['paused', 'playing', 'ended'].some((subState) =>
        state.value.matches({ ready: subState })
      )
    )

    return {
      state,
      send,
      isInPlayableState,
    }
  },
})
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
}
video {
  max-width: 100%;
  margin-bottom: -3px;
}
</style>
