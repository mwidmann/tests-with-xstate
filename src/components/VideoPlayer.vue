<template>
  <div class="container">
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
        :elapsed="current.context.elapsed"
        :duration="current.context.duration"
      />
      <PlayPauseButton :current="current" :send="send" />
      <Timer
        :elapsed="current.context.elapsed"
        :duration="current.context.duration"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { interpret } from 'xstate'
import PlayPauseButton from './PlayPauseButton.vue'
import ElapsedBar from './ElapsedBar.vue'
import Timer from './Timer.vue'
import { videoMachine, videoMachineActions } from '../statemachine/VideoMachine'

@Component({
  components: {
    PlayPauseButton,
    ElapsedBar,
    Timer,
  },
})
export default class VideoPlayer extends Vue {
  private videoService = interpret(
    videoMachine.withConfig({
      actions: {
        ...videoMachineActions,
      },
    })
  )
  private current: any = videoMachine.initialState

  get isInPlayableState() {
    return ['paused', 'playing', 'ended'].some((subState) =>
      this.current.matches({ ready: subState })
    )
  }

  // start the videoService on component creation
  created() {
    this.videoService
      .onTransition((state: any) => {
        this.current = state
      })
      .start()
  }

  // send events to the service
  send(event: any, p: any) {
    console.log(event)
    this.videoService.send(event, p)
  }
}
</script>
