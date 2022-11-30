<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue'
import Game from './components/Game.vue';
import APlayer from './components/APlayer.vue';
import Typed from './components/Typed.vue';

const active = ref(0)
function nextScene() {
  active.value = 1
}
const canNext = ref(false)
function typedComplete() {
  canNext.value = true
}
let aplayer: any
function onCanplay (ap: any) {
  aplayer = ap
}

function win () {
  aplayer && aplayer.list.switch(1)
}

function afterWin () {
  aplayer && aplayer.list.switch(0)
}
</script>

<template>
  <var-tabs-items v-model:active="active">
    <var-tab-item>
      <Typed @complete="typedComplete" />
      <var-space justify="center">
        <var-button v-if="canNext" @click="nextScene" type="primary">开始追捕</var-button>
      </var-space>
    </var-tab-item>
    <var-tab-item>
      <Game @win="win" @afterWin="afterWin"/>
    </var-tab-item>
  </var-tabs-items>
  <APlayer v-if="active === 1" @canplay="onCanplay"/>
</template>

<style>
html,
body,
#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

#app {
  transform: translate(0, 0);
  max-width: 360px;
  margin: 0 auto;
  padding: 12px;
  background: #f9f3f3;
}

.var-swipe {
  height: 100%;
}
</style>
