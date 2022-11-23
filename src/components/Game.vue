<template>
    <!-- <var-chip :round="false" type="info" block style="margin-bottom: 12px">标记所有地雷即可通关</var-chip> -->
    <header class="header">
      <var-space justify="end">
        <!-- <var-button @click="handleClick" type="primary">切换难度</var-button> -->
        <var-button @click="handleClick" type="primary">
          <var-icon name="refresh" />
        </var-button>
      </var-space>
    </header>
    <div class="mines">
      <div class="row" v-for="(row, rowIdx) in cells">
        <div class="col" v-for="(cell, colIdx) in row" :key="cell.id">
          <span v-if="cell.isFlag && !cell.isSweeped">
            <img src="../assets/flag.png" style="height: 42px;width: 42px;" />
          </span>
          <span v-else-if="cell.isSweeped">
            <span v-if="cell.value === 0"></span>
            <img v-else-if="cell.value === 'mine'" src="../assets/lei.jpg" style="height: 42px;width: 42px;" />
            <span v-else>{{cell.value}}</span>
          </span>
          <var-menu v-else :offset-x="8" :offset-y="8">
            <img src="../assets/cell2.png" style="height: 42px;width: 42px;" />
            <template #menu>
              <var-cell @click="sweep(cell, rowIdx, colIdx)">打开</var-cell>
              <var-cell @click="plantFlag(cell)">标记</var-cell>
            </template>
          </var-menu>
        </div>
      </div>
    </div>
  
    <var-dialog
      v-model:show="cardVisible"
      :cancel-button="false"
      @confirm="confirm"
    >
      <p>你很幸运，踩到了空白地块。答对题可以解锁周围所有地块~</p>
      <span>{{question.title}}</span>
      <var-radio-group v-model="answer">
        <var-radio v-for="opt in question.options" :checked-value="opt">{{opt}}</var-radio>
      </var-radio-group>
    </var-dialog>
    <var-dialog
      v-model:show="winVisible"
      :cancel-button="false"
      @confirm="winConfirm"
    >
      <p>你遇到了露薇娅·蕾，然后被征服了（物理意义上的）</p>
      <div style="text-align: center;">
        <img src="../assets/lei.jpg" style="height: 80px;width: 80px;" />
      </div>
    </var-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Snackbar } from '@varlet/ui'
  
  type CellValue = number | 'mine'
  interface MapsOpt {
    rows: number
    cols: number
    mineNum: number
  }
  
  let id = 0
  
  class Cell {
    id: number = id++
    isSweeped: boolean = false
    isFlag: boolean = false
    constructor (public value: CellValue = 0) {}
  }
  
  class Maps {
    value?: Cell[][]
    mines: Cell[] = []
    constructor (public opt: MapsOpt) {}
  
    create () {
      let { rows, cols, mineNum } = this.opt
      this.value = []
      const arr: Cell[] = []
      this.mines = []
      for (let i = 0; i < rows * cols; i++) {
        arr.push(new Cell())
        if (i < mineNum) {
          arr[i].value = 'mine'
          this.mines.push(arr[i])
        }
      }
      shuffle(arr)
      shuffle(arr)
      for (let row = 0; row < rows; row++) {
        const start = row * cols
        this.value.push(arr.slice(start, start + cols))
      }
  
      const cells = this.value
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          cells[row][col].value = this.countMineNum(row, col, cells)
        }
      }
  
      return this.value
    }
  
    countMineNum (x: number, y: number, cells: Cell[][]): CellValue {
      if (cells[x][y].value === 'mine') {
        return 'mine'
      }
      return (
        hasMine(x, y - 1, cells)
        + hasMine(x, y + 1, cells)
        + hasMine(x - 1, y, cells)
        + hasMine(x - 1, y - 1, cells)
        + hasMine(x - 1, y + 1, cells)
        + hasMine(x + 1, y, cells)
        + hasMine(x + 1, y - 1, cells)
        + hasMine(x + 1, y + 1, cells)
      )
    }
  }
  
  function hasMine (x: number, y: number, cells: Cell[][]) {
    if (x < 0 || y < 0 || x >= cells.length || y >= cells[0].length) {
      return 0
    }
    if (cells[x][y] && cells[x][y].value === 'mine') {
      return 1
    }
    return 0
  }
  
  function shuffle (arr: any[]) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const index = Math.floor((i + 1) * Math.random())
      ;[arr[index], arr[i]] = [arr[i], arr[index]]
    }
    return arr
  }
  
  function checkSides (x: number, y: number, cells: Cell[][], checkedList: number[]) {
    const cur = cells[x][y]
    if (checkedList.includes(cur.id)) return;
    cur.isSweeped = true
    cur.isFlag = false
    checkedList.push(cur.id)
    shuldCheck(x, y - 1)
    shuldCheck(x, y + 1)
    shuldCheck(x - 1, y)
    shuldCheck(x - 1, y - 1)
    shuldCheck(x - 1, y + 1)
    shuldCheck(x + 1, y)
    shuldCheck(x + 1, y - 1)
    shuldCheck(x + 1, y + 1)
  
    function shuldCheck (x: number, y: number) {
      if (x < 0 || y < 0 || x >= cells.length || y >= cells[0].length) return;
      const cur = cells[x][y]
      if (cur && !cur.isFlag && !cur.isSweeped) {
        if (cur.value === 0) {
          checkSides(x, y, cells, checkedList)
        } else {
          cur.isSweeped = true
          cur.isFlag = false
        }
      }
    }
  }
  
  const questionBank = [
    {
      title: '蕾的职业是',
      options: ['演员', '歌姬'],
      answer: '演员'
    }, {
      title: '卓亚爆发黑环是几号黑环',
      options: ['br-001', 'br-002', 'br-004', 'br-000'],
      answer: 'br-004'
    }, {
      title: '哈梅尔所在黑环是几号',
      options: ['br-000', 'br-001', 'br-002', 'br-004'],
      answer: 'br-001'
    }
  ]
  
  export default defineComponent({
    setup() {
      let pointer = {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0
      }
      const answer = ref('')
      let questionId = 0
      const question = ref(questionBank[questionId++])
  
      const cardVisible = ref(false)
      function confirm () {
        if (answer.value === question.value.answer) {
          checkSides(pointer.x, pointer.y, cells.value, [])
        } else {
          Snackbar.error('很可惜，答错啦~')
          const cell = cells.value[pointer.x][pointer.y]
          cell.isSweeped = true
          cell.isFlag = false
        }
        if (questionId >= questionBank.length) {
            questionId = 0
          }
          question.value = questionBank[questionId++]
      }

      const winVisible = ref(false)
      function winConfirm () {
        winVisible.value = false
        handleClick()
      }
  
      const maps = new Maps({
        rows: 12,
        cols: 8,
        mineNum: 18
      })
  
      let cells = ref(maps.create())
  
      function handleClick () {
        cells.value = maps.create()
      }
  
      function sweep (cell: Cell, x: number, y: number) {
        pointer = {
          x: x,
          y: y,
          lastX: pointer.x,
          lastY: pointer.y
        }
        if (cell.isSweeped) {
          return
        }
        if (cell.value === 'mine') {
          cell.isSweeped = true
          cell.isFlag = false
          winVisible.value = true
          return
        }
        if (cell.value === 0) {
          cardVisible.value = true
          return
        }
        cell.isSweeped = true
        cell.isFlag = false
        checkIsWin()
      }
  
      function plantFlag (cell: Cell) {
        if (cell.isSweeped) return;
        cell.isFlag = !cell.isFlag
        checkIsWin()
      }
  
      function checkIsWin () {
        if (isWinner(maps.mines)) {
          alert('赢啦！棒棒！')
          handleClick()
        }
      }
  
      function isWinner (mines: Cell[]) {
        return mines.every(mine => mine.isFlag)
      }
  
      return {
        cells,
        handleClick,
        plantFlag,
        sweep,
        confirm,
        cardVisible,
        Snackbar,
        answer,
        question,
        winVisible,
        winConfirm
      };
    }
  });
  </script>
  
  <style>
  body {
    margin: 0;
  }
  
  #app {
    text-align: center;
    max-width: 720px;
    margin: 0 auto;
    padding: 12px;
  }
  
  .header {
    width: 352px;
    margin: 0 auto;
    margin-bottom: 12px;
  }
  
  .row {
    display: flex;
    justify-content: center;
  }
  .col {
    width: 42px;
    height: 42px;
    line-height: 42px;
  }
  
  .row > .col {
    border-right: 1px solid #d3c9c9;
    border-bottom: 1px solid #d3c9c9;
    cursor: pointer;
  }
  
  .row > .col:first-child {
    border-left: 1px solid #d3c9c9;
  }
  
  .row:first-child > .col{
    border-top: 1px solid #d3c9c9;;
  }
  
  /* 待删 */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  
  .modal .masker {
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    width: 100%;
  }
  
  .modal .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  
  .modal .wrapper .content {
    position: relative;
    top: 160px;
    width: 320px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    text-align: left;
  }
  
  .var-cell {
    cursor: pointer;
  }
  </style>
