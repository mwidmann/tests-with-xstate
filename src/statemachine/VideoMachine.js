import { Machine, assign } from 'xstate'

export const videoMachine = Machine({
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

const setVideo = assign({
  video: (_context, event) => event.video,
  duration: (_context, event) => event.video.duration,
  elapsed: (context) => context.elapsed,
})

const setElapsed = assign({
  elapsed: (context) => context.video.currentTime || 0,
  video: (context) => context.video,
  duration: (context) => context.duration,
})

const playVideo = (context) => {
  context.video?.play()
}

const pauseVideo = (context) => {
  context.video?.pause()
}

const restartVideo = (context) => {
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
