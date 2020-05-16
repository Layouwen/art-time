var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var isTouchDevice = 'ontouchstart' in document.documentElement

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight - 4

let painting = false
let last
ctx.lineWidth = 4
ctx.lineCap = "round"
ctx.strokeStyle = 'black'

// Tools
let penBlack = document.querySelector('.penBlack')
let penWhite = document.querySelector('.penWhite')
let penRed = document.querySelector('.penRed')
let penSmall = document.querySelector('.penSmall')
let penMiddle = document.querySelector('.penMiddle')
let penBig = document.querySelector('.penBig')
let bgcBlack = document.querySelector('.bgcBlack')
let bgcWhite = document.querySelector('.bgcWhite')
let penEraser = document.querySelector('.penEraser')

penBlack.onclick = () => {
    ctx.strokeStyle !== 'black' ? ctx.strokeStyle = 'black' : ctx.strokeStyle
}
penWhite.onclick = () => {
    ctx.strokeStyle !== 'white' ? ctx.strokeStyle = 'white' : ctx.strokeStyle
}
penRed.onclick = () => {
    ctx.strokeStyle !== 'red' ? ctx.strokeStyle = 'red' : ctx.strokeStyle
}

penSmall.onclick = () => {
    ctx.lineWidth !== 2 ? ctx.lineWidth = 2 : ctx.lineWidth
}
penMiddle.onclick = () => {
    ctx.lineWidth !== 4 ? ctx.lineWidth = 4 : ctx.lineWidth
}
penBig.onclick = () => {
    ctx.lineWidth !== 8 ? ctx.lineWidth = 8 : ctx.lineWidth
}

bgcBlack.onclick = () => {
    canvas.style.background !== 'black' ? canvas.style.background = 'black' : canvas.style.background
}
bgcWhite.onclick = () => {
    canvas.style.background !== 'White' ? canvas.style.background = 'White' : canvas.style.background
}

penEraser.onclick = () => {
    resetBoard()
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

// 检测窗口是否变动
let onresizeTime = 0
if (isTouchDevice) {
    window.addEventListener("orientationchange", function () {
        if (confirm('您的窗口发生改变，请问是否重置画板')) {
            resetBoard()
        }
    }, false);
} else {
    window.onresize = () => {
        if (onresizeTime !== 1) {
            if (confirm('您的窗口发生改变，请问是否重置画板')) {
                setTimeout(() => {
                    resetBoard()
                }, 200)
                onresizeTime = 1
            } else {
                onresizeTime = 1
            }
        } else {
            onresizeTime = 0
        }
    }
}



// 画板重置
function resetBoard() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight - 4
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    ctx.strokeStyle = 'black'
}

// 声明一个划线的函数
function draw(x1, x2, y1, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, x2);
    ctx.lineTo(y1, y2);
    ctx.stroke()
}

// 禁止页面滑动
var mo = function (e) {
    e.preventDefault();
}
document.addEventListener("touchmove", mo, {
    passive: false
})