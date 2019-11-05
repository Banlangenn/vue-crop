<template>
    <div ref="mountNode" 
        class="mount-node" 
        @touchstart="handleStart($event)"
        @touchmove="handleMove($event)"
        @touchend="handleEnd($event)"
        style="overflow: hidden;"
    >
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
import io from 'socket.io-client'
import workerSend from './workerSend'
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
                straightLine: false, // 直线
                debug: true, // debug
                logLevel: 2,
                type: '2',
                // ready: false,
                noImage: true,
                // ctx: null,
                // options: null,
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
        watch: {
            shape() {
                if (!this.noImage) {
                    this.renderCanvas()
                }
            },
            rotation() {
                //  内旋转 外旋转 只能有一个
                if (!this.noImage && !this.rotateBtn && !this.drawAction) {
                    this.rotateAngle = this.rotation
                    this.renderCanvas()
                }
            }
        },
        methods: {
            init(img){
                // 初始化默认值
                this.pointLine = [] // 线 
                this.pointList = [] // 线 list
                this.points = [] // 四方形 截图的点
                this.lines = [] // 四方形 截图的线  


                const clientW = img.width,
                clientH = img.height,
                { width, height } = this.options
                let currentW = clientW,
                    currentH = clientH,
                    k = 1 // contain 时的缩放比
                // contain 图片
                if (clientW > width) {
                    // alert('12123')
                    currentW = width
                    k = currentW / clientW
                    currentH = k * clientH
                }
                if (currentH > height) {
                    currentH = height
                    k = currentH / clientH
                    currentW = k * clientW
                }
                // 针对小图片
                const minNum = 120
                if (clientW < minNum && currentH < minNum) {
                    currentW = minNum
                    k = currentW / clientW
                    currentH = k * clientH
                }
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
                this.arc = {
                    x: corePoint.x,
                    y: corePoint.y,
                    r: this.maxRadius  / 2
                }
                this.cropper = {
                    x: (width - currentW / 2) / 2,
                    y: (height - currentH / 2) / 2,
                    width: currentW  / 2,
                    height: currentH / 2
                }

                const interval = 8 // 间隔
                let number = 0  //  按钮数量

                //  三个 if  更好 内聚 --
                // const rotateBtn = this.rotateBtn === undefined || this.rotateBtn 
                // const revokeBtn = this.revokeBtn  === undefined  || this.revokeBtn
                const penBtn = this.penBtn === undefined  || this.penBtn 
                const rubberBtn =  this.rubberBtn  === undefined  || this.rubberBtn
                // if (rotateBtn) {
                //     this.touchBar = {
                //         x: width - 30 - 7,
                //         y: 10,
                //         width: 30,
                //         height: 30
                //     }
                //     number ++ 
                // }
                // width  画布宽度
                if (penBtn) {
                    this.paintBrush = {
                        x: width - 30 - 7,
                        y: 10 + ( 30 + interval) * number,
                        width: 30,
                        height: 30
                    }
                    number ++ 
                }
                if (rubberBtn) {
                    this.rubberBar = {
                        x: width - 30 - 7,
                        y: 10 + (30  + interval ) * number,
                        width: 30,
                        height: 30
                    }
                    number ++ 
                }
                // if (revokeBtn) {
                //     this.revokeBar = {
                //         x: width - 30 - 7,
                //         y: 10 + (30  + interval ) * number,
                //         width: 30,
                //         height: 30
                //     }
                //     number ++ 
                // }
               
                this.renderCanvas()
            },
            renderCanvas() {
                const { width, height } = this.options
                // 避免预览到背景
                // canvas init
                this.ctx.clearRect(0, 0, width, height)
                if (!this.averageColor) {
                    //  只会跑一次
                    this.averageColor = this.getImageColor(this.ctx.getImageData(this.corePoint.x - 25,  this.corePoint.y - 25, 50, 50).data)
                }
               
                // // 背景 // 考虑用css 实现
                // this.fillBackground()
                //  处理出片
                this.fillImage()
                // console.timeEnd('fillImage')
                this.drawPointFn(this.ctx)

                // const shape = this.shape || 'rect'
                // if (shape === 'arc') {
                //     this.fillArcCropper()
                // } else  if (shape === 'rect') {
                //     this.updatePoint()
                //     this.fillRectCropper()
                // }
                //  console.time('drawTouchBar')

                // this.drawTouchBar(this.touchBar)
                this.drawPaintBrush(this.paintBrush)
                // this.drawRevokeBar(this.revokeBar)
                this.drawRubberBar(this.rubberBar)
                // 写的 线
                // console.timeEnd('drawTouchBar')
                // this.preview()
            },
            // rotatePoint({ pageX, pageY }, r, angle){
            //     angle = Math.PI / 180 * angle
            //     return { 
            //         x: pageX + Math.cos(angle) * r,
            //         y: pageY + Math.sin(angle) * r
            //     }
            // },
            drawPointFn(ctx, quality = null, cropper = this.image, image = this.image){
                const pointList = this.pointList
                // const image = this.image
                if (pointList.length == 0) return
                ctx.lineCap = 'round'
                pointList.forEach(el => {
                    const scale = this.scale / el.scale
                    const lineWidth = this.limit(el.lineWidth * scale, 1, 15)
                    ctx.beginPath()
                    ctx.strokeStyle = el.color
                    ctx.lineWidth = quality ? lineWidth * 2 : lineWidth
                    // this.log(lineWidth)
                    const array = el.pointLine
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i]
                        const originPoint = this.restPoint(element, image, scale)
                        if (i === 0) {
                            // 要相对于图片的位置 才是对的  不能相对于 画布
                            if (quality) {
                                ctx.moveTo((originPoint.x - cropper.x) * quality , (originPoint.y - cropper.y) * quality)
                            } else {
                                ctx.moveTo(originPoint.x, originPoint.y)
                            }
                            // ctx.stroke()
                            continue
                        }
                        if (quality) {
                            ctx.lineTo((originPoint.x - cropper.x) * quality, (originPoint.y - cropper.y) * quality)
                        } else {
                            ctx.lineTo(originPoint.x, originPoint.y)
                        }
                    }
                    ctx.stroke()
                })
            },
            drawPaintBrush(touchBar) {
                if (!touchBar) return
                const {x, y} = touchBar 
                const ctx = this.ctx,
                // touchBar = touchBar,
                color = this.color || this.averageColor
                ctx.strokeStyle = color
                ctx.lineWidth = 2
                ctx.lineCap = 'round'
                ctx.beginPath()
                ctx.moveTo(x + 20, y + 5)
                ctx.lineTo(x + 24, y +  9)
                ctx.lineTo(x + 12, y + 21)
                ctx.lineTo(x + 7, y + 22)
                ctx.lineTo(x + 8, y + 17)
                // ctx.lineTo(x + 20, y + 5)
                ctx.closePath()
                if (this.drawAction) {
                    ctx.fillStyle = color
                    ctx.fill();
                }
                // ctx.stroke()
                ctx.moveTo(x + 5, y + 26)
                ctx.lineTo(x + 25, y + 26)
                 ctx.stroke()
            },
             drawRevokeBar(touchBar) {
                if (!touchBar) return
                const {x, y} = touchBar
                //  const {x, y, width} = touchBar   //  用宽 算个比例
                const ctx = this.ctx,
                // touchBar = touchBar,
                color = this.color || this.averageColor
                ctx.strokeStyle = color
                ctx.lineWidth = 2
                ctx.lineCap = 'round'
                ctx.fillStyle = color
                ctx.beginPath()
                ctx.moveTo(x + 15, y + 12)
                ctx.lineTo(x + 15, y + 8)
                ctx.lineTo(x + 7, y + 15)

                ctx.lineTo(x + 15, y + 22)
                ctx.lineTo(x + 15, y + 18)
                ctx.stroke()
                // ctx.fillStyle = color

     
                // ctx.fill()
                ctx.beginPath()
                ctx.arc(x + 15,  y + 24, 12, -Math.PI/2, -Math.PI/180 * 18, false)
                ctx.arc(x + 15,  y + 35, 17,-Math.PI/180 * 45, -Math.PI/2, true)
                ctx.stroke()
                // ctx.fillStyle = color
                // ctx.fill()

            },
            drawRubberBar(touchBar) {
                if (!touchBar) return
                const { x, y, width, height } = touchBar
                //  const {x, y, width} = touchBar   //  用宽 算个比例
                const ctx = this.ctx
                const radius = 12 // 8
                // touchBar = touchBar,
                const color = this.color || this.averageColor
                ctx.strokeStyle = color
                ctx.fillStyle = color
                // ctx.lineWidth = 3
                // ctx.lineCap = 'round'
                // ctx.fillStyle = color
                ctx.beginPath()
                ctx.arc(x + width / 2 , y + height / 2, radius, 0, Math.PI * 2, false)
                // ctx.fill()
                if (this.rubberAction) {
                    ctx.fill()
                }
                ctx.stroke()
            },
            drawTouchBar(touchBar) {
                if (!touchBar) return
                const ctx = this.ctx,
                color = this.color || this.averageColor,
              
                x = touchBar.x + touchBar.width * 0.6,
                y =  touchBar.y + touchBar.height * 0.64,
                r = touchBar.width * 0.41,
                alpha = 6,
                h1 = touchBar.width * 0.1,
                h2 =  touchBar.width * 0.18
                ctx.lineWidth = 2
                ctx.strokeStyle = color
                // 填充颜色
                ctx.fillStyle = color
                // strokeRect  fillRect
                ctx.fillRect(x - touchBar.width / 6, y - touchBar.height / 6, touchBar.width * 0.43, touchBar.height * 0.43)
                ctx.beginPath()
                ctx.arc(x, y, r, Math.PI/180 * 180, -Math.PI/2 + alpha, false)
                ctx.stroke()
                if(alpha < 2*Math.PI) {
                    const x1 = x + (r - h1) * Math.sin(alpha),
                    y1 = y - (r - h1) * Math.cos(alpha),
                    x2 = x + (r + h1) * Math.sin(alpha),
                    y2 = y - (r + h1) * Math.cos(alpha),
                    x0 = (x1 + x2) / 2 + h2 * Math.sin(alpha + Math.PI/2),
                    y0 = (y1 + y2) / 2 - h2 * Math.cos(alpha + Math.PI/2)
                    ctx.beginPath()
                    ctx.moveTo(x0, y0)
                    ctx.lineTo(x1, y1)
                    ctx.lineTo(x2, y2)
                    ctx.fill()
                }
            },
            fillImage() {
                const image = this.image
                const ctx = this.ctx
                const rotateAngle = this.rotateAngle
                this.canvasRotate('img', ctx, image.element, rotateAngle, image.x, image.y, image.width, image.height)
                // ctx.drawImage(image.element, image.x, image.y, image.width, image.height)
            },
            updatePoint() {
                // 点中点和线 不用 执行 
                const c = this.cropper,
                nookSide =  this.nookSide,
                cWidth = c.x + c.width,
                cHeight = c.y + c.height,
                forecastX = cWidth - nookSide,
                forecastY = cHeight - nookSide
                this.points = [
                    {
                        x: c.x,
                        y: c.y,
                        width:nookSide,
                        height:nookSide,
                        diffX: 0,
                        diffY: 0
                    },
                    {
                        x: forecastX ,
                        y: c.y,
                        width:nookSide,
                        height:nookSide,
                        diffX: nookSide,
                        diffY: 0
                    },
                    {
                        x: forecastX ,
                        y: forecastY,
                        width:nookSide,
                        height:nookSide,
                        diffX: nookSide,
                        diffY: nookSide
                    },
                    {
                        x: c.x,
                        y: forecastY,
                        width:nookSide,
                        height:nookSide,
                        diffX: 0,
                        diffY: nookSide
                    }
                ]
                // 寻找四根线
                const lineHeight = nookSide / .7,
                halfLineHeight = lineHeight / 2
                this.lines = [
                     {
                        x: c.x,
                        y: c.y - halfLineHeight,
                        width: c.width,
                        height: lineHeight
                    },
                    {
                        x: cWidth - halfLineHeight,
                        y: c.y,
                        width: lineHeight,
                        height: c.height
                    },
                    {
                        x: c.x,
                        y: cHeight - halfLineHeight,
                        width: c.width,
                        height: lineHeight
                    },
                    {
                        x: c.x - halfLineHeight,
                        y: c.y,
                        width: lineHeight,
                        height: c.height
                    }
                ]
            },
            fillRectCropper() {
                const ctx = this.ctx,
                cropper = this.cropper,
                points = this.points,
                color = this.color || this.averageColor
                ctx.strokeStyle = color
                ctx.lineWidth = 2
                ctx.strokeRect(cropper.x, cropper.y, cropper.width, cropper.height)
                ctx.fillStyle = color
                const nookSide = this.nookSide / 8
                points.forEach((element, index) => {
                    ctx.save()
                    ctx.translate(element.x + element.diffX, element.y + element.diffY)
                    ctx.rotate(index * 90 * (Math.PI/180))
                    ctx.fillRect(-nookSide, -nookSide, element.height, nookSide * 2)
                    ctx.fillRect(-nookSide, -nookSide, nookSide * 2, element.width)
                    // if(index % 2 === 0){
                    //     ctx.fillRect(-nookSide, cropper.height / 2 - element.nookSide , element.nookSide / 4, element.nookSide * 2)
                    // } else {
                    //     ctx.fillRect(-nookSide, cropper.width / 2 - element.nookSide, element.nookSide / 4, element.nookSide * 2)
                    // }
                    ctx.restore()
                });
                // this.log(this.arc.r)
                // 圆

                
            },
            fillArcCropper() {
                const ctx = this.ctx
                ctx.beginPath()
                ctx.strokeStyle = this.color || this.averageColor
                ctx.lineWidth =  2 // this.nookSide / 0.7
                ctx.arc(this.arc.x, this.arc.y, this.arc.r, 0, Math.PI * 2)
                ctx.stroke();
            },
            handleArcMove({ x, y }) {
                this.arc.r = this.limit(this.getDistance({clientX: x, clientY: y}, {clientX: this.arc.x, clientY: this.arc.y}), this.nookSide * 2, this.maxRadius)
                this.renderCanvas()
            },
           // 填充背景
            fillBackground() {
                // 多个变量可以用逗号 一次赋值
                const { width, height } = this.options, 
                ctx = this.ctx
                ctx.save()
                ctx.fillStyle = '#fff'
                ctx.fillStyle = `rgba(0, 0, 0, ${this.bgOpacity})`
                ctx.fillRect(0, 0, width, height)
                 //蒙层 
                ctx.restore()
            },
            getNewCropper(touchX, touchY ,cropper) {
               return {
                    cropperWidth:(cropper.x + cropper.width) - touchX,
                    cropperHeight: (cropper.y + cropper.height) - touchY,
                    cropperX: touchX - cropper.x,
                    cropperY: touchY - cropper.y
               }
            },
            handlePointMove({ x, y }) {
                const cropper = this.cropper,
                newCropper = {},
                { cropperWidth, cropperHeight, cropperX, cropperY } = this.getNewCropper(x, y, cropper)
                switch (this.index) {
                    case 0:
                        newCropper.width =  cropperWidth
                        newCropper.height = cropperHeight
                        newCropper.x = x
                        newCropper.y = y
                        break;
                    case 1:
                    // x  不会动
                        newCropper.width =  cropperX
                        newCropper.height =  cropperHeight
                        newCropper.y = y
                        break;
                    case 3:
                    // y 不会动
                        newCropper.width = cropperWidth
                        newCropper.height = cropperY
                        newCropper.x = x
                        break;
                    case 2:
                        newCropper.width = cropperX
                        newCropper.height = cropperY
                        break;
                    default:
                        break;
                }
                this.renderCropper(newCropper)
            },
            handleLineMove ({ x, y }) {
                const cropper = this.cropper,
                newCropper = {},
                { cropperWidth, cropperHeight, cropperX, cropperY } = this.getNewCropper(x, y, cropper)
                switch (this.index) {
                    case 3:
                        newCropper.width = cropperWidth
                        newCropper.x = x // 限制
                        break;
                    case 0:
                        newCropper.height = cropperHeight
                        newCropper.y = y // 限制
                        break;
                    case 1:
                        newCropper.width = cropperX
                        break;
                    case 2:
                    // y 不会动
                        newCropper.height = cropperY
                        break;
                    default:
                        break;
                }
                this.renderCropper(newCropper)
            },
            renderCropper(newCropper) {
                 if (newCropper.width <= this.nookSide * 4 || newCropper.height <= this.nookSide * 4) {
                    return
                }
                this.cropper = {...this.cropper,...newCropper}
                this.renderCanvas()
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
                // const rect = e.target.getBoundingClientRect(),
                // touch = e.touches[0],
                // { width, height } = this.options,
                // coordinate = {
                //     x: this.limit(touch.clientX - rect.left, 2, width - 2) ,
                //     y: this.limit(touch.clientY - rect.top, 2, height - 2) ,
                // }

                // 修改
                const touch = e.touches[0],
                { width, height } = this.options,
                coordinate = {
                    // x: this.limit(this.getInt(touch.clientX), 2, width - 2),
                    // y: this.limit(this.getInt(touch.clientY), 2, height - 2)
                    x: this.limit(touch.clientX, 2, width - 2),
                    y: this.limit(touch.clientY, 2, height - 2)
                }
                // move 到边
                return coordinate
            },
            // https://blog.csdn.net/qq_42014697/article/details/80728463  两指缩放
            handleStart(e) {
                this.clearCtx2()
                // alert(isSocket)
         
                if(!this.sendData(e, 1)) return
                // alert(1)
                
                // 双指
                if (e.touches.length > 1 && !this.drawAction && !this.rubberAction) {
                    this.startTouches = e.touches
                    this.startPoint.type = null
                    return
                }
                // 单指  起点
                this.drawPoint = this.getCoordinateByEvent(e)
                this.startPoint = this.getPointByCoordinate(this.drawPoint) // 判断点了 主要点是否 有东西
                // --  画画
                if (this.drawAction) {  //  changeDrawAction bar 点中了
                    // 上次肯定会被清掉
                    this.pointLine = []
                    // 如果是直线 需要永远知道第一个点  在什么位置
                    this.firstPoint = this.drawPoint
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
            handleMove (e) {
                if(!this.sendData(e, 2)) return
               
                const touches = e.touches
                const image = this.image

                 // 画笔
                if (this.drawAction) {


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
                            this.pointLine.push({
                                x: drawPoint.x - image.x,
                                y: drawPoint.y - image.y
                            })
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
                        this.pointLine.push({
                            x: drawPoint.x - image.x,
                            y: drawPoint.y - image.y
                        })

                    }
                    this.drawPoint = current
                    return
                }
                // if (this.type == 2) return 目前是可以
                // 缩放 有行为动作 可以定义一个变量  active = 1234  不是 -1  就是 有行为
                if (touches.length > 1 && !this.drawAction && !this.rubberAction) {
                    if (this.type == 1) {
                        return
                    }
                    let startTouches = this.startTouches
                    let k; // 最终的缩放系数
                    const scale = this.scale;
                    // const offset = e.deltaY / 800;
                    k = (this.getDistance(touches[0], touches[1]) / this.getDistance(startTouches[0], startTouches[1]))
                    // k = k < 1 ? k / 10 : k * 10
                    k = k < 1 ? 1 / (1 + k / 80) : 1 + Math.abs(k) / 160
                    k = this.limit(k * scale, 0.5, 1.2);
                    // 直接通知对方 缩放比例 不用再计算-- 自己计算 容易出现两边不同步
                    this.sendData(e, 5, k)
                    this.scaleImage(k)
                    return
                }
               
                // 橡皮
                if (this.rubberAction) {
                    const { x, y } = this.getCoordinateByEvent(e)
                    const radius = 12
                    this.renderRubber(x, y, radius)

                    if (this.type == 1) {
                        return
                    }

                    /**
                     *  优化 橡皮移动过快造成 经过线 也没有删除
                     *  TODO:  橡皮移动过 收益不大  --影响检查速度
                     */
                    // 上一个点  复制一下 是为了保存当前点  --但是上一个点 检测还要用到
                    const preve = { x: this.drawPoint.x, y: this.drawPoint.y }
                    this.drawPoint = { x, y }
                    const isFast = this.getDistance({clientX: x, clientY: y}, {clientX: preve.x, clientY: preve.y}) >= radius

                    // const ctx  = this.ctx
                    const pointList = this.pointList
                    const image = this.image
                    this.log('进入橡皮先生' + '我是写', + '' + this.type)
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
                        // this.log(element.maxY)
                        //  this.log('不在这条线的矩形内-- 不检测跳过进入下一条')
                        // 是 直线  > == 2
                        // 是曲线 > 5
                        let number = 5  // 矩形宽高
                        // (maxPonit.x - minPonit.x > number  || maxPonit.y - minPonit.y > number) &&
                        //  直线如果距离太小也会 被拦下来
                        const time1 = new Date().getTime()
                        if ((maxPonit.x - minPonit.x > number  || maxPonit.y - minPonit.y > number) &&
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
                        // this.log('经过矩形优化后 ------------耗时：' + '' + (new Date().getTime() - time))
                        // this.log('在线的矩形内-- 开始检测','', 2)
                        const time2 = new Date().getTime()
                        for (let j = 0; j < lineLength; j++) {
                            const item = pointLine[j];
                            // const len = pointLine.length
                            // 点 复原坐标 1 
                            const originPoint = this.restPoint(item, image, scale)
                            // 首先用点检测
                            if (Math.abs(x - originPoint.x) <= lineDis && Math.abs(y - originPoint.y) <= lineDis) {
                                this.sendData(e, 4, index)
                                this.pointList.splice(index, 1)
                                this.renderCanvas()
                                // setTimeout(()=>{
                                // 直接通知对方 删除这个线 不用再判断
                                // })
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
                                    this.sendData(e, 4, index)
                                    this.pointList.splice(index, 1)
                                    this.renderCanvas()
                                    break
                                }
                            }
                            
                            // TODO:  橡皮移动过 收益不大  --影响检查速度
                            if (isFast) {
                                //  橡皮檫的距离大于 检测距离
                                const rubberDis = this.distanceOfPoint2Line(originPoint, preve, {x, y})
                                // this.log( '橡皮跑的比较快了,线离当前点的距离为' + rubberDis + 'px' + '', 'red', 2)
                                    if (rubberDis <= lineDis) {
                                    this.sendData(e, 4, index)
                                    this.pointList.splice(index, 1)
                                    this.renderCanvas()
                                    // this.log('--------------快速橡皮删除的', '', 2)
                                    break
                                }
                            }

                            
                        }


                        this.log(index + '这根线检测完毕 ：检测耗时' + '' + (new Date().getTime() - time2) + 'ms')
                        // 20
                    }
                    // this.log('橡皮的半径' + ('' + radius))
                    this.log( 'all所有线(' + pointList.length + 
                        ')：：：：ALL：： ：检测耗时' + '' + 
                        (new Date().getTime() - time) + 'ms', 'red', 2)
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
                // 有两种 动作  画笔 和 橡皮
                // TODO: 互相切换 可以用一个变量 优化掉 -----------------------------------
                if (this.changeDrawAction) {
                    //  this.DrawActionText = 'brush'
                    // this.DrawActionText = 'rubber'
                    switch (this.drawActionText) {  // 没写进去初始状态 DrawActionText
                        case 'brush':
                            // 笔
                            this.drawAction = !this.drawAction
                            this.rubberAction = false
                            break;
                        case 'rubber':
                            // 橡皮
                            this.rubberAction = !this.rubberAction // 没写进去初始状态 rubberAction
                            this.drawAction = false // 没写进去初始状态 rubb
                            break;
                        default:
                            break;
                    }
                    
                    this.renderCanvas()
                    this.changeDrawAction = false
                    return
                }
                // 搜集点 进入画笔
                // this.log(this.pointLine)
                if (this.drawAction && this.pointLine.length > 0) {
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
                    const offset = 2
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
                        scale: this.scale,
                        lineWidth: this.lineWidth,
                        color: this.color || this.averageColor,
                        rotateAngle : this.rotateAngle,
                        maxX,
                        maxY,
                        minX,
                        minY
                    }
                    this.pointList.push(pointObj)
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

            restPoint(pooint, image, scale) {
                return {
                    x: image.x + pooint.x * scale,
                    y: image.y + pooint.y * scale
                }
            },
            checkRegion(x,y,target) {
                return x > target.x &&
                    x < target.x + target.width &&
                    y > target.y &&
                    y < target.y + target.height
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
            getPointByCoordinate({x, y}) {
                const image = this.image,
                shape = this.shape || 'rect'
                let t = {}
                let index = 0
                //  旋转
                if (this.paintBrush && this.checkRegion(x, y, this.paintBrush)) {
                    this.log('点击了画笔')
                    this.changeDrawAction = true
                    this.drawActionText = 'brush'
                    return
                } else if (this.revokeBar && this.checkRegion(x, y, this.revokeBar) && !this.drawAction) {
                    this.log('点击了撤回')
                    this.pointList.pop()
                    this.renderCanvas()
                    return
                    
                } else if (this.rubberBar && this.checkRegion(x, y, this.rubberBar)) {
                    // 橡皮
                    this.log('点击了橡皮')
                    this.changeDrawAction = true
                    this.drawActionText = 'rubber'
                    return
                } else if (this.touchBar && this.checkRegion(x, y, this.touchBar)) {
                    // 旋转后的角度 每次
                    this.rotateAngle =  (this.rotateAngle + this.angle ) % 360
                    this.renderCanvas()
                    return
                } else if(this.drawAction){
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
            getImage(type='Base64', mimeType='image/jpeg', quality=1) {
                if (this.noImage) return
                const shape = this.shape || 'rect'
                let cropper = this.cropper
                if (shape == 'imgage') {
                    cropper = this.image
                } else if (shape === 'arc') {
                    // 圆形必须 2倍才好
                    cropper = {
                        x: this.arc.x - this.arc.r,
                        y: this.arc.y - this.arc.r,
                        width:  this.arc.r * 2,
                        height:  this.arc.r * 2
                    }
                }
                const image = this.image,
                pixelRatio = this.pixelRatio,
                types = {
                    Base64(canvas, mimeType, resolve) {
                        resolve(canvas.toDataURL(mimeType))
                    },
                    Blob(canvas, mimeType, resolve){
                        canvas.toBlob((blob)=> {
                            resolve(blob)
                        }, mimeType)
                    } 
                },
                w = cropper.width * quality ,
                h = cropper.height * quality,
                // 变量申请
                canvasDom =  document.createElement('canvas'),
                cCtx = canvasDom.getContext('2d')
                // if (!this.canvas) {
                //     this.canvas = document.createElement('canvas')
                //     this.cCtx = this.canvas.getContext('2d')
                    // const { mountNode } = this.$refs
                    // mountNode.appendChild(this.canvas)
                // }
                // const cCtx = this.cCtx
                canvasDom.width = w * pixelRatio
                canvasDom.height = h * pixelRatio
                cCtx.scale(pixelRatio, pixelRatio)
                cCtx.clearRect(0, 0, w, h)
                const rotateAngle = this.rotateAngle
                if (shape === 'arc') {
                    const radius = w / 2
                    cCtx.beginPath()
                    // 圆心是当前正方形的(画布) 中间
                    cCtx.arc(radius , radius, radius, 0, Math.PI * 2, false)
                    cCtx.clip()
                }
                //  圆形 只有 2 倍 缩放 数据是正确的
                // 旋转图片  这个是  主图旋转  /也是canvas 上 img
                this.canvasRotate('img', cCtx, image.element,
                    rotateAngle,
                    (image.x - cropper.x)  * quality,
                    (image.y - cropper.y)  * quality,
                    image.width * quality,
                    image.height * quality
                )
                // 在整个图片上 写写画画  再要框了--- 就是说框是---img
                this.drawPointFn(cCtx, quality, cropper)
                return new Promise((resolve, reject) => {
                    if(!types[type]) {
                        reject('type = Blob || Base64')
                        return  
                    }
                    const [left = '50%', top = '50%', size = 1, angle = 0] = this.position
                    if (this.imageWatermark) {
                        let watermarkImg = new Image()
                        watermarkImg.src = this.getFileSrc(this.imageWatermark)
                        watermarkImg.crossOrigin = 'anonymous'
                        watermarkImg.onload = () => { // 等到图片加载进来之后
                            const width = watermarkImg.width * size * quality / 100,
                            height = watermarkImg.height * size * quality / 100,
                            imgX  = ( w - width ) * parseInt(left) / 100 ,
                            imgY =  (h - height) * parseInt(top) / 100
                            this.canvasRotate('img', cCtx, watermarkImg, angle, imgX, imgY, width, height)
                            types[type](canvasDom, mimeType, resolve)
                        }
                        return
                    }             
                    if (this.textWatermark) {
                        const height = this.limit(size, 12, 100)
                        cCtx.font = height + 'px Georgia'
                        const text = this.textWatermark,
                        width = cCtx.measureText(text).width,
                        textX = (w - width * 1.031 )  * parseInt(left) / 100,
                        textY = (h + height * 0.72)  * parseInt(top) / 100
                        // 变量申请
                        cCtx.fillStyle = this.color || this.averageColor
                        // this.log(this.cCtx.fillStyle)
                        if(cCtx.fillStyle === '#ffffff') {
                            cCtx.fillStyle = '#000'
                        }
                        this.canvasRotate('text', cCtx, text, angle, textX, textY, width, height)
                        types[type](canvasDom, mimeType, resolve)
                        return
                    }
                    types[type](canvasDom, mimeType, resolve)
                })
            },
            canvasRotate(type, ctx, target, angle, x, y, width,height) {
                ctx.save()
                const halfHeight = height / 2,
                halfWidth = width / 2
                ctx.translate(x + halfWidth, y + halfHeight)
                ctx.rotate(Math.PI / 180 * angle)
                if (type === 'img') {
                    ctx.drawImage(
                        target,
                        -halfWidth,
                        -halfHeight,
                        width,
                        height
                    )
                } else if (type === 'text') {
                    ctx.fillText(target, -halfWidth , -halfHeight)
                }
                ctx.restore()
            },
            changeImage(imgAddress) {
                if (this.noImage) return
                this.averageColor = null
                if (imgAddress) {
                    this.createImage(imgAddress)
                    return
                }
                this.inputHandle()
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
        //    isWeiXin() {
        //         const ua = window.navigator.userAgent.toLowerCase();
        //         if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //             return true
        //         } else {
        //             return false
        //         }
        //     },
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
            getImageColor(data) { 
                let r=0, g=0, b=0
                // 取所有像素的平均值
                const num = this.limit(data.length, 1, 20)
                for (let row = 0; row < num; row++) {
                    for (let col = 0; col < num; col++) {
                        r += data[((num * row) + col) * 4]
                        g += data[((num * row) + col) * 4 + 1]
                        b += data[((num * row) + col) * 4 + 2]
                    }
                }
                // 求取平均值
                r /= (num * num)
                g /= (num * num)
                b /= (num * num)
                // 将最终的值取整
                r = Math.round(r)
                g = Math.round(g)
                b = Math.round(b)
                return `rgba(${255 - r}, ${255 - g}, ${255 - b}, 1)`
            },
            sendData(e, actionTypes, value) {
                this.log(this.options)
                // console.log(this.options)
                // this.type  1 读  2 写
                // console.log(this.options)
                this.log(this.type == 1 ? '读读读读读读读读读读': '写写写写写写写写写写')
                this.log('发送数据-----------' + actionTypes + '-------------' + value)
                // if (this.rubberAction && actionTypes == 2) return false
                // 缩放 和 删除 是没有 e.type
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
                this.log(data)
                // console.log(workerSend)
                workerSend(data)
                return true
            },
            createCanvas() {    
                // 解决 字体模糊
                const { mountNode } = this.$refs
                const { clientWidth, clientHeight } = mountNode
                // p可以优化
                this.options = {
                    width: clientWidth,
                    height: clientHeight
                }
                // canvas dom
                let canvasDom =  document.createElement('canvas')
                canvasDom.style.width =  clientWidth + 'px'
                canvasDom.style.height = clientHeight + 'px'
                //  小方格背景
               
               

                mountNode.appendChild(canvasDom)
                const ctx = canvasDom.getContext('2d')
                const pixelRatio = this.pixelRatio = this.getPixelRatio(ctx)
                canvasDom.style.position = 'absolute'
                canvasDom.style.top =  0
                canvasDom.style.left =  0
                // canvasDom.style.zIndex = 2
                canvasDom.width = clientWidth * pixelRatio
                canvasDom.height = clientHeight * pixelRatio
                ctx.scale(pixelRatio, pixelRatio)
            
                // this.options = canvasDom.getBoundingClientRect()
                // this.pixelRatio   //  ------截图的时候会用
                
                const canvasDom2 = canvasDom.cloneNode(true)
                // canvasDom2.style.backgroundColor = '#fff'
                // canvasDom2.style.backgroundImage =  'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)'
                // canvasDom2.style.backgroundSize = '29px 29px'
                // canvasDom2.style.backgroundPosition = '0 0, 15px 15px'
                // canvasDom2.style.zIndex = 1
                // 笔记层
            
                mountNode.appendChild(canvasDom2)
                const ctx2 = canvasDom2.getContext('2d')
                ctx2.scale(pixelRatio, pixelRatio)
                
                return  [ctx, ctx2]
                
            },
           convert(OriginOptions, currentOption) {
                // 适配屏幕 转换数据
                // 根据比例
                // 当前屏幕 宽高 -- 要被 修改点
                // 内部逻辑不用动
                // 宽高比
                // img  就是自己的宽高
                const clientW = currentOption.width
                const clientH = currentOption.height
                const { width, height } = OriginOptions
                // 求 初始比例
                let currentW = clientW,
                    currentH = clientH,
                    k = 1 // contain 时的缩放比
                // contain 图片
                if (clientW > width) {
                    // alert('12123')
                    currentW = width
                    k = currentW / clientW
                    currentH = k * clientH
                }
                if (currentH > height) {
                    currentH = height
                    k = currentH / clientH
                    currentW = k * clientW
                }
                // 针对小图片
                const minNum = 120
                if (clientW < minNum && currentH < minNum) {
                    currentW = minNum
                    k = currentW / clientW
                    currentH = k * clientH
                }
                console.log(currentH)
             return {
                k, 
                width: currentW, // 显示宽度
                height: currentH, // 真是 宽度
             }
            //  console.log('比例')
                // 针对小图片
                // this.image = {
                //     element: img,
                //     width: currentW, // 显示宽度
                //     height: currentH, // 真是 宽度
                //     x: (width - currentW) / 2,
                //     y: (height - currentH) / 2,
                //     clientWidth: clientW,
                //     clientHeight: clientH
                // }
                // const ratio = 1042 / 744 
                // 当前屏幕 宽高
            }
        },
        mounted() {
            const { mountNode } = this.$refs
            const { clientWidth, clientHeight } = mountNode
            const { k, width, height } = this.convert({ width: 1024, height: 744 }, { width: clientWidth, height: clientHeight })
            // mountNode
            mountNode.style.width =  width + 'px'
            mountNode.style.height = height + 'px'
            console.log(width)

            const [ctx, ctx2] = this.createCanvas()
            this.ctx = ctx
            this.ctx2 = ctx2
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
            console.log(this.options)


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
            if (this.type == 2)  return
            this.log('如果是写 -- 不会走到这里的')
          
            const self = this
            const socket = this.socket = io('ws://192.168.81.126:3000/'); // dev
           
            // 告诉服务器端有用户登录
            socket.emit('login', {userid: new Date().getTime(), username: '打野'});
 
            //监听新用户登录
            socket.on('login', function(msg){
               self.log('有用户进入')
               self.log(msg)
            });
 
            //监听用户退出
            socket.on('logout', function(msg){
                self.log('有用户退出')
                self.log(msg)
            });
            // 发送消息
            // this.socket.emit('message', obj);
            // 接受消息


            // 缩放数据容易丢  传缩放比
            /**
                * actionTypes
                * 
                * 1 start {touches: []}
                * 2 move {touches: []}
                * 3 end  {touches: []}
                * 4 delete线  { index: 3 }
                * 5 scale 缩放 { scale: 3 }
                */ 
            socket.on('message', function(obj){
                self.log('收到消息')
                self.log(obj)
                const { actionTypes, value } = obj
                switch (actionTypes) {
                    case 1: 
                        self.log(' 开始', 'red')
                        self.handleStart({ touches: value })
                        break;
                    case 2: 
                        self.log('移动', 'red')
                        self.handleMove({ touches: value })
                        break;
                    case 3: 
                        self.handleEnd({ touches: value })
                        self.log('结束', 'red')
                        break;
                    case 4: 
                        self.pointList.splice(value, 1)
                        self.renderCanvas()
                        self.log(' 删除线', 'orange')
                        break;
                    case 5: 
                        self.scaleImage(value)
                        self.log('缩放', 'orange')
                        break;
                    default:
                        break;
                }
            })
            
        },
    }
</script>