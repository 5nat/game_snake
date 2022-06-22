import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"

// 游戏控制器, 控制其它的所有的类
class GameControl {
  // 定义三个属性 (蛇, 食物, 记分牌)
  snake: Snake
  food: Food
  scorePanel: ScorePanel

  // 创建一个属性来存储蛇的移动方向(也就是按键的方向)
  direction: string = 'Right'
  // 创建一个属性用来记录游戏是否结束
  isLive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 2)

    this.init()
  }

  // 游戏的初始化方法, 调用后游戏即开始
  init() {
    // 绑定键盘按键按下的事件
    document.addEventListener('keydown', this.keydowmHandler.bind(this))
    // 调用run方法, 使蛇能动
    this.run()
  }

  //创建一个键盘按下的响应函数
  keydowmHandler(event: KeyboardEvent) {
    // 需要检查event.key的值是否合法(用户是否按下了正确的按键)
    // 修改direction的属性
    this.direction = event.key
  }

  // 创建一个控制蛇移动的方法
  run() {
    // 获取蛇的坐标
    let X = this.snake.X
    let Y = this.snake.Y

    // 根据按键的方向修改X值和Y值
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break
      case 'ArrowDown':
        case 'Down':
          Y += 10
          break
      case 'ArrowLeft':
        case 'Left':
          X -= 10
          break
      case 'ArrowRight':
      case 'Right':
          X += 10
          break
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X, Y)

    // 修改蛇的X和Y值
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch(error: any) {
      // 游戏结束
      alert(error.message + 'Game Over')
      // 将isLive设置为false, 否则蛇一直撞墙就会一直报错
      this.isLive = false
    }
    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 定义一个方法, 用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if(X === this.food.X && Y === this.food.Y) {
            // 食物的位置需要进行重置
            this.food.change()
            // 分数增加
            this.scorePanel.addScore()
            // 蛇增加一截-------这里身体每移动
            this.snake.addBody()
    }
  }
}

export default GameControl