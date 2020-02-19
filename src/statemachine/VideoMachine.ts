import { Machine, assign, ActionFunction, AssignAction } from 'xstate'

interface VideoMachineSchema {
  states: {
    loading: {}
    ready: {
      states: {
        paused: {}
        playing: {}
        ended: {}
      }
    }
    failure: {}
  }
}

export type VideoMachineEvent =
  | { type: 'LOADED'; video: HTMLVideoElement; duration: number }
  | { type: 'FAIL' }
  | { type: 'PLAY' }
  | { type: 'TIMING'; elapsed: number }
  | { type: 'PAUSE' }
  | { type: 'END' }

interface VideoMachineContext {
  video: HTMLVideoElement
  duration: number
  elapsed: number
}

export const videoMachine = Machine<
  VideoMachineContext,
  VideoMachineSchema,
  VideoMachineEvent
>({
  key: 'video',
  initial: 'loading',

  context: {
    video: document.createElement('video'),
    duration: 0,
    elapsed: 0,
  },

  states: {
    loading: {
      on: {
        LOADED: {
          target: 'ready',
          actions: ['setVideo'],
        },
        FAIL: 'failure',
      },
    },
    ready: {
      initial: 'paused',
      states: {
        paused: {
          on: {
            PLAY: {
              target: 'playing',
              actions: ['setElapsed', 'playVideo'],
            },
          },
        },
        playing: {
          on: {
            TIMING: {
              target: 'playing',
              actions: ['setElapsed'],
            },
            PAUSE: {
              target: 'paused',
              actions: ['setElapsed', 'pauseVideo'],
            },
            END: 'ended',
          },
        },
        ended: {
          on: {
            PLAY: {
              target: 'playing',
              actions: ['restartVideo'],
            },
          },
        },
      },
    },
    failure: {
      type: 'final',
    },
  },
})

const setVideo: AssignAction<VideoMachineContext, VideoMachineEvent> = assign({
  video: (_context: VideoMachineContext, event: any) => event.video,
  duration: (_context: VideoMachineContext, event: any) => event.video.duration,
  elapsed: (context: VideoMachineContext) => context.elapsed,
})

const setElapsed = assign({
  elapsed: (context: VideoMachineContext) => context.video.currentTime || 0,
  video: (context: VideoMachineContext) => context.video,
  duration: (context: VideoMachineContext) => context.duration,
})

const playVideo: ActionFunction<VideoMachineContext, VideoMachineEvent> = (
  context: VideoMachineContext,
  _event: any
) => {
  context.video?.play()
}

const pauseVideo: ActionFunction<VideoMachineContext, VideoMachineEvent> = (
  context: VideoMachineContext,
  _event: any
) => {
  context.video?.pause()
}

const restartVideo: ActionFunction<VideoMachineContext, VideoMachineEvent> = (
  context: VideoMachineContext,
  _event: any
) => {
  if (!context.video) return
  context.video.currentTime = 0
  context.video.play()
}

export const videoMachineActions = {
  setVideo,
  setElapsed,
  playVideo,
  pauseVideo,
  restartVideo,
}
