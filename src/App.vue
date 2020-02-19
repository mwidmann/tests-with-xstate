<template>
  <div id="app" ref="videPlayer">
    <VideoPlayerCA />
    <VideoPlayer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VideoPlayerCA from './components/VideoPlayerCA.vue'
import VideoPlayer from './components/VideoPlayer.vue'

@Component({
  components: {
    VideoPlayerCA,
    VideoPlayer,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
}
</style>
