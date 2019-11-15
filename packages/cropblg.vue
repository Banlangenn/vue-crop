<style lang="scss">
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
    .draw-icon-wrap {
        padding: 10px 0;
        position: absolute;
        top: 0;
        /* left: 0; */
    }
    .draw-icon-list {
        padding: 2px 31px;
        background-color: rgba(9, 24, 62, 0.3);
        border-radius: 20px;
        position: relative;
        color: #fff;
        font-size: 22px;
       .triangle {
            position: absolute;
            left: 50px;
            top: 32px;
            float: left;
            width: 0; 
            height: 0;
            border-width: 10px;
            border-style: solid;
            border-color: transparent #3c3838 transparent transparent;
            transform: rotate(90deg); /*顺时针旋转90°*/
        }
        .active {
            background: #000;
        }
    }
    .draw-icon {
        color: #ccc;
        width: 20px;
        height: 20px;
        fill: #ccc;
        line-height: 60px;
        padding: 5px 20px;
    }
    .draw-matching-wrap {
        position: absolute;
        left: 16px;
        top: 52px;

        display: flex;
        width: 290px;
        height: 200px;
        background: #3c3838;
        border-radius: 5px;
        box-shadow: 5px 10px 15px 2px rgba(0,0,0, .4); //1.水平阴影  2.垂直阴影 3.模糊距离，改虚实 4.阴影尺寸
        & > div {
            flex: 1;
            border-left: 1px solid rgba(162, 153, 162, 0.3);
        }
        & > div:first-child {
             border-left: none;
        }
    }
    .writing-style {
         display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        span {
            width: 100%;
        }
    }
    .colors {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        padding: 20px 0;
        span  {
            display: inline-block;
            padding: 5px;
             height: 27px;
            i {
                display: inline-block;
                width: 22px;
                height: 22px;
                border-radius: 100px;
                border: 2px solid #fff;
            }
        }
    }
    .pen-weight {
         display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        span {
            width: 100%;
        }
    }
    .draw-mount-node {
        .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 4;
            // background: red;
        }
    }

    /* .rubber {
        padding: 0 20px;
    } */
</style>
<template>
    <div ref="mountNode" 
        class="draw-mount-node" 
        @touchstart.stop="handleStart($event)"
        @touchmove.stop="handleMove($event)"
        @touchend.stop="handleEnd($event)"
        style="overflow: hidden;"
        :style="{width: options.width + 'px', height: options.height + 'px'}"
    >
        <div class="draw-action-bar" :style="{width: options.width + 'px'}">
            <!-- <button @touchstart="clickHandle">1213 </button> -->
            <div class="draw-icon-wrap"
            @touchstart.stop="()=>{}"
            @touchmove.stop="()=>{}"
            @touchend.stop="()=>{}">
                <div class="draw-icon-list">
                    <svg
                        @touchstart="handleMatching($event)"
                        class="draw-icon matching"
                        :style="{fill: showMatching == 1 ? color: ''}"
                        t="1573621984209"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1926" width="128" height="128"><path d="M810.666667 384a128 128 0 0 0-120.32 85.333333H128a42.666667 42.666667 0 0 0 0 85.333334h562.346667A128 128 0 1 0 810.666667 384zM128 298.666667h50.346667a128 128 0 0 0 240.64 0H896a42.666667 42.666667 0 0 0 0-85.333334H418.986667a128 128 0 0 0-240.64 0H128a42.666667 42.666667 0 0 0 0 85.333334zM896 725.333333h-306.346667a128 128 0 0 0-240.64 0H128a42.666667 42.666667 0 0 0 0 85.333334h221.013333a128 128 0 0 0 240.64 0H896a42.666667 42.666667 0 0 0 0-85.333334z" p-id="1927"></path></svg>
                    <svg
                        @touchstart="handlePen($event)"
                        class="draw-icon pen"
                        :style="{fill: changeDrawAction == 1 ? color: ''}" 
                        t="1573031834722"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4617" width="128" height="128"><path d="M79.36 916.48h343.04v51.2H79.36z" fill="" p-id="4618"></path><path d="M550.4 916.48h376.32v51.2H550.4z" fill="" p-id="4619"></path><path d="M629.76 158.72l215.04 215.04L373.76 844.8l-215.04-215.04L629.76 158.72z m0 0" fill="" p-id="4620"></path><path d="M716.8 74.24l215.04 215.04-64 64-215.04-215.04L716.8 74.24z m0 0" fill="" p-id="4621"></path><path d="M138.24 652.8l215.04 215.04L51.2 952.32l87.04-299.52z m0 0"  p-id="4622"></path><path  d="M798.72 71.68L931.84 204.8c23.04 23.04 20.48 58.88-2.56 81.92-23.04 23.04-61.44 25.6-81.92 2.56l-133.12-133.12c-23.04-20.48-23.04-58.88 2.56-81.92 23.04-23.04 58.88-25.6 81.92-2.56z m0 0"  p-id="4623"></path></svg>
                    <svg
                        @touchstart="handleRubber($event)"
                        class="draw-icon rubber"
                        :style="{fill: changeDrawAction == 2 ? color: ''}"
                        t="1573032058097"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5340" width="128" height="128"><path d="M604.536246 736.222443l288.794439-282.693148-287.777557-270.999007-270.999007 283.201589z m-72.70705 71.181728L264.389275 539.455809 145.922542 660.973188l164.734856 164.734856a50.844091 50.844091 0 0 0 36.099305 14.744786h107.789474a101.688183 101.688183 0 0 0 71.181728-28.981132z m109.314796 35.082423h254.220457a50.844091 50.844091 0 0 1 0 101.688183H346.248262a152.532274 152.532274 0 0 1-107.789474-44.742801l-164.734856-164.734856a101.688183 101.688183 0 0 1 0-142.363456l457.596823-480.476663a101.688183 101.688183 0 0 1 143.380337-3.559086l287.269117 270.999007a101.688183 101.688183 0 0 1 4.067527 143.888778l-3.050646 3.050646z" p-id="5341"></path></svg>
                    <svg
                        v-if="isReplay"
                        @touchend="replay()"
                        class="draw-icon replay"
                        :style="{fill: isReplay ? color: ''}"
                        t="1573194950939"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1781" width="128" height="128"><path d="M462.272 312.896l0 298.624 248.896 0L711.168 528.576 541.952 528.576l0-215.68L462.272 312.896zM512 64C403.776 64 304.448 102.4 227.008 166.336l21.376-82.048L175.168 64l-40.96 157.056L113.856 299.52l73.28 20.224 155.712 42.88 20.416-78.528-90.56-24.96C335.168 200.064 419.264 163.52 512 163.52c192.448 0 348.48 156.032 348.48 348.48S704.448 860.416 512 860.416 163.648 704.448 163.648 512c0-9.856 2.048-19.136 2.88-28.8L65.92 474.816C64.96 487.104 64 499.456 64 512c0 247.424 200.576 448 448 448s448-200.576 448-448S759.424 64 512 64z" p-id="1782"></path></svg>
                    
                    <svg
                        v-else
                        :style="{fill: !isReplay ? color: ''}"
                        @touchend="finish()"
                        class="draw-icon finish"
                        t="1573621583188"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1055" width="128" height="128"><path d="M678.528 642.304c0 17.6-14.4 32-32 32h-268.992a32 32 0 0 1-32-32V381.696a32 32 0 0 1 32-32h268.992c17.6 0 32 14.4 32 32v260.608z" p-id="1056"></path><path d="M1015.552 512.128a502.656 502.656 0 0 0-503.68-503.68 502.208 502.208 0 0 0-356.096 147.264 502.016 502.016 0 0 0-147.328 356.416 500.288 500.288 0 0 0 146.816 356.736 499.584 499.584 0 0 0 356.544 146.688c277.312-2.816 503.744-226.24 503.744-503.424z m-947.968 0a444.288 444.288 0 0 1 444.288-444.544c246.976 0 447.296 200.128 447.296 444.544 0 244.032-200.32 444.416-447.296 444.416a442.304 442.304 0 0 1-444.288-444.416z" p-id="1057"></path></svg>
                    <!-- 三角形 -->
                    <div  v-show="showMatching" class="triangle"></div>
                    <!-- 颜色  直线 虚线   粗细 -->
                    <div v-show="showMatching" class="draw-matching-wrap">
                        <div class="writing-style">
                            <span 
                            v-for="item of penWriting"
                            :key="item.lable"
                            @touchstart="handlePenWriting($event,item.value)"
                            :class="{active: writing == item.value}"
                            > {{item.lable}}</span>
                        </div>
                        <div class="colors">
                            <span 
                                v-for="item of penColor"
                                :key="item" 
                                @touchstart="handlePenColor($event,item)"
                                :class="{active: color == item}"
                            >
                                <i :style="{background: item}"></i>
                            </span>
                        </div>
                        <div class="pen-weight">
                            <span 
                                v-for="item of penWeight"
                                :key="item.lable"
                                @touchstart="handlePenWeight($event, item.value)"
                                :class="{active: weight == item.value}"
                                > {{item.lable}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  蒙层 -->
        <div class="mask"
            :style="{width: options.width + 'px', height: options.height + 'px'}"
            @touchstart.stop="handleMatching($event)" 
            @touchmove.stop="()=>{}"
            @touchend.stop="()=>{}"
            v-show="showMatching"
        >
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

import { BlgSocket } from './workerSend'
    export default {
        name: 'crop',
        //1. props 验证   2.支持pc
        props:[
            'type',
            'isReplay'
          ],
        data() {
            return {
                // 颜色
                penColor: [
                    '#000',
                    '#f14864',
                    'blue',
                    'lightblue',
                    'green',
                    'greenyellow',
                    'orange',
                    'red',
                ],
                // 笔的粗细
                penWeight: [
                    {lable: '细笔', value: 1},
                    {lable: '粗笔', value: 2},
                    {lable: '超粗笔', value: 4}
                ],
                // 书写风格
                penWriting: [
                    {lable: '书写', value: 1},
                    {lable: '直线', value: 2},
                    {lable: '虚线', value: 3},
                    {lable: '虚直线', value: 4}
                ],

                // ----------------------------------------------------------------------



                changeDrawAction: 3,
                // penColor: '',
                //   penColor: '',
                debug: true, // debug
                logLevel: 0,
                logModule: 'rect', // 日志模块
                
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
                weight: 2,
                writing: 1, // 书写线的 风格
                color: '#f14864',  // 颜色
                showMatching: false,
                // 三个操作按钮  默认不显示的
                // touchBar: null,
                // paintBrush: null,
                // revokeBar: null,
                // rubberBar: null
               
            }
        },
        methods: {
            init(img){
                // 连接--socket
                this.socketInit()
                // 初始化默认值
                this.changeDrawAction = 3 // 默认动作是 拖动和缩放图片 1 画笔 2橡皮
                this.pointLine = [] // 线 
                this.pointList = [] // 线 list
                this.points = [] // 四方形 截图的点
                this.lines = [] // 四方形 截图的线
                this.isReplay = this.isReplay || false // 是否是回放
                this.recordData = [] //  记录
                this.color = '#f14864' //  颜色



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
                this.ctx.strokeStyle = this.color
                this.renderCanvas()

                if (this.isReplay) {
                    this.replay()
                }
            },
            renderCanvas() {
                const { width, height } = this.options
                // 避免预览到背景
                // canvas init
                this.ctx.clearRect(0, 0, width, height)
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
                    //  {lable: '书写', value: 1},
                    // {lable: '直线', value: 2},
                    // {lable: '虚线', value: 3},
                    // {lable: '虚直线', value: 4}
                    // 虚线
                    if (el.writing == 3 || el.writing == 4) {
                        ctx.setLineDash([5, 10])  // 虚线
                    } else {
                        ctx.setLineDash([]) // 实线
                    }
                    ctx.strokeStyle = el.color
                    const points = el.pointLine
                    for (let i = 0; i < points.length; i++) {
                        const element = points[i]
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
                this.ctx.drawImage(image.element, image.x, image.y, image.width, image.height)
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
                //     x: this.limit(touch.pageX - rect.left, 2, width - 2) ,
                //     y: this.limit(touch.pageY - rect.top, 2, height - 2) ,
                // }


                // TODO: 为什么定位了  位置就不准了  我猜测是  偏移位置也需要  缩放
                const boundingClientRect = this.boundingClientRect
                const touch = e.touches[0]
                const { width, height } = this.options
                const coordinate = {
                    // x: this.limit(this.getInt(touch.pageX), 2, width - 2),
                    // y: this.limit(this.getInt(touch.pageY), 2, height - 2)
                    // 基于屏幕的 0 的位置
                    // 需要 算出来 当前画板的 左上角位置  减 画板位置 
                    x: this.limit(touch.pageX - boundingClientRect.left, 2, width - 2),
                    y: this.limit(touch.pageY - boundingClientRect.top, 2, height - 2)
                }
                // move 到边
                return coordinate
            },
            // 所有的点击事件
            finish() {
                this.changeDrawAction = 3
                // this.socketInstance.write({data: {}, event: 'writeIn'})
            },
            handleMatching(e) {
                if(!this.sendData(e, 8)) return
                // 1）touches：当前位于屏幕上的所有手指的列表。
                // 2）targetTouches：位于当前DOM元素上手指的列表。
                // 3）changedTouches：涉及当前事件手指的列表。 
                if ( this.showMatching) {
                    this.showMatching = false
                } else {
                    this.changeDrawAction = 1
                    this.showMatching = true
                }
            },
            //  笔粗细 8
            handlePenWeight(e, weight) {
                if(!this.sendData(e, 11, weight)) return
                this.weight = weight
            },
            // 
            handlePenColor(e, color) {
                if(!this.sendData(e, 10, color)) return
                this.color = color
            },
            handlePenWriting(e, writing) {
                if(!this.sendData(e, 9, writing)) return
                // 目前只有直线和 曲线
                this.writing = writing
            },
            handlePen(e) {
                if(!this.sendData(e, 7)) return
                this.log('点击了画笔')
                if (this.changeDrawAction == 1) {
                    this.changeDrawAction = -1
                } else {
                    this.changeDrawAction = 1
                }
                // 这个有e吗    
            },
            handleRubber(e) {
                if(!this.sendData(e, 6)) return
                // alert(123)
                this.log('点击了橡皮')
                if (this.changeDrawAction == 2) {
                    this.changeDrawAction = -1
                } else {
                    this.changeDrawAction = 2
                }
            },
            // https://blog.csdn.net/qq_42014697/article/details/80728463  两指缩放
            handleStart(e) {
                // this.clearCtx2()
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
            handleMove (e) {
                // 判断是不是 读的一端
                if(!this.sendData(e, 2)) return
                // 判断是不是 第一次触发 新动作
                const touches = e.touches
                const image = this.image
                const currentPoint = this.getCoordinateByEvent(e)
                 const drawPoint = this.drawPoint
                const lineWidth = this.limit(this.weight, 1, 15)
                // 矩形
                if (this.changeDrawAction == 3) {
                    this.clearCtx2()
                    // console.log('矩形')
                    this.log('矩形模式', 'red', 2, 'rect')
                    const ctx = this.ctx2
                    const firstPoint = this.firstPoint
                    ctx.beginPath()
                    ctx.strokeStyle = this.color
                    ctx.lineWidth = lineWidth
                    ctx.rect(firstPoint.x, firstPoint.y, currentPoint.x - this.firstPoint.x, currentPoint.y - this.firstPoint.y)
                    ctx.stroke()
                    // 画辅助线
                    return
                }




                 // 画笔
                if (this.changeDrawAction == 1) {
                    
                    /**
                     *  画笔 
                     */
                    // 划线
                    // 先实现划线
                    //  画 相对于 画布  // 存 相对于 画布
                    // 屡一下   -- 这个东西  想对于画布  在图片在哪里 ===== 根据图片的位置还原 画布位置
                    const ctx = this.ctx
                    const color =  this.color
                    ctx.lineCap = 'round'
                    // 解决 突然同步-- 这两个属性化石上个回放的属性 还有 笔的  很多问题  突然杀入  应尽量避免这个问题
                    ctx.strokeStyle = color
                    ctx.lineWidth = lineWidth
                    
                    // 划线  第一个点 用beginPath
                    if (this.writing == 2 || this.writing == 4) { // 是直线
                        const ctx = this.ctx2
                        // 直线 有延迟
                        // const ctx = this.ctx2
                        //  可以考虑把 -- 
                        //  {lable: '书写', value: 1},
                        // {lable: '直线', value: 2},
                        // {lable: '虚线', value: 3},
                        // {lable: '虚直线', value: 4}
                        // this.renderCanvas() //  能不能在 第二个canvas 上画
                        this.clearCtx2()

                        if (this.writing == 4) {
                            ctx.setLineDash([5, 10]) // 参数是一个数组，数组元素是数字。虚线是实虚交替的，这个数组的元素用来描述实边长度和虚边的长度
                        } else {
                            ctx.setLineDash([])
                        }

                        ctx.beginPath()
                        ctx.strokeStyle = this.color
                        ctx.lineWidth = lineWidth
                        ctx.moveTo(this.firstPoint.x, this.firstPoint.y)
                        ctx.lineTo(currentPoint.x, currentPoint.y)
                        ctx.stroke()
                        //  this.drawPoint  用这个变量的原因是  起点和最后一点 都不在 move事件上
                        if (this.pointLine.length === 0) {
                            this.pointLine.push({
                                x: drawPoint.x - image.x,
                                y: drawPoint.y - image.y
                            })
                        }
                    } else {
                        // console.log('----------90909090--------------------------------')
                        // console.log(drawPoint)
                        if (this.pointLine.length == 0) {
                            if (this.writing == 3) {
                                ctx.setLineDash([5, 10])
                            } else {
                                ctx.setLineDash([])
                            }
                            ctx.beginPath()
                            ctx.lineWidth = lineWidth                
                            ctx.moveTo(drawPoint.x, drawPoint.y)
                            ctx.lineTo(currentPoint.x, currentPoint.y)
                        } else {
                            ctx.lineTo(currentPoint.x, currentPoint.y)
                            ctx.stroke()
                        }

                        //  this.drawPoint  用这个变量的原因是  起点和最后一点 都不在 move事件上
                        this.pointLine.push({
                            x: drawPoint.x - image.x,
                            y: drawPoint.y - image.y
                        })
                    }
                    this.drawPoint = currentPoint
                    return
                }
                // 橡皮
                if (this.changeDrawAction == 2) {
                    const { x, y } = currentPoint
                    const radius = 12
                    this.clearCtx2()
                    this.renderRubber(x, y, radius)

                    if (this.type == 1 || this.isReplay) { // 回放 或则 读  橡皮不做判断
                        return
                    }

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
                        const maxPonit = this.restPoint({ x: element.maxX, y: element.maxY }, image, scale)
                        const minPonit = this.restPoint({ x: element.minX, y: element.minY }, image, scale)
                        //  直线如果距离太小也会 被拦下来  处理放在了 计算 min和max 了
                        const time1 = new Date().getTime()
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
                                this.removeLine(index)
                                this.sendData(e, 4, index)
                                break
                            }

                            // 判断线 不是最后一个
                            if (lineLength == 1 || j == lineLength - 1) break
                            const secondItem = pointLine[j + 1]
                            // 如果 离上一个点差的很远 ---  用线 检测
                            if (this.getDistance({pageX: item.x, pageY: item.y}, {pageX: secondItem.x, pageY: secondItem.y}) >= lineDis ) {
                                // this.log('差的很远的的一条线 橡皮离这个线的距离')
                                const dis = this.distanceOfPoint2Line(originPoint, this.restPoint(secondItem, image, scale), {x, y})
                                // this.log('点到线的距离为： ' + dis)
                                if (dis <= lineDis) {
                                    this.removeLine(index)
                                    this.sendData(e, 4, index)
                                    break
                                }
                            }
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

                // 缩放 有行为动作 可以定义一个变量  active = 1234  不是 -1  就是 有行为
                if (touches.length > 1 && this.changeDrawAction == -1) {
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
                
                // 这是干啥的--画=>图片和 线  移动
                const type = this.startPoint ? this.startPoint.type : null
                if (type) { // && this.getCoordinateByEvent(e)
                    this[type](currentPoint)
                }
            },

            handleEnd(e){
               //  结束对 延迟的 感知很小-- 可以把计算量大的都移动到 这部分来
                if(!this.sendData(e, 3)) return
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
                    //  初始化第一个  --不能默认0  有负值存在
                    let maxX = array[0].x, maxY = array[0].y,  minX = array[0].x, minY = array[0].y
                    for (let index = 1; index < array.length; index++) {
                        const element = array[index]
                        if (element.x < minX) {
                            minX = element.x
                        }
                        if (element.y < minY) {
                            minY = element.y
                        }
                        if (element.x > maxX) {
                            maxX = element.x
                        }
                        if (element.y > maxY) {
                            maxY = element.y
                        }
                    }
                     // 会有 明明在范围内 检测不到--- 范围太小了 加一点
                    const offset = 4
                    const pointObj = {
                        pointLine: this.pointLine,
                        scale: this.scale, //  e.scale || this.scale, 为什么 e.scale
                        lineWidth: this.weight,
                        color: this.color,
                        writing: this.writing,
                        // rotateAngle : this.rotateAngle,
                        maxX: maxX + offset,
                        maxY: maxY + offset,
                        minX: minX - offset,
                        minY: minY - offset,
                    }
                    this.pointList.push(pointObj)
                    this.pointLine = []
                }

                /**
                 *  结束事件 对延迟没什么要求------ 
                 */
                // 清除第二canvas 画布
                if (this.changeDrawAction == 2 || this.writing == 2 || this.writing == 4) {
                    this.clearCtx2()
                }

                // 直线的 橡皮画在-- 第二个canvas上
                if(this.changeDrawAction == 1 && (this.writing == 2 || this.writing == 4)) {
                    this.renderCanvas()
                }
                // 解决橡皮插  会改变全局ctx.strokeStyle
                if(this.changeDrawAction == 2) {
                   this.ctx.strokeStyle = this.color
                }
                
            },
            scaleImage(scale) {
                this.scale = scale
                const image = this.image

                const width = image.clientWidth * scale
                const height = image.clientHeight * scale

                this.image.x += (image.width - width) / 2
                this.image.y += (image.height - height) / 2
                this.image.width = width
                this.image.height = height

                this.renderCanvas()

            },
            removeLine(index) {
                this.pointList.splice(index, 1)
                this.renderCanvas()
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
                && this.getDistance({pageX: x, pageY: y}, {pageX: this.arc.x, pageY: this.arc.y}) >  this.arc.r - ctx.lineWidth / 2)
            },
            // start 就触发
            getPointByCoordinate({x, y}) {
                this.log('触发检测 点击区域')
                if (this.changeDrawAction !== -1) {
                    return
                }
                const image = this.image
                let t = {}
                // let index = 0
                //  旋转
                if (this.checkRegion(x, y, image)) {
                    t.offsetX = x - image.x
                    t.offsetY = y - image.y
                    t.type = 'handleImageMove' 
                }
                return t
            },
            // 求两点之间的 距离
            getDistance(p1, p2) {
                const x = p2.pageX - p1.pageX,
                    y = p2.pageY - p1.pageY
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
            log(value, color='default', level=1, module) {
                //-- 打印相应模块  和 等级的 log
                if (this.logModule && module !== this.logModule) return
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

                /**
                 *  类型： 
                 *  1. 读权限 不做任何操作 不会发送 socket ( 不做橡皮检测  不做缩放检测)  原生操作要全部屏蔽掉
                 *  2. 本体写 (橡皮检测  缩放检测)
                 *  3. 和读权限 多一个 发送 socket
                 * 
                 */
            //    return false
                // this.type  1 读  2 写
                // console.log(this.options)
                this.log(this.type == 1 ? '读读读读读读读读读读': '写写写写写写写写写写')
                this.log('发送数据---actionTypes:' + actionTypes + ',value:' + value)

                this.$emit('change', {e, actionTypes, value})
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
                if (this.isReplay) {  // 是读  并且  原生操作   中断执行
                    return false
                }

                // 是start move end 才需要记录坐标点
                if (actionTypes == 2 || actionTypes == 1) {
                    value =  Array.from(e.touches).map(e => ({pageX: e.pageX, pageY: e.pageY}))
                }

                // 优化数据结构 加快传输  我觉得没必要 
                const data = {
                    // 不放进来 很多东西 要写三遍 
                    value,
                    actionTypes
                }
                if (actionTypes == 5) {
                    // 画笔  起笔  缩放
                    data.scale = this.scale
                }
                // this.recordData.push(data)
                this.socketInstance.write({data, event: 'message'})
                return true
            },
            /**
             *  return  橡皮canvas ctx  笔记canvas ctx    canvas  getBoundingClientRect
             */
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
                if (this.type == 2) return data
                if (Array.isArray(data)) return data.map(item => ({ pageX: item.pageX * this.kScale, pageY: item.pageY * this.kScale }))
                return data * this.kScale
            },
            replay(id) {
                if (this.type == 1) {
                    return
                }
                if (this.RAFID) {
                    return
                }
                // if (this.RAFID) {
                //     window.cancelAnimationFrame(this.RAFID)
                //     this.RAFID = null
                // }
                 

                // 先克隆数据  然后 初始化 所有状态
                // -----
                // const dataJSON = JSON.parse(JSON.stringify(this.recordData))
                // 要捕捉所有动作
                // 初始化
                const dataJSON = require('./time-1573622474918.json')
                const len = dataJSON.length
                let startTime = null
                // console.log(dataJSON[0])
               this.replayIndex = 0 // 会迁入 初始化
                // console.log(dataJSON)
                const step =  (timestamp) => {
                    const data = dataJSON[this.replayIndex]
                    const time = dataJSON[this.replayIndex].time

                    // 初始化时间
                    if (!startTime) startTime = timestamp
                    const  progress = timestamp - startTime
                    // 差时
                    // 暂停时间 
                    if (
                        // true
                        progress >= time 
                    ) {
                        this.replayIndex += 1
                        this.socketInstance.write({data: data.data, event: 'message'})
                        // 分发数据
                        this.distributeEvent(data.data)
                    }
                    if (this.replayIndex >= len) {
                        this.isReplay = false
                        return
                    }
                    this.RAFID = window.requestAnimationFrame(step)
                }
                this.RAFID = window.requestAnimationFrame(step)
                return () => {
                    window.cancelAnimationFrame(this.RAFID)
                    this.RAFID = null
                    // return
                }
            },
            distributeEvent(data) {
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
                    * 8 调色板
                    * 9 线段风格
                    * 10 笔颜色
                    * 11 笔粗细
                    */ 
                const { actionTypes, value } = data
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
                        this.handleEnd()
                        this.log('结束', 'red', 3)
                        break
                    case 4: 
                        this.removeLine(value)
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
                    case 9: 
                        this.log('线段风格', '#f60rrr', 3)
                        this.handlePenWriting({}, value)
                        break
                    case 10: 
                        this.log('笔颜色', '#f60rrr', 3)
                        this.handlePenColor({}, value)
                        break
                    case 11: 
                        this.log('笔粗细', '#f60rrr', 3)
                        this.handlePenWeight({}, value)
                        break
                    default:
                        break
                }
            },
            socketInit() {
                // 初始化 socket
                //  socketInit('ws://192.168.81.126:3000/')
                this.socketInstance = new BlgSocket({
                    url: 'ws://192.168.81.126:3000/',
                    writeEvent: ['login', 'message', 'toOne', 'writeIn'],
                    readEvent: ['message', 'toOne']
                })

                this.socketInstance.write({data: {userid: new Date().getTime(), username: this.type == 2 ? '老师' : '学生', type: this.type}, event: 'login'})

                //   还原坐标位置  有两种方式 - 1.求出来一个缩放比算出位置   2. 把图片定位好 根据图片算出位置
                //   目前两种都用到了 1. 画图 和 橡皮 图片拖动   2. 复原老师笔记
                this.socketInstance.read((e) => {
                    // console.log(e)
                    // 暂时只有 --
                    if (e.event == 'message') {
                        // 分发数据
                        this.distributeEvent(e.data)
                    } else if (e.event == 'toOne') {
                        //  望=给这个 同学同步数据
                        // 当前有没有在 正在画数据
                        if (this.type == 2) {
                            // 老师发数据
                            const data =  {
                                id: e.data.id,

                                pointList: this.pointList, // 线 集合
                                pointLine: this.pointLine, // 点 集合
                                changeDrawAction: this.changeDrawAction, // 目前动作
                                scale: this.scale, // 缩放
                                imageX: this.image.x, // 
                                imageY: this.image.y, // 图片你位置
                                drawPoint: this.drawPoint, // 前一个点

                                weight: this.weight, // 线粗细
                                writing: this.writing, // 书写线的 风格
                                color: this.color,  // 颜色
                                showMatching: this.showMatching, // 调色盘
                            }
                            this.socketInstance.write({data, event: 'toOne'})
                            this.log('给新加入的学生推送自己的状态数据', 'red', 5)
                            // console.log('发出数据')
                        } else {
                            // 学生收数据
                            this.log('数据还原', 'red', 5)
                            const originData = e.data
                            this.changeDrawAction = originData.changeDrawAction

                            // 复原数据 原始数据没有做任何更改
                            this.pointList = originData.pointList
                            this.pointLine = originData.pointLine
                            // 原始数据
                            // console.log(this.image)
                            this.image.x = this.dataScale(originData.imageX)
                            this.image.y = this.dataScale(originData.imageY)

                            // 刚刚 初始化 drawPoint 是没有的
                            if (originData.drawPoint) {
                                this.drawPoint = {
                                    x: this.dataScale(originData.drawPoint.x),
                                    y: this.dataScale(originData.drawPoint.y)
                                }
                            }

                            this.weight = originData.weight
                            this.writing = originData.writing
                            this.color = originData.color
                            this.showMatching = originData.showMatching
                            // 自带renderCanvas
                            this.scaleImage(this.dataScale(originData.scale))
                        }
                    } 
                })
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


        }
    }
</script>