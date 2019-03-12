<template>
    <div ref="mountNode" 
        class="mount-node" 
        @touchstart="handleStart($event)"
        @touchmove="handleMove($event)"
        style=" overflow: hidden;"
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
                    id="file-input"
                    accept="image/jpeg,image/x-icon,image/png"
                >
                <slot name="defaultImgUrl"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'crop',
        props:['value', 'position', 'textWatermark', 'imageWatermark', 'defaultImgUrl', 'color', 'angle', 'shape'],
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
                touchBar: {},
                nookSide: 30,
                rotateAngle: 0
            }
        },
        watch: {
            shape() {
                if (!this.noImage) {
                    this.draw()
                }
            }
        },
        methods: {
            init(img){
                    const clientW = img.width,
                    clientH = img.height,
                    { width, height } = this.options
                    let currentW = clientW,
                        currentH = clientH,
                        k = 1 // contain 时的缩放比
                    // contain 图片
                    if (clientW > width) {
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
                    const minNum = 100
                    if (clientW < minNum) {
                        currentW = minNum
                        k = currentW / clientW
                        currentH = k * clientH
                    }
                    if (currentH < minNum) {
                        currentH = minNum;
                        k = currentH / clientH
                        currentW = k * clientW
                    }
                    this.scale = k
                    // 针对小图片
                    this.image = {
                        element: img,
                        width: currentW,
                        height: currentH,
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
                    this.touchBar = {
                        x: width - 60 - 14,
                        y: 10,
                        width: 60,
                        height: 60
                    }
                    this.draw()
            },
            draw() {
                const { width, height } = this.options,
                shape = this.shape || 'rect'
                // 避免预览到背景
                this.ctx.clearRect(0, 0, width, height)
                // console.time('fillBackground')  
                this.fillBackground()
                // console.timeEnd('fillBackground')
                // console.time('fillImage')
                this.fillImage()
                // console.timeEnd('fillImage')
                if (!this.averageColor) {
                        this.averageColor = this.getImageColor(this.ctx.getImageData(this.corePoint.x - 25,  this.corePoint.y - 25, 50, 50).data)
                }
                if (shape === 'arc') {
                    this.fillArcCropper()
                } else {
                    this.updatePoint()
                    this.fillRectCropper()
                }
                //  console.time('drawTouchBar')
                if (this.angle) {
                    this.drawTouchBar()
                }
                // console.timeEnd('drawTouchBar')
                // this.preview()
            },
            drawTouchBar() {
                const ctx = this.ctx,
                touchBar = this.touchBar,
                color = this.color || this.averageColor,
                x = touchBar.x + touchBar.width * 0.6,
                y =  touchBar.y + touchBar.height * 0.64,
                r = touchBar.width * 0.41,
                alpha = 6,
                h1 = touchBar.width * 0.1,
                h2 =  touchBar.width * 0.18
                ctx.lineWidth = 2
                // ctx.fillStyle = '#000';
                // ctx.fillRect(touchBar.x, touchBar.y, touchBar.width, touchBar.height)
                ctx.fillStyle = color
                ctx.fillRect(x - touchBar.width / 6, y - touchBar.height / 6, touchBar.width * 0.43, touchBar.height * 0.43)
                ctx.strokeStyle = color
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
                const image = this.image;
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
                ctx = this.ctx,
                side = 30 ,//width / 80,
                x = Math.ceil(width / side),
                y = Math.ceil(height / side)
                // Math.ceil 向上取整
                ctx.save()
                ctx.fillStyle = '#ccc'
                // y方向
                for (let i = 0; i < y; i++) {//  铺满每一行
                    for (let j = 0; j < x; j++) { // 一行的小方格
                        if ((j + i) % 2 === 0) {
                            ctx.fillRect(j * side, i * side, side, side)
                        }
                    }
                }
                //蒙层 
                ctx.fillStyle = 'rgba(0, 0, 0, .1)'
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
                coordinate = {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top
                },
                { width, height } = this.options
                // move 到边
                if (coordinate.x <= 2 || coordinate.y <= 2 || coordinate.x >= width - 2 || coordinate.y >= height - 2) return
                return coordinate
            },
            // https://blog.csdn.net/qq_42014697/article/details/80728463  两指缩放
            handleStart(e) {
                e.preventDefault()
                if (e.touches.length > 1) {
                    this.startTouches = e.touches
                    this.startPoint.type = null
                    return;
                }
                this.startPoint = this.getPointByCoordinate(this.getCoordinateByEvent(e))
            },
            handleMove (e) {
                e.preventDefault()
                const touches = e.touches
                if (touches.length > 1) {
                    const image = this.image
                    let startTouches = this.startTouches
                    let k; // 最终的缩放系数
                    const scale = this.scale;
                    // const offset = e.deltaY / 800;
                    k = (this.getDistance(touches[0], touches[1]) / this.getDistance(startTouches[0], startTouches[1]))
                    // k = k < 1 ? k / 10 : k * 10
                    k = k < 1 ? 1 / (1 + k / 80) : 1 + Math.abs(k) / 160
                    k = k * scale;
                    this.scale = this.limit(k, 0.02, 4)
                    const width = image.clientWidth * this.scale,
                    height = image.clientHeight * this.scale
                    this.image.x += (image.width - width) / 2
                    this.image.y += (image.height - height) / 2
                    this.image.width = width
                    this.image.height = height
                    this.draw()
                    return
                }
                const type = this.startPoint.type
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
                touchBar = this.touchBar,
                shape = this.shape || 'rect'
                let t = {}
                let index = 0
                if (this.checkRegion(x,y,touchBar)) {
                    this.rotateAngle =  (this.rotateAngle + this.angle ) % 360
                    this.draw()
                    return
                }
                // 圆移动
                else if (shape === 'arc' && this.checkArc(x, y)) {
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
                else if (shape !== 'arc' && this.lines.some((line,i) => {
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
                const image = this.image,
                shape = this.shape || 'rect',
                // cropper = this.cropper,
                cropper = shape === 'arc' ? {
                    x: this.arc.x - this.arc.r,
                    y: this.arc.y - this.arc.r,
                    width:  this.arc.r * 2 ,
                    height:  this.arc.r * 2
                } : this.cropper,
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
                h = cropper.height * quality 
                // 变量申请
                if (!this.canvas) {
                    this.canvas = document.createElement('canvas')
                    this.cCtx = this.canvas.getContext('2d')
                    // const { mountNode } = this.$refs
                    // mountNode.appendChild(this.canvas)
                }
                const cCtx = this.cCtx
                this.canvas.width = w * pixelRatio
                this.canvas.height = h * pixelRatio
                cCtx.scale(pixelRatio, pixelRatio)
                cCtx.clearRect(0, 0, w, h)
                const rotateAngle = this.rotateAngle
                if (shape === 'arc') {
                    const radius = cropper.width
                    cCtx.beginPath()
                    cCtx.lineWidth = 10
                    cCtx.arc(radius, radius, radius, 0, Math.PI * 2, false)
                    cCtx.clip()
                }
                this.canvasRotate('img', cCtx, image.element,
                    rotateAngle,
                    (image.x - cropper.x)  * quality,
                    (image.y - cropper.y)  * quality,
                    image.width* quality,
                    image.height* quality
                )
                // -------------
                // cCtx.drawImage(
                //     image.element,
                //     (image.x - cropper.x)  * quality , //  是负数
                //     (image.y - cropper.y)  * quality, // 负数
                //     image.width * quality ,
                //     image.height * quality
                // )
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
                            types[type](this.canvas, mimeType, resolve)
                        }
                        return
                    }             
                    if (this.textWatermark) {
                        const height = this.limit(12 * size, 12, 100)
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
                        types[type](this.canvas, mimeType, resolve)
                        return
                    }
                    types[type](this.canvas, mimeType, resolve)
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
                } else {
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
                    this.init(img)
                }
            },
            inputHandle() {
                document.getElementById('file-input').click()
            },
            getImageColor(data) { 
                let r=0, g=0, b=0
                // 取所有像素的平均值
                const num = 50
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
            mountNode.appendChild(canvasDom)
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