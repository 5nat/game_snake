//  定义表示计分牌的类
class ScroePanel {
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement

  // 设置一个变量限制等级
  maxLevel: number
  // 设置一个变量表示多少分时升级
  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 设置一个加分的方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    // 判断分数多少
    if (this.score % this.upScore === 0) {
      this.levelUP()
    }
  }
  // 提示等级的方法-----由加分的控制
  levelUP() {
    if (this.level < this.maxLevel) {
      this.level++
      this.levelEle.innerHTML = this.level + ''
    }
  }
}

export default ScroePanel

// 测试代码
// const scorePanel = new ScroePanel(20)
// for (let i = 0; i < 20; i++) {
//   scorePanel.addScore()
// }
