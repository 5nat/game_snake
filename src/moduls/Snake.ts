// 定义一个蛇类
class Snake {
  // 蛇的容器
  element: HTMLElement
  // 表示蛇头的元素
  head: HTMLElement
  // 表示蛇的身体(包括蛇头)
  bodies: HTMLCollection


  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.element.getElementsByTagName('div')
  }

  // 获取蛇头的X轴坐标
  get X() {
    return this.head.offsetLeft
  }
  // 获取蛇头的Y轴坐标
  get Y() {
    return this.head.offsetTop
  }

  // 设置蛇头的坐标
  set X(value: number) {

    // 如果新值和旧值相同, 则直接返回不宰修改
    if (this.X === value) return

    // X值的合法范围 0-299 之间
    if (value < 0 || value > 290) {
      //进入判断说明蛇撞墙了, 抛出一个错误
      throw new Error('蛇撞墙了')
    }

    // 修改X时, 是在修改水平坐标, 蛇在左右移动, 左移时不能右移;右移时不能左移
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // 如果发送了掉头, 让蛇反方向移动
      if (value > this.X) { // 左走时右掉
        value = this.X - 10
      } else {  // 右走时左掉
        value = this.X + 10
      }
    }

    // 移动身体
    this.moveBody()

    this.head.style.left = value + 'px'
    // 检查有没有撞到自己
    this.checkHeadBody()
  }
  set Y(value: number) {

        // 如果新值和旧值相同, 则直接返回不宰修改
    if (this.Y === value) return

        // Y值的合法范围 0-299 之间
    if (value < 0 || value > 290) {
      //进入判断说明蛇撞墙了, 抛出一个错误
      throw new Error('蛇撞墙了')
    }

    // Y轴上 掉头判断
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {   // 上走时下掉
        value = this.Y - 10
      } else {  // 下走时上掉
        value = this.Y + 10
      }
    }
    
    // 移动身体
    this.moveBody()

    this.head.style.top = value + 'px'
    // 检查有没有撞到自己
    this.checkHeadBody()
  }

  // 蛇增加身体的方法
  addBody() {
    // 向element中添加一个div      beforeend--结束标签之前的位置
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  // 添加一个蛇身体移动的方法  (核心: 后一截去前一截的位置)-->从后往前改; 从前往后改,前一截的位置会没
  moveBody() {
    // 将后面的身体设置为前面身体的位置
    //      遍历获取所有的身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体的位置 ----()  []  开头的代码上一语句要加分号
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 检查头与身体有没有相撞
  checkHeadBody() {
    // 获取所有的身体,检查有没有与头的坐标重复
    for (let i = 1; i < this.bodies.length; i++) {
      let X = (this.bodies[i] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i] as HTMLElement).offsetTop;
      if (X === this.X && Y === this.Y) {
        // 抛出异常
        throw new Error('撞到自己了')
      }
    }
  }
}

const s = new Snake()
s.moveBody()
export default Snake





