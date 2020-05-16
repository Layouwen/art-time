var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight - 4

var isTouchDevice = 'ontouchstart' in document.documentElement

let painting = false
let last

let thick = 4
ctx.lineWidth = thick
ctx.lineCap = "round"
ctx.strokeStyle = 'black'

let penBlack = document.querySelector('.penBlack')
let penWhite = document.querySelector('.penWhite')
let penRed = document.querySelector('.penRed')
let penSmall = document.querySelector('.penSmall')
let penMiddle = document.querySelector('.penMiddle')
let penBig = document.querySelector('.penBig')

penBlack.onclick = function () {
    console.log('1')
    if (ctx.strokeStyle !== 'black') {
        ctx.strokeStyle = 'black'
    }
}
penWhite.onclick = function () {
    if (ctx.strokeStyle !== 'white') {
        ctx.strokeStyle = 'white'
    }
}
penRed.onclick = function () {
    if (ctx.strokeStyle !== 'red') {
        ctx.strokeStyle = 'red'
    }
}

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

// 声明一个划线的函数
function draw(x1, x2, y1, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, x2);
    ctx.lineTo(y1, y2);
    ctx.stroke()
}