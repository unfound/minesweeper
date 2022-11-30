<template>
  <div ref="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import APlayers from 'aplayer'
import 'aplayer/dist/APlayer.min.css'

const emit = defineEmits(['canplay'])

const container = ref()
let ap: any = null
onMounted(() => {
  if (!container.value) {
    return
  }

  ap = new APlayers({
    container: container.value,
    fixed: true,
    autoplay: true,
    loop: 'one',
    volume: 0.5,
    listFolded: true,
    lrcType: 1,
    audio: [{
      name: 'pupetry',
      artist: '无期迷途',
      autoplay: true,
      url: `${import.meta.env.BASE_URL}pupetry.m4a`,
      cover: `${import.meta.env.BASE_URL}5732.jpg`,
      lrc: '[00:00.000] 作词 : 无期迷途\n[00:02.000] 作曲 : 无期迷途\n[00:04.000]\n[00:06.000]\n[00:08.000]尽情挑战吧！'
    }, {
      name: '夏末',
      artist: '无期迷途',
      url: `${import.meta.env.BASE_URL}summer.m4a`,
      cover: `${import.meta.env.BASE_URL}5732.jpg`,
      lrc: '[00:00.000] 作词 : 无期迷途\n[00:02.000] 作曲 : 无期迷途\n[00:04.000]\n[00:06.000]\n[00:08.000]扁面蛸\n[00:09.000]送给\n[00:10.000]鱼鱼\n[00:011.000]不像恋歌的\n[00:012.000]恋歌'
    }]
  })

  ap.on('canplay', () => {
    ap.play()
    emit('canplay', ap)
  })
})

</script>