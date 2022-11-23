<template>
    <div ref="container"></div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import APlayers from 'aplayer'
  import 'aplayer/dist/APlayer.min.css'
  
  const container = ref()
  let ap: any = null
  onMounted(() => {
    if (!container.value) {
      return
    }
  
    ap = new APlayers({
      container: container.value,
      fixed: true,
      audio: [{
        name: '夏末',
        artist: '无期迷途',
        autoplay: true,
        url: `${import.meta.env.BASE_URL}summer.m4a`,
        cover: `${import.meta.env.BASE_URL}5732.jpg`
      }]
    })
  
    ap.on('canplay', () => {
    //   ap.play()
    })
  })
  
  </script>
