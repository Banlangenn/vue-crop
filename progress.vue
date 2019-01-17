<template>
    <div ref="canvasWrap" class="canvas-wrap">
        <!-- <canvas class="canvas"></canvas> -->
    </div>
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
            // startp: {
            //     type: Number,
            //     default: 0
            // }
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
        computed: {
            calc() {
                return  this.percent / 100
            },
            progress() {
                return  this.percent > 100 ? 100 : this.percent
            }
        },
        methods: {
            // 画圆
            circle(cx, cy, r, process, img) {
                const { ctx } = this
                ctx.beginPath()
                ctx.lineWidth = this.lineWidth
                // console.log(Math.PI * 1 / 3 * (process / 100))
                    //  smallcircle1(150+Math.cos(2*Math.PI/360*120)*100, 150+Math.sin(2*Math.PI/360*120)*100, 10);
                //  smallcircle2(150+Math.cos(2*Math.PI/360*(120+process*3))*100, 150+Math.sin(2*Math.PI/360*(120+process*3))*100, 10);

                // 计算   弧度的重点位置
                ctx.arc(cx, cy, r, Math.PI * 13 / 18,   (Math.PI * 13 / 18) + process / 100 * (Math.PI * 14 / 9))
                // 就是  其实点  180     +  300度  --- 减少的 60 度 就是那个 空白
                if (img) {
                    ctx.strokeStyle =  ctx.createPattern(img, 'repeat')
                } else {
                    let linGrad = ctx.createLinearGradient(cx, cy, cx * 2, cy)
                    linGrad.addColorStop(0, this.bgColor[0])
                    linGrad.addColorStop(1, this.bgColor[1])
                    ctx.strokeStyle = linGrad
                }
                ctx.lineCap = 'round'
                ctx.stroke()
                if (this.fontShow) {
                    ctx.font = this.fontSize + 'px April'
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillStyle = this.fontColor
                    let fontWidth = ctx.measureText(parseFloat(process).toFixed(0)).width
                    const len = parseFloat(process).toFixed(0).length
                    fontWidth = len < 2 ? fontWidth + 1 :  fontWidth - this.fontSize / 7 * len//  傻逼方法 消除 误差
                    ctx.fillText(parseFloat(process).toFixed(0), cx - this.fontSize / 3, cy)
                    this.ctx.textAlign = 'center'
                    this.ctx.textBaseline = 'middle'
                    this.ctx.fillStyle = this.fontColor
                    this.ctx.font = this.fontSize / 2 + 'px April'
                    ctx.fillText('%', cx + fontWidth - this.fontSize / 3, cy + this.fontSize / 8)
                    this.ctx.font = this.fontSize  + 'px April'
                    ctx.fillText(this.bottomText, cx, cy * 2 -  this.lineWidth * 2)
                }
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
                        // console.log(start)
                        linear.addColorStop(start, gColor)
                    }
                    start += p
                }
                ctx.strokeStyle = linear
                ctx.stroke()
                    if (this.fontShow) {
                    ctx.font = this.fontSize + 'px April'
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillStyle = this.fontColor
                    //  调节误差
                    let fontWidth = ctx.measureText(parseFloat(process).toFixed(0)).width
                    const len = parseFloat(process).toFixed(0).length
                    let fontLeft = this.lineWidth + (cx * 2 - this.lineWidth * 2) * process / 100 - this.fontSize / 6 * len - this.fontSize / 2
                    if (fontLeft < this.fontSize) {
                        fontLeft = this.fontSize
                    }
                    const deviation = cx * 2 - this.fontSize - this.fontSize / 6 * len - this.fontSize / 2
                    if (fontLeft > deviation) {
                        fontLeft = deviation
                    }
                    fontWidth = len < 2 ? fontWidth + 2 :  fontWidth - this.fontSize / 7 * len //  傻逼方法 消除 误差 cy)
                    ctx.fillText(parseFloat(process).toFixed(0), fontLeft, cy * 2 - this.lineWidth * 2 - 2)
                    this.ctx.font = this.fontSize / 2 + 'px April'
                    ctx.fillText('%', fontLeft + fontWidth, cy * 2 - this.lineWidth * 2 - 2 + this.fontSize / 8)
                    // cy + this.fontSize / 8
                }
            },
            // 定时器 动画
            animation() {
                if (this.percent > 100 || this.percent < 0)  return
                // console.log(123456)
                // https://github.com/inorganik/countUp.js/blob/master/countUp.js
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
                    this.frameVal = this.process + this.easeOutExpo(progressTime, 0, this.percent - this.process, this.duration)
                    this.frameVal  = this.frameVal < 0 ? 0 : this.frameVal
                } else {
                    this.frameVal = this.easeOutExpo(progressTime, this.process, this.percent - this.process, this.duration)
                }
                // 清空画布
                // 清除canvas内容
                this.ctx.clearRect(0, 0, this.canvasOpt.width, this.canvasOpt.height)
                if (this.type === 'line') {
                    this.line(this.canvasOpt.width / 2, this.canvasOpt.height / 2,  this.frameVal)
                } else {
                    this.circle(this.canvasOpt.width / 2, this.canvasOpt.height / 2, this.canvasOpt.height / 2 - this.lineWidth, this.frameVal, this.imgCanvas)
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
            }
        },
        mounted() {
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
// 改动 ===========================================================
            const { canvasWrap } = this.$refs
            let canvasDom =  document.createElement('canvas')
            this.canvasOpt.width = canvasWrap.clientWidth
            this.canvasOpt.height = canvasWrap.clientHeight
            canvasDom.setAttribute('width', this.canvasOpt.width + 'px')
            canvasDom.setAttribute('height', this.canvasOpt.height + 'px')
            canvasWrap.appendChild(canvasDom)
            this.ctx = canvasDom.getContext('2d')
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
