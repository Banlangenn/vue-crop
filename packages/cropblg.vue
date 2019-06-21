<template>
    <div ref="mountNode" 
        class="mount-node" 
        @touchstart="handleStart($event)"
        @touchmove="handleMove($event)"
        @touchend="handleEnd($event)"
        style="
        overflow: hidden;"
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
    export default {
        name: 'crop',
        props:['value', 'position', 'textWatermark', 'imageWatermark', 'defaultImgUrl', 'color', 'angle', 'rotation', 'shape', 'penBtn', 'revokeBtn', 'rotateBtn'],
        data() {
            return {
                // ready: false,
                noImage: true,
                ctx: null,
                options: null,
                pixelRatio: null,
                scale:1,
                canvas: null,
                image: {},
                points: [],
                lines: [],
                cropper: {},
                corePoint: {},
                startPoint: {},
                nookSide: 20,
                rotateAngle: 0,
                bgOpacity: 0,
                // 三个操作按钮  默认不显示的
                touchBar: null,
                paintBrush: null,
                revokeBar: null
            }
        },
        watch: {
            shape() {
                if (!this.noImage) {
                    this.draw()
                }
            },
            rotation() {
                //  内旋转 外旋转 只能有一个
                if (!this.noImage && !this.rotateBtn && !this.drawAction) {
                    this.rotateAngle = this.rotation
                    this.draw()
                }
            }
        },
        methods: {
            init(img){
                this.pointList = []
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
                if (this.rotateBtn && !/\d/.test(this.rotation)) {
                    this.touchBar = {
                        x: width - 30 - 7,
                        y: 10,
                        width: 30,
                        height: 30
                    }
                    number ++ 
                }
                // width  画布宽度
                if (this.penBtn) {
                    this.paintBrush = {
                        x: width - 30 - 7,
                        y: 10 + ( 30 + interval) * number,
                        width: 30,
                        height: 30
                    }
                    number ++ 
                }
                if (this.revokeBtn) {
                    this.revokeBar = {
                        x: width - 30 - 7,
                        y: 10 + (30  + interval ) * number,
                        width: 30,
                        height: 30
                    }
                    number ++ 
                }
                this.draw()
            },
            draw() {
                const { width, height } = this.options,
                shape = this.shape || 'rect'
                // 避免预览到背景
                this.ctx.clearRect(0, 0, width, height)
                // // 背景 // 考虑用css 实现
                this.fillBackground()
                //  处理出片
                this.fillImage()
                // console.timeEnd('fillImage')
                this.drawPointFn(this.ctx)
                if (!this.averageColor) {
                        this.averageColor = this.getImageColor(this.ctx.getImageData(this.corePoint.x - 25,  this.corePoint.y - 25, 50, 50).data)
                }
                if (shape === 'arc') {
                    this.fillArcCropper()
                } else  if (shape === 'rect') {
                    this.updatePoint()
                    this.fillRectCropper()
                }
                //  console.time('drawTouchBar')
                this.drawTouchBar(this.touchBar)
                this.drawPaintBrush(this.paintBrush)
                this.drawRevokeBar(this.revokeBar)
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
                if (pointList.length > 0) {
                    pointList.forEach(el => {
                        const scale = this.scale / el.scale
                        const lineWidth =  this.limit(el.lineWidth * scale, 1, 5)
                        ctx.lineWidth = quality ? lineWidth * 2 : lineWidth
                        ctx.strokeStyle = el.color
                        ctx.lineCap = 'round'
                        ctx.beginPath()
                        el.pointLine.forEach((element,i)=>{
                            if (i === 0) {
                                // 要相对于图片的位置 才是对的  不能相对于 画布
                                if (quality) {
                                    // console.log(element)
                                    ctx.moveTo((image.x + (element.x * scale) - cropper.x)* quality , (image.y + (element.y * scale) - cropper.y) * quality)
                                } else {
                                    ctx.moveTo((image.x + element.x * scale) , (image.y + element.y * scale))
                                }
                            }
                            if (quality) {
                                ctx.lineTo((image.x + (element.x * scale) - cropper.x) * quality, (image.y + (element.y * scale) - cropper.y) * quality)
                            } else {
                                ctx.lineTo((image.x + element.x * scale), (image.y + element.y * scale))
                            }
                        })
                        ctx.stroke()
                    })
                }
                //  ctx.lineWidth = 5
            },
            drawPaintBrush(touchBar) {
                if (!touchBar) return
                const {x, y} = touchBar 
                const ctx = this.ctx,
                // touchBar = touchBar,
                color = this.color || this.averageColor
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
                ctx.lineWidth = 2
                ctx.lineCap = 'round'
                ctx.beginPath()
                ctx.moveTo(x + 15, y + 12)
                ctx.lineTo(x + 15, y + 8)
                ctx.lineTo(x + 7, y + 15)

                ctx.lineTo(x + 15, y + 22)
                ctx.lineTo(x + 15, y + 18)
                ctx.stroke()
                ctx.fillStyle = color
                ctx.fill()
                ctx.beginPath()
                ctx.arc(x + 15,  y + 24, 12, -Math.PI/2, -Math.PI/180 * 18, false)
                ctx.arc(x + 15,  y + 35, 17,-Math.PI/180 * 45, -Math.PI/2, true)
                ctx.stroke()
                ctx.fillStyle = color
                ctx.fill()
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
                ctx.lineWidth = 1
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
                // console.log(this.arc.r)
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
            handleArcMove({x, y}) {
                this.arc.r = this.limit(this.getDistance({pageX: x, pageY: y}, {pageX: this.arc.x, pageY: this.arc.y}), this.nookSide * 2, this.maxRadius)
                this.draw()
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
                this.draw()
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
                this.draw()
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
            //     this.draw()
            // },
            getCoordinateByEvent(e){
                const rect = e.target.getBoundingClientRect(),
                touch = e.touches[0],
                { width, height } = this.options,
                coordinate = {
                    x: this.limit(touch.clientX - rect.left, 2, width - 2) ,
                    y: this.limit(touch.clientY - rect.top, 2, height - 2) ,
                }
                // move 到边
                return coordinate
            },
            // https://blog.csdn.net/qq_42014697/article/details/80728463  两指缩放
            handleEnd(){
                if (this.changeDrawAction) {
                    if (this.drawAction) {
                        this.drawAction = false
                        this.bgOpacity = 0
                        this.draw()
                    } else {
                        this.drawAction = true
                        this.bgOpacity = .4
                        this.draw()
                    }
                    this.changeDrawAction = false
                    return
                }
                if (this.drawAction && this.pointLine.length > 0) {
                    this.drawPoint.x = this.drawPoint.x - this.image.x
                    this.drawPoint.y = this.drawPoint.y - this.image.y
                    this.pointLine.push(this.drawPoint)
                    // 点的 宽度
                    const pointObj = {
                        pointLine: this.pointLine,
                        scale: this.scale,
                        lineWidth: 3,
                        color: this.color || this.averageColor,
                        rotateAngle : this.rotateAngle
                    }
                    this.pointList.push(pointObj)
                    this.pointLine = []
                }
                
            },
            handleStart(e) {
                // alert(1)
                e.preventDefault()
                // 双指
                if (e.touches.length > 1) {
                    this.startTouches = e.touches
                    this.startPoint.type = null
                    return;
                }
                // 单指  起点
                this.drawPoint = this.getCoordinateByEvent(e)
                this.startPoint = this.getPointByCoordinate(this.drawPoint)
                // --  画画
                if (this.drawAction) {
                    this.pointLine = []
                    this.ctx.beginPath()
                    this.ctx.moveTo(this.drawPoint.x, this.drawPoint.y)
                }
            },
            handleMove (e) {
                e.preventDefault()
                const touches = e.touches
                const image = this.image
                if (touches.length > 1 && !this.drawAction) {
                    let startTouches = this.startTouches
                    let k; // 最终的缩放系数
                    const scale = this.scale;
                    // const offset = e.deltaY / 800;
                    k = (this.getDistance(touches[0], touches[1]) / this.getDistance(startTouches[0], startTouches[1]))
                    // k = k < 1 ? k / 10 : k * 10
                    k = k < 1 ? 1 / (1 + k / 80) : 1 + Math.abs(k) / 160
                    k = k * scale;
                    this.scale = this.limit(k, 0.02, 1.07)
                    const width = image.clientWidth * this.scale,
                    height = image.clientHeight * this.scale
                    this.image.x += (image.width - width) / 2
                    this.image.y += (image.height - height) / 2
                    this.image.width = width
                    this.image.height = height
                    this.draw()
                    return
                }
                if (this.drawAction) {
                    // 划线
                    // 先实现划线
                    //  画 相对于 画布  // 存 相对于 画布
                    // 屡一下   -- 这个东西  想对于画布  在图片在哪里 ===== 根据图片的位置还原 画布位置
                    const drawPoint = this.drawPoint
                    const current = this.getCoordinateByEvent(e)
                    const ctx = this.ctx
                    const color =  this.color || this.averageColor
                    ctx.lineTo(current.x, current.y)
                    ctx.lineWidth = 3
                    ctx.strokeStyle = color
                    ctx.lineCap = 'round'
                    ctx.stroke()
                    drawPoint.x = drawPoint.x - image.x
                    drawPoint.y = drawPoint.y - image.y
                    this.pointLine.push(drawPoint)
                    this.drawPoint = current
                    return
                }
                // 这是干啥的--画=>图片和 线
                const type = this.startPoint ? this.startPoint.type : null
                if (type && this.getCoordinateByEvent(e)) {
                    this[type](this.getCoordinateByEvent(e))
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
                ctx.arc(this.arc.x, this.arc.y, this.arc.r + ctx.lineWidth , 0, Math.PI * 2)
                // ctx.stroke() 
                return (ctx.isPointInPath(x * this.pixelRatio, y * this.pixelRatio)
                 && this.getDistance({pageX: x, pageY: y}, {pageX: this.arc.x, pageY: this.arc.y}) >  this.arc.r - ctx.lineWidth / 2)
            },
            getPointByCoordinate({x, y}) {
                const image = this.image,
                shape = this.shape || 'rect'
                let t = {}
                let index = 0
                //  旋转
                if ( this.paintBrush && this.checkRegion(x, y, this.paintBrush)) {
                    this.changeDrawAction = true
                    return
                }else if (this.revokeBar && this.checkRegion(x, y, this.revokeBar)) {
                    // t.type = 'draw'
                    // 接下来 是draw 动作
                    //  再次进来  保存 起始点 坐标
                    this.pointList.pop()
                    this.draw()
                    return
                } else if (this.touchBar && this.checkRegion(x, y, this.touchBar)) {
                    // 旋转后的角度 每次
                    this.rotateAngle =  (this.rotateAngle + this.angle ) % 360
                    this.draw()
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
                        // console.log(this.cCtx.fillStyle)
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
                            return
                        }
                        //  只有钉钉  会莫名其妙 卡顿- =>   把图片 画在canvas 背景上了
                        this.init(img)
                        correctImage(img, res).then(Img => {
                            // alert('123')
                            this.init(Img)
                        })
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
            }
        },
        mounted() {
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
            canvasDom.style.backgroundColor = '#fff'
            canvasDom.style.backgroundImage =  'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)'
            canvasDom.style.backgroundSize = '29px 29px'
            canvasDom.style.backgroundPosition = '0 0, 15px 15px'
            mountNode.appendChild(canvasDom)
            // this.options = canvasDom.getBoundingClientRect()
           

            this.ctx = canvasDom.getContext('2d')
            const pixelRatio = this.pixelRatio = this.getPixelRatio(this.ctx)
            canvasDom.width = clientWidth * pixelRatio
            canvasDom.height = clientHeight * pixelRatio
            this.ctx.scale(pixelRatio, pixelRatio)
            // console.log(this.$slots.initial[0].data.attrs.src)
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