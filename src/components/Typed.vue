<template>
  <div style="text-align: left;margin-bottom: 12px;">
    <div id="typed-strings">
      <p>
        在MBCC某个核平的日子里。^500 <br/>
        露维娅蕾在给局长表演节目时，因为局长打了个瞌睡而生气出走。^500 <br/>
        她找来了前不久因偶遇丽莎，进而对丽莎发起了猛烈追求，后被丽莎扭送回MBCC的麦昆帮忙。^500 <br/>
        麦昆利用其能力复制出了多个露维娅蕾引起了管理局一片混乱，而蕾与其分身趁乱纷纷外逃。^500 <br/>
        在夜莺副官的带领下，终于锁定了她们所在的大致位置。^500 <br/>
        而你，作为英明神武，智勇双全，才貌过人的MBCC局长^2000手下的一名小弟。^500 <br/>
        被委派去该区域探索标记蕾的位置，而后通知局长过来进行睡服。^500 <br />
        记住，作为普通人的你是无法与禁闭者蕾正面抗衡的，只需标记其位置即可，途中会有探测器来标识附近蕾的个数，以协助你顺利完成此次行动。^500 <br/>
        该次行动名为————扫蕾行动。
      </p>
    </div>
    <span id="typed"></span>
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, defineEmits } from 'vue'
import Typed from 'typed.js'

const emit = defineEmits(['complete'])
let typed
onMounted(() => {
  typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 50,
    backSpeed: 100,
    backDelay: 2000,
    startDelay: 1000,
    cursorChar: '_',
    smartBackspace: true,
    onComplete: () => {
      emit('complete')
    }
  })
})

</script>
