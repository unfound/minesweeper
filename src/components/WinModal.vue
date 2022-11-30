<template>
  <var-dialog title="恭喜鱼鱼通关啦~~" :show="show" :cancel-button="false" :close-on-click-overlay="false" @confirm="onConfirm"
    :confirm-button="canConfirm" @opened="onOpened" @closed="onClosed">
    <div style="text-align: left;margin-bottom: 12px;max-height: 380px;overflow-y: auto;pointer-events: auto;">
      <div id="typed-strings-win" style="opacity: 0;height:0;">
        <p>
          不知道鱼鱼小游戏是否玩的开心？如果能给你带来一丝丝快乐的话，也就不枉我这些时日死去的脑细胞了。^1000<br />
          鱼鱼觉得能否仅通过话语来了解一个人进而喜欢一个人呢？我觉得是有点困难的，我希望自己喜欢的是实实在在的具体的人，而不是自己内心具象出来的人。所以，我写下了这段话，想要更加靠近你了解你。^1000<br />
          无论是鱼鱼的照片，还是鱼鱼的声音，亦或是鱼鱼和我交流的时候表现出来的某种特质，我都很喜欢，但这种喜欢就像蒲公英一样，轻飘飘的，无法落于具体的某个实体上。我很犹豫也很迷茫，该怎么做才好呢？要是这种喜欢的情感更加热烈一点让自己义无反顾就好了。但我无法欺骗自己，也无法欺骗你。^1000<br />
          我陷入了僵局，无论是前进还是后退都令我苦恼不已。一方面我不知道该怎么前进，该用什么样的理由去说想要见你这样的话。但另一方面我又觉得我大概是看到鱼鱼就会喜欢上你的吧，这样的想法在脑海里一直萦绕。虽然我一直认为，没有谁对谁来说是唯一不可替代的，但我也不想错过这份来之不易的缘分。^1000<br />
          我想要打破僵局，所以，我决定向前迈进一步，我想要告诉鱼鱼，我希望拉近我们之间的距离，我想要更加靠近你，更加喜欢你，以及在合适的时候，我想要见你。^1000<br />
          总觉得又说了很多羞耻的话啊哈哈，但这就是我现在的想法，鱼鱼又是怎么想的呢？我已经迈进一步说出自己的心意，决定结局走向的关键钥匙就交到鱼鱼手里啦~ ^1000<br />
          我知道，在你说出可能要来杭州后，我再说出这样的话，有点乘人之危的感觉。但鱼鱼应该能够明白，这些东西并不是一两天就能准备好的，而是我早就计划好的。^1000<br />
          所以，鱼鱼只需考虑自己的心情就好，不管你的回答如何，我想我们短期内的状态大概也不会发生太大的改变。对于你的事，我都会尽力帮忙的，不用担心~ ^1000 <br />
          愿你今后始终能够幸福快乐。
        </p>
      </div>
      <span id="typed-win"></span>
    </div>
  </var-dialog>
</template>
  
<script setup lang="ts">
import Typed from 'typed.js'
import { ref } from 'vue';

defineProps(['show'])
const emit = defineEmits(['update:show', 'confirm'])
const canConfirm = ref(false)

function onConfirm() {
  emit('confirm')
  emit('update:show', false)
}
let typed: Typed

function onOpened() {
  typed = new Typed('#typed-win', {
    stringsElement: '#typed-strings-win',
    typeSpeed: 120,
    backSpeed: 100,
    backDelay: 2000,
    startDelay: 1000,
    cursorChar: '♥',
    smartBackspace: true,
    onComplete: () => {
      canConfirm.value = true
    }
  })
}

function onClosed() {
  if (typed) {
    typed.destroy()
  }
}

</script>