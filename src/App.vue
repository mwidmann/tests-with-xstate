<template>
  <div id="app" ref="videPlayer">
    <VideoPlayer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VideoPlayer from './components/VideoPlayer.vue'

@Component({
  components: {
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
