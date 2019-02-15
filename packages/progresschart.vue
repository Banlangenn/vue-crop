<template>
    <div ref="mountNode" class="mount-node" style="position: relative;"/>
</template>
<script>
    export default {
        name: 'progresschart',
        props: {
            duration: {
                type: Number,
                default: 3000
            },
            type: {
                type: String,
                default: 'circle' // circle  line
            },
            percent: { // 进度结束 百分比
                type: Number,
                default: 100
            },
            fontSize: {  // 中间进度 大小
                type: Number,
                default: 24
            },
            fontColor: { // 文字进度 颜色
                type: String,
                default: '#000'
            },
            progressShow: { // 文字进度 是否显示
                type: Boolean,
                default: false
            },
            bFontSize: {  // 下边文字 大小
                type: Number,
                default: 24
            },
            bShow: { // 下边文字 是否显示
                type: Boolean,
                default: false
            },
            bText: {  // 下边文字
                type: String,
                default: '监控'
            },
            lineWidth: { // 进度条 厚度
                type: Number,
                default: 8
            },
            bgImg: { // 背景图片
                type: String,
                default: ''
            },
            bgColor: {// 渐变颜色  环形最多支持2个颜色
                type: Array,
                default: () => ['red', 'yellow']
            },
            rotate: {// 开始角度
                type: Number,
                default: 130
            },
            arcEndeg: {
                type: Number,
                default: 80 // 空缺角度
            },
            lineCap: { // 结束线帽
                type: String,
                default: 'round' //  "butt|round|square"
            },
            timingFunction: { // 速度曲线
                type: String,
                default: 'easeInOut' //  "easeOut|easeIn|easeInOut"
            },
            defaultBg: { // 背景颜色
                type: String,
                default: ''
            },
            data: { // 背景颜色
                type: Array,
                default: () => []
            },
            pieDeviation: { // 饼图 选中偏移
                type: Number,
                default: 10
            },
            html: { // 图中心html
                type: String,
                default: ''
            }
        },
        data() {
            return {
                ctx: null,
                centrality: {
                    x: null,
                    y: null
                },
                imgCanvas: null,
                process: 0,
                lastTime: 0,
                startTime: 0,
                isIncrease: true,
                frameVal: 0,
                startAngle:270,
                total:0,
                oldIndex: -1,
                tempOldIndex: -1,
                pieVlaue: 10,
                pointLocation:null
            }
        },
        destroyed() {
            this.circleTime && cancelAnimationFrame(this.circleTime)
        },
        watch: {
            percent(o) {
                this.isIncrease =  o > this.frameVal
                this.oldIndex = -1
                this.pieVlaue = this.pieDeviation
                if (this.percent > 0 && this.percent <= 100) {
                    this.animation()
                }
            }
        },
        methods: {
            pointCircle(cx, cy, r, color) {
                const { ctx } = this
                ctx.beginPath()
                ctx.fillStyle = color
                ctx.arc(cx, cy, r, 0, Math.PI * 2)
                ctx.fill()
            },
            // 画圆
            circle(cx, cy, process, r, img) {
                const { ctx } = this
                ctx.clearRect(0, 0, this.centrality.x * 2, this.centrality.y * 2)
                ctx.lineWidth = this.lineWidth
                ctx.lineCap = this.lineCap
                const startEndge =  Math.PI / 180 * this.rotate
                const endEndge = Math.PI / 180 * (360 - this.arcEndeg)
                if(this.defaultBg) {
                    ctx.beginPath()
                    ctx.arc(cx, cy, r, startEndge, startEndge + endEndge)
                    ctx.strokeStyle = this.defaultBg
                    ctx.stroke()  
                }
                ctx.beginPath()
                ctx.arc(cx, cy, r, startEndge, startEndge + process / 100 * endEndge)
                // 就是  其实点  180     +  300度  --- 减少的 60 度 就是那个 空白
                if (img) {
                    ctx.strokeStyle = ctx.createPattern(img, 'repeat')
                } else {
                    let linear = ctx.createLinearGradient(0, cy, cx * 2, cy)
                    let start = 0
                    const len  = this.bgColor.length - 1
                    let p = 1 / len
                    for (const gColor of this.bgColor) {
                        if (start === 0) {
                            linear.addColorStop(0, gColor)
                        } else if (start === 1) {
                            linear.addColorStop(1, gColor)
                        } else {
                            linear.addColorStop(start, gColor)
                        }
                        start += p
                    }
                    ctx.strokeStyle = linear
                }
                //  ctx.fill()
                ctx.stroke()
                if (this.progressShow) {
                    this.renderText(parseFloat(process).toFixed(0), cx, cy)
                    ctx.font = this.fontSize  + 'px April'
                    // ctx.textAlign = 'center'
                }
                if (this.bShow) {
                    ctx.font = this.bFontSize  + 'px April'
                    ctx.fillText(this.bText, cx, cy + r -  this.lineWidth)
                }
                this.lineCap === 'round' && this.pointCircle(cx + Math.cos(Math.PI / 180 * this.rotate) * r,
                cy + Math.sin(Math.PI / 180 * this.rotate) * r,
                this.lineWidth / 2, ctx.strokeStyle)
                //  终点位置-------------------=====----------
                // this.pointCircle(cx + Math.cos(2 * Math.PI / 360 * ((360 - 80) * process / 100 + 130)) * r, cx + Math.sin(2 * Math.PI / 360 * ((360 - 80) * process / 100 + 130)) * r, this.lineWidth / 2, ctx.strokeStyle)
                // ddd
                // x坐标=a + Math.sin(2Math.PI / 360) * r
                // y坐标=b + Math.cos(2Math.PI / 360) * r
                //  角度可以改
                // console.log(Math.PI * 1 / 3 * (process / 100))
                    //  smallcircle1(150+Math.cos(2*Math.PI/360*120)*100, 150+Math.sin(2*Math.PI/360*120)*100, 10);
                //  smallcircle2(150+Math.cos(2*Math.PI/360*(120+process*3))*100, 150+Math.sin(2*Math.PI/360*(120+process*3))*100, 10);
                // 计算   弧度的重点位置
            },
            renderText(text, x, y) {
                const { ctx } = this
                ctx.font = this.fontSize + 'px April'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillStyle = this.fontColor
                // 把消除误差的东西提出来
                let fontWidth = ctx.measureText(text).width
                const len = text.length
                ctx.fillText(text, x, y)
                this.ctx.font = this.fontSize / 2 + 'px April'
                fontWidth = len < 2 ? fontWidth + 1 :  fontWidth - this.fontSize / 7 * len //  傻逼方法 消除 误差
                if (len === 3 ) {
                    fontWidth = fontWidth - this.fontSize / 26 * len
                }
                ctx.fillText('%', x + fontWidth, y + this.fontSize / 8)
            },
            // 画饼图
            // 圆心坐标x y   开始角度  结束角度 内圈弧度  外圈弧度  颜色
            renderPie(cx, cy, startAngel, endAngle, insideRadius, outsideRadius,color) {
                let { ctx } = this
                ctx.beginPath()
                ctx.moveTo(cx + Math.cos(startAngel) * insideRadius,
                        cy + Math.sin(startAngel) * insideRadius,) //起始=== 外圈弧度
                ctx.arc(cx, cy, insideRadius, startAngel, endAngle, false); // 内圈绘制圆弧5s
                ctx.lineTo(cx + Math.cos(endAngle) * insideRadius,
                    cy + Math.sin(endAngle) * insideRadius,)
                    // 这个方式有点极端 难受
                ctx.arc(cx, cy, outsideRadius, endAngle, startAngel, true); //绘制圆弧
                ctx.fillStyle = color
                ctx.fill()
            },
            // 画饼图
            pie(cx, cy, process,radius, pointLocation ,count) {
                // 用坐标来判断是 进度  还是放大
                let { ctx } = this
                ctx.clearRect(0, 0, this.centrality.x * 2, this.centrality.y * 2)
                const oneAngle = Math.PI / 180 // 一度
                const lineWidth = this.critical(this.lineWidth, 5, radius) // 最小 墙宽
                const isprogress = process === this.percent // 是不是 进度
                let isSelect = false // 是不是 选中
                this.startAngel =  oneAngle * this.rotate
                if(this.defaultBg) {
                   this.renderPie(cx, cy, this.startAngel, this.startAngel + oneAngle * 360, radius - lineWidth, radius, this.defaultBg)  
                }
                // console.log(this.oldIndex)
                this.data.forEach((item, index) => {
                    const endAngle = this.startAngel + oneAngle * (360 - this.arcEndeg) * process / 100 * (this.total === 0 ? 1 / this.data.length  : item.value / this.total)
                    if ( isprogress && pointLocation) {
                        if (this.oldIndex === index) {
                            this.renderPie(
                                cx + Math.cos(this.startAngel + ((endAngle - this.startAngel) / 2)) * (this.pieDeviation - count) ,
                                cy + Math.sin(this.startAngel + ((endAngle - this.startAngel) / 2)) * (this.pieDeviation - count) ,
                                this.startAngel, endAngle, radius - lineWidth, radius, item.color
                            )
                            if (count === this.pieDeviation) {
                                this.oldIndex = -1
                            }
                        } else {
                            if (isprogress) {
                                this.renderPie(cx, cy, this.startAngel, endAngle, radius - lineWidth, radius, 'transparent')
                            } else {
                                this.renderPie(cx, cy, this.startAngel, endAngle, radius - lineWidth, radius, item.color)
                            }
                            if ( ctx.isPointInPath(pointLocation.x, pointLocation.y)) {
                                this.tempOldIndex = index
                                if (count === this.pieDeviation) {
                                    this.oldIndex = index
                                }
                                isSelect = true
                                this.renderPie(
                                    cx + Math.cos(this.startAngel + ((endAngle - this.startAngel) / 2)) * count ,
                                    cy + Math.sin(this.startAngel + ((endAngle - this.startAngel) / 2)) * count ,
                                    this.startAngel, endAngle, radius - lineWidth, radius, item.color
                                )
                            } else {
                                this.renderPie(cx, cy, this.startAngel, endAngle, radius - lineWidth, radius, item.color)
                            }
                        }
                    } else {
                        this.renderPie(cx, cy, this.startAngel, endAngle, radius - lineWidth, radius, item.color)
                    }
                    this.startAngel = endAngle
                })
                // 点击空白
                if (isprogress &&  !isSelect && this.oldIndex == -1) {
                    this.pieVlaue = this.pieDeviation
                    cancelAnimationFrame(this.circleTime)
                }
            },   
            //  画直线
            line(cx, cy, process) {
                //  需要改造
                /**
                 * 1. 动态计算半径  以长 宽 大的  是半径
                 * 2. radius  不用linewidth了   学echart （其实 linewidth 也行， 照顾 line）
                 * ---3. 把defaultBg  放在 init 中（突然想到不行--- 清空画布--必须每次都来一遍）
                 * 4. Angle  Endge 单词错误
                 * 5. 动画方法 弄得单纯一点
                 * 6. 一动一动的动画也是可以做的 相当麻烦 100% 之后
                 * 7 pie 动画优化
                 * z
                 * 8 把动画返回只是一个  1 - 100    具体值 * x / 100 z      这样子 把动画统一了
                 * 9 超过100  或者 少于0 报错
                 */
                const { ctx } = this
                ctx.clearRect(0, 0, this.centrality.x * 2, this.centrality.y * 2)
                ctx.lineWidth = this.lineWidth
                ctx.lineCap = this.lineCap
                if(this.defaultBg) {
                    ctx.beginPath()
                    ctx.moveTo(this.lineWidth / 2, cy * 2 - this.lineWidth / 2)
                    ctx.lineTo(this.lineWidth / 2 + (cx * 2 - this.lineWidth), cy * 2 - this.lineWidth / 2)
                    ctx.strokeStyle = this.defaultBg
                    ctx.stroke()  
                }
                ctx.beginPath()
                ctx.moveTo(this.lineWidth / 2, cy * 2 - this.lineWidth / 2)
                ctx.lineTo(this.lineWidth / 2 + (cx * 2 - this.lineWidth) * process / 100, cy * 2 - this.lineWidth / 2)
                let linear = ctx.createLinearGradient(0, 0, cx * 2, 0)
                let start = 0
                const len  = this.bgColor.length - 1
                let p = 1 / len
                for (const gColor of this.bgColor) {
                    if (start === 0) {
                        linear.addColorStop(0, gColor)
                    } else if (start === 1) {
                        linear.addColorStop(1, gColor)
                    } else {
                        linear.addColorStop(start, gColor)
                    }
                    start += p
                }
                ctx.strokeStyle = linear
                ctx.stroke()
                if (this.progressShow) {
                    const intProgress = parseFloat(process).toFixed(0)
                    let fontWidth = ctx.measureText(intProgress).width
                    let fontLeft = this.lineWidth / 2 + (cx * 2 - this.lineWidth) * process / 100 - fontWidth - this.fontSize / 2
                    const deviation = cx * 2 - fontWidth
                    fontLeft = this.critical(fontLeft, fontWidth, deviation)
                    this.renderText(intProgress, fontLeft,
                    cy * 2 - this.lineWidth * 1.5 + (this.lineWidth - this.fontSize) / 4 - 1)
                }
                this.lineCap === 'round' && this.pointCircle(this.lineWidth / 2,
                cy * 2 - this.lineWidth / 2,
                this.lineWidth / 2, ctx.strokeStyle)
                // 终点位置
                // this.pointCircle(this.lineWidth + (cx * 2 - this.lineWidth * 2) * process / 100, cy * 2 - this.lineWidth / 2, this.lineWidth / 2, ctx.strokeStyle)
            },
            init() {
                if (this.data.length < 1) {
                    return
                }
                this.total = this.data.reduce((pre,curr) => {
                    return pre + curr.value
                }, 0)
            },
            //  动画
            animation() {
                // if (this.percent > 100 || this.percent < 0)  return
                this.process =  this.frameVal
                this.startTime = 0
                if (this.circleTime) {
                    cancelAnimationFrame(this.circleTime)
                }
                this.circleTime = requestAnimationFrame(this.frame)
            },
            frame(timestamp) {
                if (!this.startTime) { this.startTime = timestamp }
                const progressTime = timestamp - this.startTime
                this.frameVal = this.process + this.velocityCurve(progressTime, 0, this.critical(this.percent, 0, 100) - this.process, this.duration)
                if (this.isIncrease) {
                    if (this.frameVal < this.percent && this.frameVal <= 100) {
                        this.circleTime = requestAnimationFrame(this.frame)
                    } else {
                        this.process =  this.frameVal = this.critical(this.percent, 0, 100)
                    }
                } else {
                    if (this.frameVal > this.percent  && this.frameVal >= 0) {
                        this.circleTime = requestAnimationFrame(this.frame)
                    } else {
                        this.process =  this.frameVal = this.critical(this.percent, 0, 100)
                    }
                }
                switch (this.type) {
                    case 'line':
                            this.line(this.centrality.x, this.centrality.y,  this.frameVal)
                        break;
                    case 'circle':
                            this.circle(this.centrality.x, this.centrality.y, this.frameVal, this.radius - this.lineWidth / 2 - 1, this.imgCanvas)
                        break;
                    case 'pie':
                         this.pie(this.centrality.x, this.centrality.y,  this.frameVal, this.radius - this.pieDeviation)
                        break;
                    default:
                        this.circle(this.centrality.x, this.centrality.y, this.frameVal, this.radius - this.lineWidth / 2 - 1, this.imgCanvas)
                }
                console.log('进度条')
            },
            pieFrame(timestamp){
                if (!this.startTime) { this.startTime = timestamp }
                const progressTime = timestamp - this.startTime
                // 增加  --- 减少 
                let pieVlaue = this.pieVlaue = this.pieVelocityCurve(progressTime, 0, this.pieDeviation, 1000)
                // 结束条件
                if (pieVlaue <= this.pieDeviation) {
                    this.circleTime = requestAnimationFrame(this.pieFrame)
                }
                pieVlaue = this.critical(pieVlaue, 0, this.pieDeviation)
                this.pie(this.centrality.x, this.centrality.y, this.frameVal,  this.radius - this.pieDeviation, this.pointLocation, pieVlaue)
                console.log('放大缩小')
            },
            velocityCurve(t, b, c, d) {
                // b: 当前进度     c 差额
                // t 当前消耗时间  d总时间
                // t, b, c, d,
                switch (this.timingFunction) {
                    case 'easeIn':
                        return  b + c * Math.pow(1.5, 10 * (t / d - 1)) * 1030 / 1023
                    case 'easeOut':
                        return c * (-Math.pow(1.5, -10 * t / d) + 1) * 1030 / 1023 + b
                    case 'easeInOut':
                        {
                        let progress = t / d * 2
                        if (progress < 1) {
                            return c / 2 * Math.pow(1.5, 10 * (progress - 1)) * 1030 / 1023 + b
                        } else {
                            return c / 2 * (-Math.pow(1.5, -10 * --progress) + 2) * 1030 / 1023 + b
                        }
                        }
                    default:
                        return c * (-Math.pow(1.5, -10 * t / d) + 1) * 1030 / 1023 + b
                }
            },
            pieVelocityCurve (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t)* 1030 / 1023 + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75)* 1030 / 1023 + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375)* 1030 / 1023 + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375)* 1030 / 1023 + b;
                }
            },
            critical(value, min, max) {
                if (value < min) {
                    return min
                }
                if (value > max) {
                    return max
                }
                return value
            },
            getPixelRatio(context) {
                const backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1
                return (window.devicePixelRatio || 1) / backingStore
            },
            getClickLocation: function(e, t, canvas) {
                const a = canvas.getBoundingClientRect()
                return {
                    x: (e - a.left) * (canvas.width / a.width),
                    y: (t - a.top) * (canvas.height / a.height)
                }
            }
        },
        mounted() {
            // 兼容 requestAnimationFrame
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function(callback) {
                    const currTime = new Date().getTime()
                    const timeToCall = Math.max(0, 16 - (currTime - this.lastTime))
                    const time = currTime + timeToCall
                    var id = window.setTimeout(function() { callback(time) }, timeToCall)
                    this.lastTime = currTime + timeToCall
                    return id
                }
            }
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id)
                }
            }
            // 解决 字体模糊
            const { mountNode } = this.$refs
            const { clientWidth, clientHeight } = mountNode
            // 中间dom
            if (this.html) {
                let divTemp = document.createElement('div')
                divTemp.style.position = 'absolute'
                divTemp.style.visibility = 'hidden'
                divTemp.style.display = 'inlineBlock'
                divTemp.innerHTML = this.html
                mountNode.appendChild(divTemp).cloneNode(true)
                divTemp.style.top = (clientHeight - divTemp.clientHeight) / 2  + 'px'
                divTemp.style.left =  (clientWidth - divTemp.clientWidth) / 2 + 'px'
                divTemp.style.visibility = 'visible'
            }
            // canvas dom
            let canvasDom =  document.createElement('canvas')
            const diameter = clientWidth > clientHeight ? clientHeight : clientWidth
            this.radius = diameter / 2
            this.centrality.x = clientWidth / 2
            this.centrality.y = clientHeight / 2
            canvasDom.style.width =  clientWidth + 'px'
            canvasDom.style.height = clientHeight + 'px'
            mountNode.appendChild(canvasDom).cloneNode(true)
            this.ctx = canvasDom.getContext('2d')
            const pixelRatio = this.getPixelRatio(this.ctx)
            canvasDom.width = clientWidth * pixelRatio
            canvasDom.height = clientHeight * pixelRatio
            this.ctx.scale(pixelRatio, pixelRatio)
            if (this.bgImg) {
                let img = null
                img = new Image()
                img.src = this.bgImg
                img.onload = () => { // 等到图片加载进来之后
                    this.imgCanvas = canvasDom.cloneNode(true)
                    this.imgCanvas.getContext('2d').drawImage(img, 0, 0, clientWidth, clientHeight)
                    this.animation()
                }
            } else {
                this.animation()
            }
            this.init()
            if (this.type !== 'pie') return
            this.pieVlaue = this.pieDeviation
            canvasDom.addEventListener('click', e => {
                if ( this.frameVal !== this.percent) return
                if (this.pieVlaue < this.pieDeviation) { // 动画没有结束  就点击了下一个
                    cancelAnimationFrame(this.circleTime)
                    this.oldIndex = this.tempOldIndex
                    this.pie(this.centrality.x, this.centrality.y,  this.frameVal, this.radius - this.pieDeviation)
                }
                const pointLocation = this.pointLocation = this.getClickLocation(e.pageX, e.pageY, canvasDom)
                this.startTime = 0
                this.circleTime = requestAnimationFrame(this.pieFrame)
            })
        }
    }
</script>

