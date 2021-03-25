var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var isTouchDevice = 'ontouchstart' in document.documentElement

let painting = false
let last

// 画板重置
function init() {
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight - 4
  ctx.lineWidth = 4
  ctx.lineCap = "round"
  ctx.strokeStyle = canvas.style.background === 'white' ? 'black' : 'white'
}

init()

// Tools
const clickMap = {
  'strokeStyle .penBlack': 'black',
  'strokeStyle .penWhite': 'white',
  'strokeStyle .penRed': 'red',
  'lineWidth .penSmall': 2,
  'lineWidth .penMiddle': 4,
  'lineWidth .penBig': 8,
  'background .bgcBlack': 'black',
  'background .bgcWhite': 'white',
  'fn .penEraser': init
}

for (let head in clickMap) {
  const headArr = head.split(" ")
  if (headArr.includes("strokeStyle") || headArr.includes("lineWidth")) {
    document.querySelector(headArr[1]).onclick = () => {
      ctx[headArr[0]] !== clickMap[head] ? ctx[headArr[0]] = clickMap[head] : ctx[headArr[0]]
    }
  } else if (headArr.includes('background')) {
    document.querySelector(headArr[1]).onclick = () => {
      canvas.style.background !== clickMap[head] ? canvas.style.background = clickMap[head] : canvas.style.background
    }
  } else if (headArr.includes('fn')) {
    document.querySelector(headArr[1]).onclick = init
  }
}

// 划线
function draw(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke()
}

// 绘画
if (isTouchDevice) {
  canvas.ontouchstart = (e) => {
    last = [e.touches[0].clientX, e.touches[0].clientY]
  }
  canvas.ontouchmove = (e) => {
    // 手机端触摸事件有可能存在多点，我们需要获取第一个点的坐标 touches
    draw(last[0], last[1], e.touches[0].clientX, e.touches[0].clientY)
    last = [e.touches[0].clientX, e.touches[0].clientY]
  }
} else {
  canvas.onmousedown = (e) => {
    painting = true
    last = [e.clientX, e.clientY]
  }
  canvas.onmouseup = () => {
    painting = false
  }
  canvas.onmousemove = (e) => {
    if (painting === true) {
      draw(last[0], last[1], e.clientX, e.clientY)
      last = [e.clientX, e.clientY]
    }
  }
}

// 防抖
function debounce(fn, delay = 500) {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
      timer = null
    }, delay)
  }
}

const changeResize = () => {
  confirm('您的窗口发生改变，请问是否重置画板') && init()
}


// 检测窗口是否变动
if (isTouchDevice) window.addEventListener("orientationchange", debounce(changeResize, 1000), false)
else window.onresize = debounce(changeResize)

// 禁止页面滑动
var mo = function (e) {
  e.preventDefault();
}
document.addEventListener("touchmove", mo, {
  passive: false
})