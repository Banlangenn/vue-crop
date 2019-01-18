<template>
    <div ref="canvasWrap" class="canvas-wrap"/>
</template>
<script>
    export default {
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
                default: '#fff'
            },
            fontShow: { // 文字进度 是否显示
                type: Boolean,
                default: false
            },
            bottomText: {
                type: String,
                default: '监 控'
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
                default: _ => ['red', 'yellow', 'green', '#030af8', 'pink']
            }
        },
        data() {
            return {
                ctx: null,
                canvasOpt: {
                    width: null,
                    height: null
                },
                imgCanvas: null,
                process: 0,
                lastTime: 0,
                startTime: 0,
                timestamp: null,
                isIncrease: true,
                frameVal: 0
            }
        },
        destroyed() {
            this.circleTime &&  clearInterval(this.circleTime)
        },
        watch: {
            percent(o, v) {
                this.isIncrease =  o > v
                this.animation()
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
            circle(cx, cy, r, process, img) {
                const { ctx } = this
                ctx.beginPath()
                ctx.lineWidth = this.lineWidth
                ctx.arc(cx, cy, r, Math.PI * 13 / 18,   (Math.PI * 13 / 18) + process / 100 * (Math.PI * 14 / 9))
                // 就是  其实点  180     +  300度  --- 减少的 60 度 就是那个 空白
                if (img) {
                    ctx.strokeStyle =  ctx.createPattern(img, 'repeat')
                } else {
                    let linGrad = ctx.createLinearGradient(0, cy, cx * 2, cy)
                    linGrad.addColorStop(0, this.bgColor[0])
                    linGrad.addColorStop(1, this.bgColor[1])
                    ctx.strokeStyle = linGrad
                }
                //  ctx.fill()
                ctx.lineCap = 'round'
                ctx.stroke()
                if (this.fontShow) {
                    this.renderText(parseFloat(process).toFixed(0), cx, cy)
                    ctx.font = this.fontSize  + 'px April'
                    // ctx.textAlign = 'center'
                    ctx.fillText(this.bottomText, cx, cy * 2 -  this.lineWidth)
                }
                this.pointCircle(cx + Math.cos(2 * Math.PI / 360 * 130) * r,
                cx + Math.sin(2 * Math.PI / 360 * 130) * r,
                this.lineWidth / 2, ctx.strokeStyle)
                //  终点位置
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
                fontWidth = len < 2 ? fontWidth + 1 :  fontWidth - this.fontSize / 7 * len//  傻逼方法 消除 误差
                ctx.fillText('%', x + fontWidth, y + this.fontSize / 8)
            },
            //  画直线
            line(cx, cy, process) {
                const { ctx } = this
                ctx.beginPath()
                ctx.moveTo(this.lineWidth, cy * 2 - this.lineWidth)
                ctx.lineCap = 'round'
                ctx.lineWidth = this.lineWidth
                ctx.lineTo(this.lineWidth + (cx * 2 - this.lineWidth * 2) * process / 100, cy * 2 - this.lineWidth)
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
                if (this.fontShow) {
                    let fontLeft = this.lineWidth + (cx * 2 - this.lineWidth * 2) * process / 100 - this.fontSize / 6 * len - this.fontSize / 2
                    const deviation = cx * 2 - this.fontSize - this.fontSize / 6 * len - this.fontSize / 2
                    fontLeft = this.critical(fontLeft, this.fontSize, deviation)
                    this.renderText(parseFloat(process).toFixed(0), fontLeft, cy * 2 - this.lineWidth * 2 - 2)
                }
                this.pointCircle(0 + this.lineWidth,
                cy * 2 - this.lineWidth,
                this.lineWidth / 2, ctx.strokeStyle)
                // 终点位置
                // this.pointCircle(this.lineWidth + (cx * 2 - this.lineWidth * 2) * process / 100, cy * 2 - this.lineWidth, this.lineWidth / 2, ctx.strokeStyle)
            },
            //  动画
            animation() {
                if (this.percent > 100 || this.percent < 0)  return
                this.process =  this.frameVal
                this.startTime = 0
                if (this.circleTime) {
                    cancelAnimationFrame(this.circleTime)
                }
                this.circleTime = requestAnimationFrame(this.frame)
            },
            frame(timestamp) {
                if (!this.startTime) { this.startTime = timestamp }
                this.timestamp = timestamp
                const progressTime = timestamp - this.startTime
                if (!this.isIncrease) {
                    this.frameVal = this.process + this.easeOutExpo(progressTime, 0, this.critical(this.percent, 0, 100) - this.process, this.duration)
                } else {
                    this.frameVal = this.easeOutExpo(progressTime, this.process,  this.critical(this.percent, 0, 100) - this.process, this.duration)
                }
                this.frameVal  = this.critical(this.frameVal, 0, 100)
                // 清空画布
                // 清除canvas内容
                this.ctx.clearRect(0, 0, this.canvasOpt.width, this.canvasOpt.height)
                if (this.type === 'line') {
                    this.line(this.canvasOpt.width / 2, this.canvasOpt.height / 2,  this.frameVal)
                } else {
                    this.circle(this.canvasOpt.width / 2, this.canvasOpt.height / 2, this.canvasOpt.height / 2 - this.lineWidth / 2 - 1, this.frameVal, this.imgCanvas)
                }
                if (this.isIncrease) {
                    if (this.frameVal < this.percent) {
                        this.circleTime = requestAnimationFrame(this.frame)
                    } else {
                        this.process =  this.frameVal
                        this.startTime = 0
                    }
                } else {
                    if (this.frameVal > this.percent) {
                        this.circleTime = requestAnimationFrame(this.frame)
                    } else {
                        this.process =  this.frameVal
                        this.startTime = 0
                    }
                }
            },
            easeOutExpo(t, b, c, d) {
                // b: 当前进度     c 差额
                // t, b, c, d,
                return c * (-Math.pow(1.5, -10 * t / d) + 1) * 1030 / 1023 + b
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
            }
        },
        mounted() {
            // 兼容 requestAnimationFrame
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function(callback, element) {
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
            const { canvasWrap } = this.$refs
            let canvasDom =  document.createElement('canvas')
            this.canvasOpt.width = canvasWrap.clientWidth
            this.canvasOpt.height = canvasWrap.clientHeight
            canvasDom.style.width =  this.canvasOpt.width + 'px'
            canvasDom.style.height = this.canvasOpt.height + 'px'
            canvasWrap.appendChild(canvasDom)
            this.ctx = canvasDom.getContext('2d')
            const pixelRatio = this.getPixelRatio(this.ctx)
            canvasDom.width = this.canvasOpt.width * pixelRatio
            canvasDom.height = this.canvasOpt.height * pixelRatio
            this.ctx.scale(pixelRatio, pixelRatio)
            //  环形渐变
            if (this.bgImg) {
                let img = null
                img = new Image()
                img.src = this.bgImg
                img.onload = _ => { // 等到图片加载进来之后
                    this.imgCanvas = canvasDom.cloneNode(true)
                    this.imgCanvas.getContext('2d').drawImage(img, 0, 0, this.canvasOpt.width, this.canvasOpt.height)
                    this.animation()
                }
            } else {
                this.animation()
            }
        }
    }
</script>
