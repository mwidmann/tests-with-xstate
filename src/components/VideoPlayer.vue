<template>
  <div class="container flex mx-auto mt-10 items-stretch">
    <div class=" w-1/2">
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

    <History
      :history="history.slice(-5).reverse()"
      class="w-1/2 p-10"
    ></History>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { interpret } from 'xstate'
import PlayPauseButton from './PlayPauseButton.vue'
import ElapsedBar from './ElapsedBar.vue'
import Timer from './Timer.vue'
import History from './History.vue'
import { videoMachine, videoMachineActions } from '../statemachine/VideoMachine'
interface HistoryObject {
  event: string
  from: string
  target: string
  context: any
  count: number
}

@Component({
  components: {
    PlayPauseButton,
    ElapsedBar,
    Timer,
    History,
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
  private history: HistoryObject[] = []

  get isInPlayableState() {
    return ['paused', 'playing', 'ended'].some((subState) =>
      this.current.matches({ ready: subState })
    )
  }

  created() {
    this.videoService
      .onTransition((state: any) => {
        this.updateHistory(state)
        this.current = state
      })
      .start()
  }

  // send events to the service
  send(event: any, p: any) {
    console.log(event)
    this.videoService.send(event, p)
  }

  updateHistory(state: any) {
    const { _event, transitions, context } = state
    const last = this.history[this.history.length - 1]
    if (last && last.event === _event.name) {
      last.count++
      last.context = context
    } else {
      this.history.push({
        event: _event.name,
        from: transitions.length ? transitions[0].source.key : '',
        target: state.value,
        context: context,
        count: 1,
      })
    }
  }
}
</script>

<style>
.opacity-on {
  animation: animate-opacity 0.2s ease-in;
}

@keyframes animate-opacity {
  0% {
    opacity: 0.25;
  }
  100% {
    opacity: 1;
  }
}
</style>
