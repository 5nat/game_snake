// 定义食物类Food
class Food {
  // 定义一个属性表示食物所对应的元素 (必须有一个div指向食物)
  element: HTMLElement

  constructor() {
    // 获取页面中的food元素并将其赋值给element  !表示document不为空,可用
    this.element = document.getElementById('food')!
  }

  // 定义一个获取食物X轴坐标的方法
  get X() {
    return this.element.offsetLeft
  }
  // 定义一个获取食物Y轴坐标的方法
  get Y() {
    return this.element.offsetTop
  }
  // 修改食物位置的方法
  change() {
    // 生成一个随机的位置  (注意: 食物的位置最小是0, 最大是290; 蛇一次移动一格(10), 所有要求食的坐标都是 10 的倍数)
    // Math.random()随机生成一个 (0, 1) 的数, 不包过 0 , 1;  Math.round(Math.random())  通过四舍五入生成 [0, 1]

    // 这样才是10的倍数, 或*30,用向下取整
    let left = Math.round(Math.random() * 29) * 10
    let top = Math.round(Math.random() * 29) * 10

    this.element.style.left = `${left}px`
    this.element.style.top = `${top}px`
  }
}

export default Food

// 测试代码
// const food  = new Food()
// console.log(food.X, food.Y);
// food.change()
// console.log(food.X, food.Y);