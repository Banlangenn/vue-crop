<style>
    .draw-action-bar {
        width: 100%;
        /* background: #ffc9c9; */
        height: 60px;
        position: absolute;
        top: 0;
        z-index: 5;
        display: flex;
        justify-content:center;
        align-items: center;
        color: red;
        /* pointer-events: none */
    }
    .draw-icon-list {
        padding: 2px 31px;
        /* background-color: rgba(239, 238, 238, 0.3);
        9, 24, 62 */
        background-color: rgba(9, 24, 62, 0.3);
        /* position: absolute;
        left: 0;
        right: 0;
        top: 0; */
       
        border-radius: 20px;
        /* tex */
    }
    .draw-icon-wrap {
        padding: 10px 0;
        position: absolute;
        top: 0;
        /* left: 0; */
    }
    .draw-icon {
        color: #ccc;
        width: 20px;
        height: 20px;
        fill: #ccc;
        line-height: 60px;
        padding: 5px 20px;
    }
    /* .rubber {
        padding: 0 20px;
    } */
</style>
<template>
    <div ref="mountNode" 
        class="draw-mount-node" 
        @touchstart="handleStart($event)"
        @touchmove="handleMove($event)"
        @touchend="handleEnd($event)"
        style="overflow: hidden;"
        :style="{width: options.width + 'px', height: options.height + 'px'}"
    >
    <div class="draw-action-bar" :style="{width: options.width + 'px', height: options.height + 'px'}">
        <!-- <button @touchstart="clickHandle">1213 </button> -->
        <div class="draw-icon-wrap">
            <div class="draw-icon-list">
                <svg
                    @touchstart="handleMatching($event)"
                    class="draw-icon matching"
                    t="1573095231171"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2503" width="128" height="128"><path d="M503.2 902.2c-18.5 0-34.1-14.8-35-33.4-4.3-88.7-75-158.3-161-158.3-66.1 0-128.5-17.5-175.8-49.2-23.9-16.1-42.9-35-56.2-56.3-14.5-23-21.8-47.6-21.8-73.2 0-50.6 11.9-99.7 35.3-145.8 22.5-44.2 54.5-83.8 95.3-117.7 82.9-69 192.8-107 309.5-107 116.7 0 226.6 38 309.5 107 40.7 33.9 72.8 73.5 95.3 117.7 23.4 46.1 35.3 95.2 35.3 145.8 0 49.9-11.6 98.3-34.4 143.8-21.8 43.7-53.1 82.9-92.8 116.7-80.6 68.5-188 107.5-302.5 109.8-0.3 0.1-0.5 0.1-0.7 0.1z m-9.8-690.8c-215.1 0-390.1 143.7-390.1 320.4 0 32.5 19.9 63.7 55.9 87.9 39.1 26.3 91.7 40.7 147.9 40.7 107.9 0 197.4 82.8 209.8 191.2 203.4-10.1 366.5-151.2 366.5-319.8 0.1-176.7-174.9-320.4-390-320.4z" p-id="2504"></path><path d="M602.5 767.8c-19.4 0-38.8-7.4-53.6-22.2-14.3-14.3-22.2-33.3-22.2-53.6s7.9-39.3 22.2-53.6c29.5-29.5 77.6-29.5 107.1 0s29.5 77.6 0 107.1c-14.7 14.9-34.1 22.3-53.5 22.3z m0-131.5c-14.3 0-28.6 5.4-39.4 16.3-10.5 10.5-16.3 24.5-16.3 39.4s5.8 28.9 16.3 39.4c21.7 21.7 57.1 21.7 78.9 0 21.7-21.7 21.7-57.1 0-78.9-10.9-10.8-25.2-16.2-39.5-16.2z" fill="#dbdbdb" p-id="2505"></path><path d="M738.9 383.8m-64.3 0a64.3 64.3 0 1 0 128.6 0 64.3 64.3 0 1 0-128.6 0Z" fill="#dbdbdb" p-id="2506"></path><path d="M557.8 285.2m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z" fill="#dbdbdb" p-id="2507"></path><path d="M376.6 285.4m-31.2 0a31.2 31.2 0 1 0 62.4 0 31.2 31.2 0 1 0-62.4 0Z" fill="#dbdbdb" p-id="2508"></path></svg>
                <svg
                    @touchstart="handlePen($event)"
                    class="draw-icon pen"
                    :style="{fill: changeDrawAction == 1 ? '#f14864': ''}" 
                    t="1573031834722"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4617" width="128" height="128"><path d="M79.36 916.48h343.04v51.2H79.36z" fill="" p-id="4618"></path><path d="M550.4 916.48h376.32v51.2H550.4z" fill="" p-id="4619"></path><path d="M629.76 158.72l215.04 215.04L373.76 844.8l-215.04-215.04L629.76 158.72z m0 0" fill="" p-id="4620"></path><path d="M716.8 74.24l215.04 215.04-64 64-215.04-215.04L716.8 74.24z m0 0" fill="" p-id="4621"></path><path d="M138.24 652.8l215.04 215.04L51.2 952.32l87.04-299.52z m0 0" fill="" p-id="4622"></path><path d="M798.72 71.68L931.84 204.8c23.04 23.04 20.48 58.88-2.56 81.92-23.04 23.04-61.44 25.6-81.92 2.56l-133.12-133.12c-23.04-20.48-23.04-58.88 2.56-81.92 23.04-23.04 58.88-25.6 81.92-2.56z m0 0" fill="" p-id="4623"></path></svg>
                <svg
                    @touchstart="handleRubber($event)"
                    class="draw-icon rubber"
                    :style="{fill: changeDrawAction == 2 ? '#f14864': ''}"
                    t="1573032058097"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5340" width="128" height="128"><path d="M604.536246 736.222443l288.794439-282.693148-287.777557-270.999007-270.999007 283.201589z m-72.70705 71.181728L264.389275 539.455809 145.922542 660.973188l164.734856 164.734856a50.844091 50.844091 0 0 0 36.099305 14.744786h107.789474a101.688183 101.688183 0 0 0 71.181728-28.981132z m109.314796 35.082423h254.220457a50.844091 50.844091 0 0 1 0 101.688183H346.248262a152.532274 152.532274 0 0 1-107.789474-44.742801l-164.734856-164.734856a101.688183 101.688183 0 0 1 0-142.363456l457.596823-480.476663a101.688183 101.688183 0 0 1 143.380337-3.559086l287.269117 270.999007a101.688183 101.688183 0 0 1 4.067527 143.888778l-3.050646 3.050646z" p-id="5341"></path></svg>
                <svg
                     @touchend="replay()"
                    class="draw-icon replay"
                    t="1573194950939"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1781" width="128" height="128"><path d="M462.272 312.896l0 298.624 248.896 0L711.168 528.576 541.952 528.576l0-215.68L462.272 312.896zM512 64C403.776 64 304.448 102.4 227.008 166.336l21.376-82.048L175.168 64l-40.96 157.056L113.856 299.52l73.28 20.224 155.712 42.88 20.416-78.528-90.56-24.96C335.168 200.064 419.264 163.52 512 163.52c192.448 0 348.48 156.032 348.48 348.48S704.448 860.416 512 860.416 163.648 704.448 163.648 512c0-9.856 2.048-19.136 2.88-28.8L65.92 474.816C64.96 487.104 64 499.456 64 512c0 247.424 200.576 448 448 448s448-200.576 448-448S759.424 64 512 64z" p-id="1782" fill="#dbdbdb"></path></svg>
            </div>
        </div>
        <!-- 颜色  直线 虚线   粗细 -->
        <!-- <div>
            <span>
                <button>书写</button>
                <button>直线</button>
            </span>
            <span>
             <button>颜色1</button>
             <button>颜色2</button>
             <button>颜色3</button>
             <button>颜色4</button>
             <button>颜色5</button>
             <button>颜色6</button>
             <button>颜色7</button>
             <button>颜色8</button>
             </span>
            <span>
                <button>细笔</button>
                <button>粗笔</button>
                <button>超粗笔</button>
            </span>
        </div> -->
    </div>
         <!-- style=" overflow: hidden;" -->
    <!--  不能绑在wrap 上=== 这样子任何点击都会计算 -后期优化-->
        <div v-show="noImage" @click="inputHandle" class="no-image-file" style="height: 100%; display: flex;justify-content: center;align-items: center;flex-wrap: wrap;"  @touchstart.stop="()=>{}" @touchmove.stop="()=>{}">
            <!-- <span>暂时没有图片,请选择图像</span> -->
            <slot name="placeholder"><span>暂时没有图片,请选择图像</span></slot>
            <div style="display:none">
                <input 
                    @change="uploadImg"
                    type="file"
                    :multiple="false"
                    id="file-input"
                    accept="image/*"
                >
                <slot name="defaultImgUrl"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import { getImageDirection, correctImage } from './util'

import { write, receive } from './workerSend'
    export default {
        name: 'crop',
        //1. props 验证   2.支持pc
        props:[
            'value',
            'position',
            'textWatermark',
            'imgLoaded',
            'imageWatermark',
            'defaultImgUrl',
            'color',
            'angle',
            'rotation',
            'shape', 
            'penBtn',
            'revokeBtn',
            'rotateBtn'
          ],
        data() {
            return {
                changeDrawAction: -1,
                // penColor: '',
                //   penColor: '',
                straightLine: false, // 直线
                debug: false, // debug
                logLevel: 0,
                type: '2',
                
                // ready: false,
                noImage: true,
                
                // ctx: null,
                options: {
                    width: 0,
                    height: 0
                },
                // pixelRatio: null,
                // scale: 1,
                // canvas: null,
                // image: {},
                // points: [],
                // lines: [],
                // cropper: {},
                // corePoint: {},
                // startPoint: {},
                // nookSide: 20,
                // rotateAngle: 0,
                // bgOpacity: 0,
                lineWidth: 2,
                // 三个操作按钮  默认不显示的
                // touchBar: null,
                // paintBrush: null,
                // revokeBar: null,
                // rubberBar: null
               
            }
        },
        methods: {
            init(img){
                // 初始化默认值
                this.checkState = true // move 事件  是否能够进入到方法内 
                this.changeDrawAction = -1 // 默认动作是 拖动和缩放图片 1 画笔 2橡皮
                this.pointLine = [] // 线 
                this.pointList = [] // 线 list
                this.points = [] // 四方形 截图的点
                this.lines = [] // 四方形 截图的线
                this.isReplay = this.isReplay || false // 是否是回放
                this.recordData = [] //  记录



                const clientW = img.width
                const clientH = img.height
                const { width, height } = this.options
                const { k, width: currentW, height: currentH } = this.convert(img, this.options,)
                this.scale = k
                // 针对小图片
                this.image = {
                    element: img,
                    width: currentW, // 显示宽度
                    height: currentH, // 真是 宽度
                    x: (width - currentW) / 2,
                    y: (height - currentH) / 2,
                    clientWidth: clientW,
                    clientHeight: clientH
                }

                const corePoint = this.corePoint = {x: width / 2 ,y : height / 2} 
                this.maxRadius = Math.min(width, height) / 2
                this.renderCanvas()

                // if (this.type == 2) {
                //     this.replay()
                // }
            },
            renderCanvas() {
                const { width, height } = this.options
                // 避免预览到背景
                // canvas init
                this.ctx.clearRect(0, 0, width, height)
                // if (!this.averageColor) {
                //     //  只会跑一次
                //     this.averageColor = this.getImageColor(this.ctx.getImageData(this.corePoint.x - 25,  this.corePoint.y - 25, 50, 50).data)
                // }
               
                // // 背景 // 考虑用css 实现
                // this.fillBackground()
                //  处理出片
                this.fillImage()
                // console.timeEnd('fillImage')
                this.drawPointFn(this.ctx)

            },

            drawPointFn(ctx){
                const pointList = this.pointList
                const image = this.image
                if (pointList.length == 0) return
                ctx.lineCap = 'round'
                pointList.forEach(el => {
                    const scale = this.scale / el.scale

                    ctx.lineWidth = this.limit(el.lineWidth * scale, 1, 15) + 1
                    ctx.beginPath()
                    ctx.strokeStyle = el.color
                    const array = el.pointLine
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i]
                        const originPoint = this.restPoint(element, image, scale)
                        if (i === 0) {
                            // 要相对于图片的位置 才是对的  不能相对于 画布
                            ctx.moveTo(originPoint.x, originPoint.y)
                            continue
                        }
                        ctx.lineTo(originPoint.x, originPoint.y)
                    }
                    ctx.stroke()
                })
            },
            fillImage() {
                const image = this.image
                const ctx = this.ctx
                const rotateAngle = this.rotateAngle
                // this.canvasRotate('img', ctx, image.element, rotateAngle, image.x, image.y, image.width, image.height)
                ctx.drawImage(image.element, image.x, image.y, image.width, image.height)
            },
            handleImageMove ({ x, y }) {
                const s = this.startPoint
                this.image.x = x - s.offsetX
                this.image.y = y - s.offsetY
                // 限制图片移动的范围
                // 三种情况 
                // 1. 图片
                // 2. 框
                // 3. 圆圈
                /**     
                    let cropper = this.cropper
                    const shape = this.shape || 'rect'
                    if (shape == 'imgage') {
                        // this.options
                        cropper = {
                            x: 0,
                            y: 0,
                            width: this.options.width,
                            height: this.options.height
                        }
                    } else if (shape === 'arc') {
                        cropper = {
                            x: this.arc.x - this.arc.r,
                            y: this.arc.y - this.arc.r,
                            width: this.arc.r * 2,
                            height: this.arc.r * 2
                        }
                    }
                    const left = cropper.x,
                    right = cropper.x + cropper.width,
                    bottom = cropper.y + cropper.height,
                    top = cropper.y
                    this.image.x = this.limit(x - s.offsetX, right - this.image.width, left)
                    this.image.y = this.limit(y - s.offsetY, bottom - this.image.height, top)
                */
                this.renderCanvas()
            },
            // handleCropperMove({ x, y }) {
            //     const { width, height } = this.options;
            //     const s = this.startPoint;
            //     const oX = s.offsetX;
            //     const oY = s.offsetY;
            //     const maxX = width - this.cropper.width;
            //     const maxY = height - this.cropper.height;
            //     let currentX = x - oX,
            //     currentY = y - oY;
            //     // 判断边界
            //     this.cropper.x = this.limit(currentX, 0, maxX)
            //     this.cropper.y = this.limit(currentY, 0, maxY)
            //     this.renderCanvas()
            // },
            getCoordinateByEvent(e){
                // 要算出来-- e.target.getBoundingClientRect(), 位置
                // 初始化的时候就拿出来
                // const rect = e.target.getBoundingClientRect(),
                // touch = e.touches[0],
                // { width, height } = this.options,
                // coordinate = {
                //     x: this.limit(touch.clientX - rect.left, 2, width - 2) ,
                //     y: this.limit(touch.clientY - rect.top, 2, height - 2) ,
                // }

                // 修改
                // if (e) {
                //     e.type 
                    
                // }

                // TODO: 为什么定位了  位置就不准了  我猜测是  偏移位置也需要  缩放
                const boundingClientRect = this.boundingClientRect
                const touch = e.touches[0]
                const { width, height } = this.options
                const coordinate = {
                    // x: this.limit(this.getInt(touch.clientX), 2, width - 2),
                    // y: this.limit(this.getInt(touch.clientY), 2, height - 2)
                    // 基于屏幕的 0 的位置
                    // 需要 算出来 当前画板的 左上角位置  减 画板位置 
                    x: this.limit(touch.clientX - boundingClientRect.left, 2, width - 2),
                    y: this.limit(touch.clientY - boundingClientRect.top, 2, height - 2)
                }
                // move 到边
                return coordinate
            },
            handleMatching(e) {
                //  切换
                // this.log('点击了调色板')
                // this.straightLine = !this.straightLine
                // this.checkState = false
                // this.sendData(e, 8, '')

                write({data: {}, event:'writeIn'})
            },
            handlePen(e) {
                this.log('点击了画笔')
                if (this.changeDrawAction == 1) {
                    this.checkState = false
                    this.changeDrawAction = -1
                } else {
                    this.checkState = false
                    this.changeDrawAction = 1
                }
                this.sendData(e, 7, '')
            },
            handleRubber(e) {
                // e.preventDefault()
                // alert(123)
                this.log('点击了橡皮')
                if (this.changeDrawAction == 2) {
                    this.checkState = false
                    this.changeDrawAction = -1
                } else {
                    this.checkState = false
                    this.changeDrawAction = 2
                }
                this.sendData(e, 6, '')
                // this.renderCanvas()
            },
            // https://blog.csdn.net/qq_42014697/article/details/80728463  两指缩放
            handleStart(e) {
                // if (!this.checkState) return // 美哟u什么
                this.clearCtx2()
                if(!this.sendData(e, 1)) return
                // 判断是不是 第一次触发 新动作
                // alert(1)
                // 双指
                if (e.touches.length > 1 && this.changeDrawAction == -1) {
                    this.startTouches = e.touches
                    this.startPoint.type = null
                    return
                }
                // 单指  起点
                this.drawPoint = this.getCoordinateByEvent(e)
                this.startPoint = this.getPointByCoordinate(this.drawPoint) // 判断点了 主要点是否 有东西
                // --  画画
                if (this.changeDrawAction != -1) {  //  changeDrawAction bar 点中了
                    // 上次肯定会被清掉
                    this.pointLine = []
                    // 如果是直线 需要永远知道第一个点  在什么位置
                    this.firstPoint = this.drawPoint
                }
            },
            scaleImage(scale, isRenderCanvas = true) {
                this.scale = scale
                const image = this.image

                const width = image.clientWidth * scale
                const height = image.clientHeight * scale

                this.image.x += (image.width - width) / 2
                this.image.y += (image.height - height) / 2
                this.image.width = width
                this.image.height = height

                if (isRenderCanvas) {
                    this.renderCanvas()
                }
            },
            handleMove (e) {
                // 判断是不是 读的一端
                if (!this.checkState) return // 不用发送 无意义的数据
                if(!this.sendData(e, 2)) return
                // 判断是不是 第一次触发 新动作
               
                const touches = e.touches
                const image = this.image
                 // 画笔
                if (this.changeDrawAction == 1) {


                    /**
                     *  直线
                     */

                    // 手动导入
                    //  最新的终点
                    // 只需要跑那根线就好了
                    // this.handleEnd(this.getCoordinateByEvent(e))
                   
                    
                    /**
                     *  画笔 
                     */
                    // 划线
                    // 先实现划线
                    //  画 相对于 画布  // 存 相对于 画布
                    // 屡一下   -- 这个东西  想对于画布  在图片在哪里 ===== 根据图片的位置还原 画布位置
                    const drawPoint = this.drawPoint
                    const current = this.getCoordinateByEvent(e)
                    // const current = {x: Math.floor(), y: Math.floor(tempCurrent.y)}
                    const ctx = this.ctx
                    const color =  this.color || this.averageColor
                    const lineWidth = this.limit(this.lineWidth, 1, 15)
                    ctx.strokeStyle = color
                    ctx.lineCap = 'round'
                    
                    // 划线  第一个点 用beginPath
                    if (this.straightLine) { // 是直线
                        this.renderCanvas()
                        ctx.beginPath()
                        ctx.lineWidth = lineWidth
                        ctx.moveTo(this.firstPoint.x, this.firstPoint.y)
                        ctx.lineTo(current.x, current.y)
                        ctx.stroke()
                        //  this.drawPoint  用这个变量的原因是  起点和最后一点 都不在 move事件上
                        if (this.pointLine.length === 0) {
                            try {
                                this.pointLine.push({
                                    x: drawPoint.x - image.x,
                                    y: drawPoint.y - image.y
                                })
                            } catch (error) {
                                console.log('-------------==============')
                                console.log(drawPoint)
                                console.log(image)
                                throw error
                            }
                        }
                    } else {
                        // console.log('----------90909090--------------------------------')
                        // console.log(drawPoint)
                        if (this.pointLine.length === 0) {
                            this.ctx.beginPath()
                            ctx.lineWidth = lineWidth                
                            this.ctx.moveTo(drawPoint.x, drawPoint.y)
                        } else {
                            ctx.lineTo(current.x, current.y)
                            ctx.stroke()
                        }

                        //  this.drawPoint  用这个变量的原因是  起点和最后一点 都不在 move事件上
                        try {
                            this.pointLine.push({
                                x: drawPoint.x - image.x,
                                y: drawPoint.y - image.y
                            })
                        } catch (error) {
                            console.log('-------------==============')
                            console.log(drawPoint)
                            console.log(image)
                            throw error
                        }
                    }
                    this.drawPoint = current
                    return
                }
                // if (this.type == 2) return 目前是可以
                // 缩放 有行为动作 可以定义一个变量  active = 1234  不是 -1  就是 有行为
                if (touches.length > 1 && this.changeDrawAction == -1) {
                    if (this.type == 1) {
                        return
                    }
                    let startTouches = this.startTouches
                    let k; // 最终的缩放系数
                    const scale = this.scale;
                    // const offset = e.deltaY / 800;
                    k = (this.getDistance(touches[0], touches[1]) / this.getDistance(startTouches[0], startTouches[1]))
                    // k = k < 1 ? k / 10 : k * 10
                    k = k < 1 ? 1 / (1 + k / 80) : 1 + Math.abs(k) / 140
                    k = this.limit(k * scale, 0.5,1.2);
                    // 直接通知对方 缩放比例 不用再计算-- 自己计算 容易出现两边不同步
                    this.sendData(e, 5, k)
                    this.scaleImage(k)
                    return
                }
               
                // 橡皮
                if (this.changeDrawAction == 2) { 
                    const { x, y } = this.getCoordinateByEvent(e)
                    const radius = 12
                    this.clearCtx2()
                    this.renderRubber(x, y, radius)

                    if (this.type == 1 || this.isReplay) { // 回放 橡皮不做判断
                        return
                    }

                    /**
                     *  优化 橡皮移动过快造成 经过线 也没有删除
                     *  TODO:  橡皮移动过 收益不大  --影响检查速度
                     */
                    // 上一个点  复制一下 是为了保存当前点  --但是上一个点 检测还要用到
                    // const preve = { x: this.drawPoint.x, y: this.drawPoint.y }
                    // this.drawPoint = { x, y }
                    // const isFast = this.getDistance({clientX: x, clientY: y}, {clientX: preve.x, clientY: preve.y}) >= radius

                    // const ctx  = this.ctx
                    const pointList = this.pointList
                    const image = this.image
                    this.log('进入橡皮先生' + '我是写' + '--type:' + this.type)
                    const time = new Date().getTime() 
                    for (let index = 0; index < pointList.length; index++) {
                        const element = pointList[index]
                        const scale = this.scale / element.scale
                        const pointLine = element.pointLine
                        const lineDis = element.lineWidth / 2 + radius
                        const lineLength = pointLine.length
                        // 还原最大 最小值
                        const maxPonit = this.restPoint({x: element.maxX, y: element.maxY}, image, scale)
                        const minPonit = this.restPoint({x: element.minX, y: element.minY}, image, scale)
                        // 是 直线  > == 2
                        // 是曲线 > 5
                        // let number = 5  // 矩形宽高
                        // (maxPonit.x - minPonit.x > number  || maxPonit.y - minPonit.y > number) &&
                        //  直线如果距离太小也会 被拦下来
                        const time1 = new Date().getTime()
                        // (Math.abs(maxPonit.x - minPonit.x) > number  &&  Math.abs(maxPonit.y - minPonit.y) > number) &&
                        if (
                            (x > maxPonit.x ||
                            y > maxPonit.y ||
                            // 有问题
                            x < minPonit.x ||
                            y < minPonit.y)
                        ) {
                            this.log('不在这条线的矩形内-- 不检测跳过进入下一条：预检测耗时' + 
                            '' + (new Date().getTime() - time1) + 'ms' )
                            continue 
                        }
                        // this.log('在线的矩形内-- 开始检测','', 2)
                        const time2 = new Date().getTime()
                        for (let j = 0; j < lineLength; j++) {
                            const item = pointLine[j];
                            // const len = pointLine.length
                            // 点 复原坐标 1 
                            const originPoint = this.restPoint(item, image, scale)
                            // 首先用点检测
                            if (Math.abs(x - originPoint.x) <= lineDis && Math.abs(y - originPoint.y) <= lineDis) {
                                this.pointList.splice(index, 1)
                                console.log('点--------删除线下标为:' + index)
                                this.renderCanvas()
                                this.sendData(e, 4, index)
                                break
                            }

                            // 判断线 不是最后一个
                            if (lineLength == 1 || j == lineLength - 1) break
                            const secondItem = pointLine[j + 1]
                            // 如果 离上一个点差的很远 ---  用线 检测
                            if (this.getDistance({clientX: item.x, clientY: item.y}, {clientX: secondItem.x, clientY: secondItem.y}) >= lineDis ) {
                                // this.log('差的很远的的一条线 橡皮离这个线的距离')
                                const dis = this.distanceOfPoint2Line(originPoint, this.restPoint(secondItem, image, scale), {x, y})
                                // this.log('点到线的距离为： ' + dis)
                                if (dis <= lineDis) {
                                    this.pointList.splice(index, 1)
                                    console.log('线--------删除线下标为:' + index)
                                    this.renderCanvas()
                                    this.sendData(e, 4, index)
                                    break
                                }
                            }
                            
                            // TODO:  橡皮移动过 收益不大  --影响检查速度
                            // if (isFast) {
                            //     //  橡皮檫的距离大于 检测距离
                            //     const rubberDis = this.distanceOfPoint2Line(preve, {x, y}, originPoint)
                            //     // this.log( '橡皮跑的比较快了,线离当前点的距离为' + rubberDis + 'px' + '', 'red', 2)
                            //         if (rubberDis <= lineDis) {
                            //         this.sendData(e, 4, index)
                            //         this.pointList.splice(index, 1)
                            //         this.renderCanvas()
                            //         // this.log('--------------快速橡皮删除的', '', 2)
                            //         break
                            //     }
                            // } 
                        }


                        this.log('index:' + index + ',这根线检测完毕 ：检测耗时' + '' + (new Date().getTime() - time2) + 'ms')
                        // 20
                    }
                    // this.log('橡皮的半径' + ('' + radius))
                    this.log( '一共(' + pointList.length + 
                        '根),检测耗时' + '' + 
                        (new Date().getTime() - time) + 'ms', 'red', 5)
                    return
                }
                // 这是干啥的--画=>图片和 线  移动
                const type = this.startPoint ? this.startPoint.type : null
                if (type && this.getCoordinateByEvent(e)) {
                    this[type](this.getCoordinateByEvent(e))
                }
            },
            //  取整、、
            // getInt(num) { 
            //     let rounded;   
            //     rounded = (0.5 + num) | 0
            //     // A double bitwise not.
            //     rounded = ~~ (0.5 + num)
            //     // Finally, a left bitwise shift.
            //     rounded = (0.5 + num) << 0
            //     return rounded
            // },
            // 第二 画布 清屏
            clearCtx2() {
                const { width, height } = this.options
                // 避免预览到背景
                // canvas init
                this.ctx2.clearRect(0, 0, width, height)
            },
            renderRubber(x, y, radius) {
                this.log('橡皮的半径' + ('' + radius))
                // 考虑 只做检测  不做渲染
                // this.renderCanvas()
                // //直接在这里画了  x y 全有  橡皮差 跟随 鼠标
                this.clearCtx2()
                const rubberCtx = this.ctx2
                const color = this.color
                rubberCtx.strokeStyle = this.color
                rubberCtx.fillStyle = color
                rubberCtx.beginPath()
                rubberCtx.arc(x , y, radius, 0, Math.PI * 2, false)
                rubberCtx.fill()
            },
            handleEnd(e){
                this.clearCtx2()
                if(!this.sendData(e, 3)) return
                // 判断是不是 第一次触发 新动作
                if (!this.checkState) {
                    // console.log(123)
                    this.checkState = true
                    return
                }

                
                // 有两种 动作  画笔 和 橡皮
                if (this.changeDrawAction == -1) return
                
                // 搜集点 进入画笔
                // this.log(this.pointLine)
                if (this.changeDrawAction == 1 && this.pointLine.length > 0) {
                    const drawPoint = this.drawPoint
                    const image = this.image
                    this.pointLine.push({
                        x: drawPoint.x - image.x,
                        y: drawPoint.y - image.y
                    })
                    // 点的 宽度
                    // 给个正方形----- 
                    //  加个 maxX maxY  minX minY
                    const array = this.pointLine
                    // 会有 明明在范围内 检测不到--- 范围太小了 加一点
                    const offset = 6
                    //  初始化第一个  --不能默认0  有负值存在
                    let maxX = array[0].x, maxY = array[0].y,  minX = array[0].x, minY = array[0].y
                    for (let index = 1; index < array.length; index++) {
                        const element = array[index]
                        if (element.x < minX) {
                            minX = element.x - offset
                        }
                        if (element.y < minY) {
                            minY = element.y - offset
                        }
                        if (element.x > maxX) {
                            maxX = element.x + offset
                        }
                        if (element.y > maxY) {
                            maxY = element.y + offset
                        }
                    }
                    const pointObj = {
                        pointLine: this.pointLine,
                        scale: e.scale || this.scale,
                        lineWidth: this.lineWidth,
                        color: this.color,
                        // rotateAngle : this.rotateAngle,
                        maxX,
                        maxY,
                        minX,
                        minY
                    }
                    this.pointList.push(pointObj)
                    // console.log(this.pointList)
                    this.pointLine = []
                }
                // 最后把橡皮去掉
                if (this.rubberAction) {
                    this.renderCanvas()
                }
                
            },
            clearCtx2() {
                const { width, height } = this.options
                // 避免预览到背景
                // canvas init
                this.ctx2.clearRect(0, 0, width, height)
            },
            renderRubber(x, y, radius) {
                this.log('橡皮的半径' + ('' + radius))
                // 考虑 只做检测  不做渲染
                // this.renderCanvas()
                // //直接在这里画了  x y 全有  橡皮差 跟随 鼠标
                // console.log('画画橡皮')
                // this.clearCtx2()
                const rubberCtx = this.ctx2
                const color = this.color
                rubberCtx.strokeStyle = this.color
                rubberCtx.fillStyle = color
                rubberCtx.beginPath()
                rubberCtx.arc(x , y, radius, 0, Math.PI * 2, false)
                rubberCtx.fill()
            },
           distanceOfPoint2Line(p1, p2, { x, y }) {
                const A = x - p1.x
                const B = y - p1.y
                const C = p2.x - p1.x
                const D = p2.y - p1.y

                const dot = A * C + B * D;
                const len_sq = C * C + D * D
                let param = -1
                if (len_sq != 0) //线段长度不能为0
                    param = dot / len_sq
                let xx, yy
                if (param < 0) {
                    xx = p1.x
                    yy = p1.y
                }
                else if (param > 1) {
                    xx = p2.x
                    yy = p2.y
                }
                else {
                    xx = p1.x + param * C
                    yy = p1.y + param * D
                }
                const dx = x - xx
                const dy = y - yy
                return Math.sqrt(dx * dx + dy * dy)
            },

            restPoint(point, image, scale) {
                return {
                    x: image.x + point.x * scale,
                    y: image.y + point.y * scale
                }
            },
            checkRegion(x, y, target) {
                // 添加个误差
                return x + 2 > target.x &&
                    x - 2 < target.x + target.width &&
                    y + 2 > target.y &&
                    y - 2 < target.y + target.height
            },
            checkArc(x, y) {
                const ctx  = this.ctx
                ctx.beginPath()
                // ctx.strokeStyle = 'red'//'transparent'
                ctx.lineWidth = this.nookSide / 0.7
                ctx.beginPath()
                ctx.arc(this.arc.x, this.arc.y, this.arc.r + ctx.lineWidth , 0, Math.PI * 2)
                ctx.stroke()
                // ctx.stroke() 
                return (ctx.isPointInPath(x * this.pixelRatio, y * this.pixelRatio)
                 && this.getDistance({clientX: x, clientY: y}, {clientX: this.arc.x, clientY: this.arc.y}) >  this.arc.r - ctx.lineWidth / 2)
            },
            // start 就触发
            getPointByCoordinate({x, y}) {
                this.log('触发检测 点击区域')
                const image = this.image,
                shape = this.shape || 'rect'
                let t = {}
                let index = 0
                //  旋转
                if (this.paintBrush && this.checkRegion(x, y, this.paintBrush)) {
                    this.log('点击了画笔')
                    if (this.changeDrawAction == 1) {
                        this.checkState = false
                        this.changeDrawAction = -1
                    } else {
                        this.checkState = false
                        this.changeDrawAction = 1
                    }
                    this.renderCanvas()
                    // this.drawActionText = 'brush'
                    return
                } else if (this.rubberBar && this.checkRegion(x, y, this.rubberBar)) {
                    // 橡皮
                    this.log('点击了橡皮')
                    if (this.changeDrawAction == 2) {
                         this.checkState = false
                        this.changeDrawAction = -1
                    } else {
                        this.checkState = false
                        this.changeDrawAction = 2
                    }
                    this.renderCanvas()
                    // this.drawActionText = 'rubber'
                    return
                } else if (this.revokeBar && this.checkRegion(x, y, this.revokeBar) && this.changeDrawAction == -1) {
                    this.log('点击了撤回')
                    this.pointList.pop()
                    this.renderCanvas()
                    return
                    
                } else if (this.touchBar && this.checkRegion(x, y, this.touchBar)) {
                    // 旋转后的角度 每次
                    this.rotateAngle =  (this.rotateAngle + this.angle ) % 360
                    this.renderCanvas()
                    return
                } else if( this.changeDrawAction !== -1){
                    // 有动作
                    return
                } else if (shape === 'arc' && this.checkArc(x, y)) {
                    t.type = 'handleArcMove'
                }
                // 四个角移动         
                else if (shape !== 'arc' && this.points.some((point,i) => {
                    index = i
                    return this.checkRegion(x,y,point)
                })
                ) {
                    t.type = 'handlePointMove'
                    this.index = index
                }
                // 四根线移动
                else if (shape === 'rect' && this.lines.some((line,i) => {
                    index = i
                    return this.checkRegion(x,y,line)
                }) 
                ) {
                    t.type = 'handleLineMove'
                    this.index = index
                }
                // else if (
                // cropper &&
                // x > cropper.x &&
                // x < cropper.x + cropper.width &&
                // y > cropper.y &&
                // y < cropper.y + cropper.height
                // ) {
                // t.offsetX = x - cropper.x;
                // t.offsetY = y - cropper.y;
                // t.type = 'handleCropperMove'
                // }
                // 图片移动
                else if (this.checkRegion(x,y,image)) {
                    t.offsetX = x - image.x
                    t.offsetY = y - image.y
                    t.type = 'handleImageMove' 
                }
                return t
            },
            // 求两点之间的 距离
            getDistance(p1, p2) {
                const x = p2.clientX - p1.clientX,
                    y = p2.clientY - p1.clientY
                return Math.sqrt((x * x) + (y * y))
            },
            limit(value, min, max) {
                if (value < min) {
                    return min
                }
                if (value > max) {
                    return max
                }
                return value
            },
            log(value, color='default', level=1) {
                if (level < this.logLevel) return
                // 日志分为 NONE，DEBUG，INFO，WARN 和 ERROR 5 个级别。
                if(!this.debug) return
                const colors = {
                    INFO: '#000',
                    red: 'font-size:16px;color:red;',
                    orange: 'font-size:16px;color:#f60;',
                    green: 'green'
                }
                // console.dir(value)
                if (typeof value === 'object') {
                    console.log(value)
                    return
                }
                // console.log(value)
                // console.log('%c' + '' +  value)
                console.log('%c' + '' +  value, colors[color])
            },


            // 工具
            getPixelRatio(context) {
                const backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1
                return (window.devicePixelRatio || 1) / backingStore
            },
            uploadImg(e) {
                this.createImage(e.target.files[0])
                this.noImage = false
            },
            getFileSrc(src) {
                if (Object.prototype.toString.call(src) === '[object File]') {
                   src = window.URL.createObjectURL(src)
                }
                return src
            },
            createImage(imgfile) {
                let img = new Image()
                //  url , imgsrc, 文件  三种情况
                img.crossOrigin = 'anonymous'
                img.src = this.getFileSrc(imgfile)
                img.onload = () => { // 等到图片加载进来之后
                    getImageDirection(img).then(res => {
                        if (res === 1) {
                            this.init(img)
                            this.$emit('imgLoaded')
                            return 
                        }
                        //  只有钉钉  会莫名其妙 卡顿- =>   把图片 画在canvas 背景上了
                        this.init(img)
                        this.init(correctImage(img, res))
                        this.$emit('imgLoaded')
                       
                    }).catch( err =>{
                        // eslint-disable-next-line
                        console.error(err)
                    })
                }
            },
            inputHandle() {
                document.getElementById('file-input').click()
            },

            sendData(e = {}, actionTypes, value) {
            //    return false
                // this.type  1 读  2 写
                // console.log(this.options)
                this.log(this.type == 1 ? '读读读读读读读读读读': '写写写写写写写写写写')
                this.log('发送数据---actionTypes:' + actionTypes + ',value:' + value)
                // if (this.rubberAction && actionTypes == 2) return false
                // 缩放 和 删除 是没有 e.type

                // 屏蔽原生 操作 展示
                if (e.type) { // 是原生事件
                    e.preventDefault()
                } else {
                    return true // 是读 不需要 发送数据 但是需要 继续往下走
                }
                if (this.type === 1) {  // 是读  并且  原生操作   中断执行
                    return false
                } 
                
               /**
                * actionTypes
                * 
                * 1 start {touches: []}
                * 2 move {touches: []}
                * 3 end  {touches: []}
                * 4 delete线  { index: 3 }
                * 5 scale 缩放 { scale: 3 }
                */

                // 优化数据结构 加快传输  我觉得没必要
                const data = {
                    // 不放进来 很多东西 要写三遍 
                    value: value || Array.from(e.touches).map(e => ({clientX: e.clientX, clientY: e.clientY})),
                    actionTypes
                }
                if (actionTypes == 5) {
                    // 画笔  起笔  缩放
                    data.scale = this.scale
                }
                if (data.actionTypes == 4) {
                    console.log('======发送删除线下标为:' + data.value)
                }
               
                // this.recordData.push(data)
                write({data, event: 'message'})
                return true
            },
            createCanvas() {    
                // 解决 字体模糊
                const { mountNode } = this.$refs
                // console.dir(mountNode.offsetHeight)
                // console.log(mountNode)
                // const { clientWidth, clientHeight } = mountNode
                // p可以优化
                // this.options = {
                //     width: clientWidth,
                //     height: clientHeight
                // }
                const { width: clientWidth, height: clientHeight } = this.options
                // canvas dom
                let canvasDom =  document.createElement('canvas')
                canvasDom.style.width =  clientWidth + 'px'
                canvasDom.style.height = clientHeight + 'px'
                //  小方格背景
               
               
                // 刷新后在~就很精准
                mountNode.appendChild(canvasDom)
                const ctx = canvasDom.getContext('2d')
                const pixelRatio = this.pixelRatio = this.getPixelRatio(ctx)
                canvasDom.style.position = 'absolute'
                canvasDom.style.top =  0
                canvasDom.style.left =  0
                canvasDom.style.zIndex = 2
                canvasDom.width = clientWidth * pixelRatio
                canvasDom.height = clientHeight * pixelRatio
                ctx.scale(pixelRatio, pixelRatio)
            

                
                const canvasDom2 = canvasDom.cloneNode(true)
                canvasDom2.style.backgroundColor = '#fff'
                canvasDom2.style.backgroundImage =  'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)'
                canvasDom2.style.backgroundSize = '29px 29px'
                canvasDom2.style.backgroundPosition = '0 0, 15px 15px'
                canvasDom2.style.zIndex = 1
                // 笔记层
            
                mountNode.appendChild(canvasDom2)
                const ctx2 = canvasDom2.getContext('2d')
                ctx2.scale(pixelRatio, pixelRatio)
                
                return  [ctx2, ctx,  canvasDom.getBoundingClientRect()]
                
            },
           convert(OriginOptions, currentOption) {
                // 适配屏幕 转换数据
                // 根据比例
                // 当前屏幕 宽高 -- 要被 修改点
                // 内部逻辑不用动
                // 宽高比
                // img  就是自己的宽高
                const { width: clientW, height: clientH } = currentOption // 当前
                const { width, height } = OriginOptions  // 原始

                let currentW, currentH, k
 
                if (clientH / clientW > height / width) {
                    // 把宽铺满
                    currentW = clientW

                    k = clientW / width
                    currentH = currentW * (height / width)
                } else {
                    // 把高铺满
                    currentH = clientH
                    k = clientH / height
                    currentW = currentH * (width / height)
                }
                return {
                    k, 
                    width: currentW, // 显示宽度
                    height: currentH, // 真是 宽度
                }
            },
            dataScale(data) {
                // const scale = this.scale / el.scale
                //     const lineWidth = this.limit(el.lineWidth * scale, 1, 15)
                //     ctx.beginPath()
                //     ctx.strokeStyle = el.color
                //     ctx.lineWidth = quality ? lineWidth * 2 : lineWidth
                //     // this.log(lineWidth)
                //     const array = el.pointLine
                //     for (let i = 0; i < array.length; i++) {
                //         const element = array[i]
                //         const originPoint = this.restPoint(element, image, scale)
                if (Array.isArray(data)) return data.map(item => ({ clientX: item.clientX * this.kScale, clientY: item.clientY * this.kScale }))
                return data * this.kScale
            },
            replay(id) {
                this.isReplay = true
                if (!this.checkState) return // 不用发送 无意义的数据
                if (this.type == 1) {
                    return
                }
                if (this.RAFID) {
                    window.cancelAnimationFrame(this.RAFID)
                    this.RAFID = null
                }
                 

                // 先克隆数据  然后 初始化 所有状态
                // -----
                // const dataJSON = JSON.parse(JSON.stringify(this.recordData))
                // 要捕捉所有动作
                this.init(this.image.element)
                // 初始化
                const dataJSON = require('./time-1573197145646.json')
                const len = dataJSON.length
                let startTime = null
                // console.log(dataJSON[0])
               this.replayIndex = 0 // 会迁入 初始化
                // console.log(dataJSON)
                const self = this
                function step(timestamp) {
                    const data = dataJSON[self.replayIndex]
                    const time = dataJSON[self.replayIndex].time

                    // 初始化时间
                    if (!startTime) startTime = timestamp
                    const  progress = timestamp - startTime
                    // 差时
                    // 暂停时间 
                    if (
                        // true
                        progress >= time 
                    ) {
                        self.replayIndex += 1
                        write({data:  data.data, event: 'message'})
                        const { actionTypes, value } = data.data
                        // console.log(actionTypes)
                        switch (actionTypes) {
                            case 1: 
                                self.handleStart({ touches: value })
                                // self.log(' 开始', 'red', 3)
                                break
                            case 2: 
                                self.handleMove({ touches: value })
                                // self.log('移动', 'red', 3)
                                break
                            case 3: 
                                self.handleEnd({ touches: value })
                                // self.log('结束', 'red', 3)
                                break
                            case 4: 
                                self.pointList.splice(value, 1)
                                self.renderCanvas()
                                // self.log('删除线', 'orange', 3)
                                break
                            case 5: 
                                self.scaleImage(value)
                                // self.log('缩放', 'orange')
                                break
                            case 6: 
                                self.handleRubber()
                                // self.log('橡皮', 'pink', 3)
                                break
                            case 7: 
                                self.handlePen()
                                // self.log('画笔', '#f60bbb', 3)
                                break
                            case 8: 
                                self.handleMatching()
                                // self.log('调色板', '#f60rrr', 3)
                                break
                            default:
                                break
                        }
                        // console.log(self.replayIndex < len)
                    }
                    if (self.replayIndex >= len) {
                        self.isReplay = false
                        return
                    }
                    self.RAFID = window.requestAnimationFrame(step)
                }
                this.RAFID = window.requestAnimationFrame(step)
                return () => {
                    window.cancelAnimationFrame(this.RAFID)
                    this.RAFID = null
                }
            }
        },
        mounted() {
            const { mountNode } = this.$refs
            const { clientWidth, clientHeight } = mountNode
            // console.log(mountNode)
            // 录屏 不能 写死
            if (this.type == 2) {
                this.options = { width: clientWidth, height:  clientHeight}
                // console.log(this.options)
            } else {
                 // mountNode
                const { k, width, height } = this.convert({ width: 1024, height: 744 }, { width: clientWidth, height: clientHeight })
                this.options = { width, height }
                this.kScale = k
            }

            const [ctx, ctx2, boundingClientRect] = this.createCanvas()
            this.ctx = ctx
            this.ctx2 = ctx2
            this.boundingClientRect = boundingClientRect



            /**
             *  回放功能
             */
      




            //
            // this.log(this.$slots.initial[0].data.attrs.src)
            if (this.defaultImgUrl || this.$slots.defaultImgUrl) {
                const src = this.defaultImgUrl ? this.defaultImgUrl : this.$slots.defaultImgUrl[0].data.attrs.src
                this.createImage(src)
                this.noImage = false
            }
            this.$emit('input', {
                getImage: this.getImage,
                changeImage: this.changeImage
            })


            // --------------------------------------------------------------------------------------------------------------
            // 需要有个type  判断是主动还是被动

            //
            //连接websocket后端服务器
            // this.socket = io.connect('ws://192.168.81.126:3000/');
 
            //告诉服务器端有用户登录
            // this.socket.emit('login', {userid:this.userid, username: 111});
 
            // //监听新用户登录
            // this.socket.on('login', function(msg){
            //    this.log('有用户进入')
            //    this.log(msg)
            // });
 
            // //监听用户退出
            // this.socket.on('logout', function(o){
            //     this.log('有用户退出')
            //     this.log(msg)
            // });
            // // 发送消息
            // // this.socket.emit('message', obj);
            // // 接受消息
            // this.socket.on('message', function(obj){})
            // set
        },
        created() {
        
           
           function getQuery() {
                let re = location.href.match(/[\\?&]\w+=\w*/g);
                let result = {};
                if (re)
                    re.forEach(i => {
                        i = i.slice(1);
                        let value = i.split('=');
                        result[value[0]] = value[1]
                    });
                return result
            }

            this.type = getQuery().them ? 2 : 1
            // '1读读读读读读读读读读' '2写写写写写写写写写写'
            // this.log(this.type)
            // 如果是写的  不用建立这个 链接
            write({data: {userid: new Date().getTime(), username: this.type == 2 ? '老师' : '学生', type: this.type}, event: 'login'})
            // if (this.type == 2)  return
            // this.log('如果是写 -- 不会走到这里的')
            // console.log(this.type)
            // 缩放数据容易丢  传缩放比
            /**
                * actionTypes
                * 
                * 1 start {touches: []}
                * 2 move {touches: []}
                * 3 end  {touches: []}
                * 4 delete线  { index: number }
                * 5 scale 缩放 { scale: number }
                * 6 橡皮 ''
                * 7 画笔 ''
                */ 

            //    还原坐标位置  有两种方式 - 1.求出来一个缩放比算出位置   2. 把图片定位好 根据图片算出位置
            //  目前两种都用到了 1. 画图 和 橡皮 图片拖动   2. 复原老师笔记
            receive((e) => {
                // console.log(e)
                // 暂时只有 --
                if (e.event == 'toOne') {
                    //  望=给这个 同学同步数据
                    // 当前有没有在 正在画数据
                    if (this.type == 2) {
                        // 老师发数据
                        const data =  {
                            id: e.data.id,

                            pointList: this.pointList,
                            pointLine: this.pointLine,
                            changeDrawAction: this.changeDrawAction,
                            scale: this.scale,
                            imageX: this.image.x,
                            imageY: this.image.y,
                            drawPoint: this.drawPoint,




                            straightLine: this.straightLine
                        }
                        write({data, event: 'toOne'})
                        this.log('给新加入的学生推送自己的状态数据', 'red', 5)
                        // console.log('发出数据')
                    } else {
                        // console.log(e.data.pointList)
                        // console.log(e.data)
                        // 学生收数据
                        // 这个数据过去 是很正确的------------------------
                        this.log('数据还原', 'red', 5)
                        const originData = e.data
                        this.changeDrawAction = originData.changeDrawAction

                        // 复原数据 原始数据没有做任何更改
                        this.pointList = originData.pointList
                        this.pointLine = originData.pointLine
                        // 原始数据


                        this.image.x = this.dataScale(originData.imageX)
                        this.image.y = this.dataScale(originData.imageY)

                        // 刚刚 初始化 drawPoint 是没有的
                        if (originData.drawPoint) {
                            this.drawPoint = {
                                x: this.dataScale(originData.drawPoint.x),
                                y: this.dataScale(originData.drawPoint.y)
                            }
                        }

                        this.straightLine = originData.straightLine
                        // 自带renderCanvas
                        this.scaleImage(this.dataScale(originData.scale))
                        // this.renderCanvas()
                    }
                }
                if (e.event == 'message') {
                    const { actionTypes, value } = e.data
                    switch (actionTypes) {
                        case 1: 
                            this.handleStart({ touches: this.dataScale(value) })
                            this.log(' 开始', 'red', 3)
                            break
                        case 2: 
                            this.handleMove({ touches: this.dataScale(value) })
                            this.log('移动', 'red', 3)
                            break
                        case 3: 
                            this.handleEnd({ touches: this.dataScale(value) })
                            this.log('结束', 'red', 3)
                            break
                        case 4: 
                            this.pointList.splice(value, 1)
                            this.renderCanvas()
                            this.log('删除线', 'orange', 3)
                            break
                        case 5: 
                            this.scaleImage(this.dataScale(value))
                            this.log('缩放', 'orange')
                            break
                        case 6: 
                            this.log('橡皮', 'pink', 3)
                            this.handleRubber()
                            break
                        case 7: 
                            this.log('画笔', '#f60bbb', 3)
                            this.handlePen()
                            break
                        case 8: 
                            this.log('调色板', '#f60rrr', 3)
                            this.handleMatching()
                            break
                        default:
                            break
                    }
                }

            })            
        },
    }
</script>