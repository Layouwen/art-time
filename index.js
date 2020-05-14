var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
var isTouchDevice = 'ontouchstart' in document.documentElement
let painting = false
let last

if (isTouchDevice) {
    canvas.ontouchstart = () => {
        painting = true
    }
    canvas.ontouchend = () => {
        painting = false
    }
    canvas.ontouchmove = (e) => {
        if (painting === true) {
            ctx.beginPath()
            // 手机端触摸事件有可能存在多点，我们需要获取第一个点的坐标 touches
            ctx.arc(e.touches[0].clientX, e.touches[0].clientY, 3, 0, 2 * Math.PI)
            ctx.fill()
        }
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