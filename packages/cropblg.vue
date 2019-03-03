<template>
    <div ref="mountNode" 
        class="mount-node" 
        @touchstart="handleStart($event)"
        @touchmove="handleMove($event)"
        style=" overflow: hidden;"
    >
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
        props:['value', 'position', 'textWatermark', 'imageWatermark', 'rotateAngle', 'defaultImgUrl', 'color'],
        data() {
            return {
                // ready: false,
                noImage:true,
                ctx: null,
                options: null,
                pixelRatio: null,
                scale:1,
                canvas: null,
                image: {},
                points: [],
                lines: [],
                cropper: {},
                startPoint: {},
                nookSide: 50
            }
        },
        methods: {
            animation(img){
                if (img) {
                    const clientW = img.width,
                    clientH = img.height;
                    const { width, height } = this.options
                    let currentW = clientW,
                        currentH = clientH,
                        k = 1; // contain 时的缩放比
                    // contain 图片
                    if (clientW > width) {
                        currentW = width
                        k = currentW / clientW
                        currentH = k * clientH
                    }
                    if (currentH > height) {
                        currentH = height;
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
                    this.cropper = {
                        x: (width - currentW / 2) / 2,
                        y: (height - currentH / 2) / 2,
                        width: currentW  / 2,
                        height: currentH / 2
                    }
                    this.scale = k
                    this.draw()
                }
            },
            draw() {
                const { width, height } = this.options
                // 避免预览到背景
                this.ctx.clearRect(0, 0, width, height)     
                this.fillBackground()
                this.fillImage()
                if (!this.averageColor) {
                   this.averageColor = this.getImageColor(this.ctx.getImageData( this.cropper.x,  this.cropper.y, 50, 50).data)
                }
                this.updatePoint()
                this.fillCropper()
                // this.preview()
            },
            fillImage() {
                const image = this.image;
                const ctx = this.ctx
                // const halfHeight = image.height / 2,
                // halfWidth = image.width / 2
                // ctx.save()
                // ctx.translate(image.x + halfWidth, image.y + halfHeight)
                // ctx.rotate(Math.PI / 180 * 90)
                // ctx.drawImage(image.element, -halfWidth, -halfHeight, image.width, image.height)
                // ctx.restore()
                const rotateAngle = this.rotateAngle || 0
                this.canvasRotate('img', ctx, image.element, rotateAngle, image.x, image.y, image.width, image.height)
                // ctx.drawImage(image.element, image.x, image.y, image.width, image.height)
            },
            updatePoint() {
                // 点中点和线 不用 执行 
                const c = this.cropper;
                const nookSide =  this.nookSide
                this.points = [
                    {
                        x: c.x,
                        y: c.y,
                        nookSide,
                        diffX: 0,
                        diffY: 0
                    },
                    {
                        x: c.x + c.width - nookSide ,
                        y: c.y,
                        nookSide,
                        diffX: nookSide,
                        diffY: 0
                    },
                    {
                        x: c.x + c.width - nookSide ,
                        y: c.y + c.height - nookSide,
                        nookSide,
                        diffX: nookSide,
                        diffY: nookSide
                    },
                    {
                        x: c.x,
                        y: c.y + c.height - nookSide,
                        nookSide,
                        diffX: 0,
                        diffY: nookSide
                    }
                ]
                // 寻找四根线
                const lineHeight = nookSide / .7 / 2
                this.lines = [
                     {
                        x: c.x,
                        y: c.y - lineHeight / 2,
                        width: c.width,
                        height: lineHeight
                    },
                    {
                        x: c.x + c.width - lineHeight / 2,
                        y: c.y,
                        width: lineHeight,
                        height: c.height
                    },
                    {
                        x: c.x,
                        y: c.y + c.height - lineHeight / 2,
                        width: c.width,
                        height: lineHeight
                    },
                    {
                        x: c.x - lineHeight / 2 ,
                        y: c.y,
                        width: lineHeight,
                        height: c.height
                    }
                ]
            },
            fillCropper() {
                const ctx = this.ctx,
                cropper = this.cropper,
                points = this.points,
                color = this.averageColor
                ctx.strokeStyle = color
                ctx.lineWidth = 2
                ctx.strokeRect(cropper.x, cropper.y, cropper.width, cropper.height)
                ctx.fillStyle = color
                const nookSide = this.nookSide / 8
                points.forEach((element, index) => {
                    ctx.save()
                    ctx.translate(element.x + element.diffX, element.y + element.diffY)
                    ctx.rotate(index * 90 * (Math.PI/180))
                    ctx.fillRect(-nookSide, -nookSide, element.nookSide, nookSide * 2)
                    ctx.fillRect(-nookSide, -nookSide, nookSide * 2, element.nookSide)
                    // if(index % 2 === 0){
                    //     ctx.fillRect(-nookSide, cropper.height / 2 - element.nookSide , element.nookSide / 4, element.nookSide * 2)
                    // } else {
                    //     ctx.fillRect(-nookSide, cropper.width / 2 - element.nookSide, element.nookSide / 4, element.nookSide * 2)
                    // }
                    ctx.restore()
                });
               

            },
           // 填充背景
            fillBackground() {
                // 多个变量可以用逗号 一次赋值
                const { width, height } = this.options
                const ctx = this.ctx,
                side = 15 ,//width / 80,
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
            handlePointMove({ x, y }) {
                const cropper = this.cropper,
                newCropper = {}
                switch (this.index) {
                    case 0:
                        newCropper.width =  (cropper.x + cropper.width) - x
                        newCropper.height =  (cropper.y + cropper.height) - y
                        newCropper.x = x
                        newCropper.y = y
                        break;
                    case 1:
                    // x  不会动
                        newCropper.width =  x - cropper.x
                        newCropper.height =  (cropper.y + cropper.height) - y
                        newCropper.y = y
                        break;
                    case 3:
                    // y 不会动
                        newCropper.width = (cropper.x + cropper.width) - x
                        newCropper.height = y - cropper.y
                        newCropper.x = x
                        break;
                    case 2:
                        newCropper.width = x - cropper.x
                        newCropper.height = y - cropper.y
                        break;
                    default:
                        break;
                }
                if (newCropper.width <= this.nookSide * 4 || newCropper.height <= this.nookSide * 4) {
                    return;
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
            handleLineMove ({ x, y }) {
                const cropper = this.cropper,
                newCropper = {}
                switch (this.index) {
                    case 3:
                        newCropper.width = (cropper.x + cropper.width) - x
                        newCropper.x = x // 限制
                        break;
                    case 0:
                        newCropper.height =  (cropper.y + cropper.height) - y
                        newCropper.y = y // 限制
                        break;
                    case 1:
                        newCropper.width =  x - cropper.x
                        break;
                    case 2:
                    // y 不会动
                        newCropper.height = y - cropper.y
                        break;
                    default:
                        break;
                }
                if (newCropper.width <= this.nookSide * 4 || newCropper.height <= this.nookSide * 4) {
                    return
                }
                this.cropper = {...this.cropper,...newCropper}
                this.draw()
            },
            handleCropperMove({ x, y }) {
                const { width, height } = this.options;
                const s = this.startPoint;
                const oX = s.offsetX;
                const oY = s.offsetY;
                const maxX = width - this.cropper.width;
                const maxY = height - this.cropper.height;
                let currentX = x - oX,
                currentY = y - oY;
                // 判断边界
                this.cropper.x = this.limit(currentX, 0, maxX)
                this.cropper.y = this.limit(currentY, 0, maxY)
                this.draw()
            },
            getCoordinateByEvent(e){
                const rect = e.target.getBoundingClientRect(),
                touch = e.touches[0],
                coordinate = {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top
                },
                { width, height } = this.options
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
                    this.image.width = width;
                    this.image.height = height;
                    this.draw();
                    return
                }
                const type = this.startPoint.type
                if (type && this.getCoordinateByEvent(e)) {
                    this[type](this.getCoordinateByEvent(e))
                }
            },
            getPointByCoordinate({x, y}) {
                // const point = this.point;
                // const cropper = this.cropper;
                const image = this.image;
                let t = {}
                let index = 0
                // 四个角移动         
                if (this.points.some((point,i) => {
                    index = i
                    return x > point.x &&
                    x < point.x + point.nookSide &&
                    y > point.y &&
                    y < point.y + point.nookSide
                })
                ) {
                    t.type = 'handlePointMove'
                    this.index = index
                }
                // 四根线移动
                else if (this.lines.some((line,i) => {
                    index = i
                    return x > line.x &&
                    x < line.x + line.width &&
                    y > line.y &&
                    y < line.y + line.height
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
                else if (
                    image &&
                    x > image.x &&
                    x < image.x + image.width &&
                    y > image.y &&
                    y < image.y + image.height
                ) {
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
                cropper = this.cropper,
                pixelRatio = this.pixelRatio,
                types = {
                    Base64(canvas, mimeType) {
                        return new Promise((resolve) => {
                            resolve(canvas.toDataURL(mimeType))
                        })
                    },
                    Blob(canvas, mimeType){
                        return new Promise((resolve) => {
                            canvas.toBlob((blob)=> {
                                resolve(blob)
                            }, mimeType)
                        })
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
                const rotateAngle = this.rotateAngle || 0
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
                    // angle = this.angle || 0
                    if (this.imageWatermark) {
                        let watermarkImg = new Image()
                        watermarkImg.src = this.getFileSrc(this.imageWatermark)
                        watermarkImg.crossOrigin = 'anonymous'
                        watermarkImg.onload = () => { // 等到图片加载进来之后
                            const width = watermarkImg.width * size,
                            height = watermarkImg.height * size,
                            imgX  = ( w - width ) * parseInt(left) / 100 ,
                            imgY =  (h - height) * parseInt(top) / 100
                            this.canvasRotate('img', cCtx, watermarkImg, angle, imgX, imgY, width, height)
                            resolve(types[type](this.canvas, mimeType))
                        }
                        return
                    }             
                    if (this.textWatermark) {
                        const height = this.limit(12 * size, 12, 100)
                        cCtx.font = height + 'px Georgia'
                        const text = this.textWatermark,
                        width = cCtx.measureText(text).width,
                        textX = (w - width * 1.031 )  * parseInt(left) / 100,
                        textY = (h - height * 2.82)  * parseInt(top) / 100
                        // 变量申请
                        cCtx.fillStyle =  this.averageColor
                        // console.log(this.cCtx.fillStyle)
                        if(cCtx.fillStyle === '#ffffff') {
                            cCtx.fillStyle = '#000'
                        }
                        this.canvasRotate('text', cCtx, text, angle, textX, textY, width, height)
                        resolve(types[type](this.canvas, mimeType))
                        return
                    }
                    resolve(types[type](this.canvas, mimeType))
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
                    this.animation(img)
                }
            },
            inputHandle() {
                document.getElementById('file-input').click()
            },
            getImageColor(data) { 
                if (this.color) {
                    return this.color
                }
                let r=0, g=0, b=0
                // 取所有像素的平均值
                const num = 50
                for (var row = 0; row < num; row++) {
                    for (var col = 0; col < num; col++) {
                        r += data[((num * row) + col) * 4];
                        g += data[((num * row) + col) * 4 + 1];
                        b += data[((num * row) + col) * 4 + 2];
                    }
                }
                // 求取平均值
                r /= (num * num);
                g /= (num * num);
                b /= (num * num);
                // 将最终的值取整
                r = Math.round(r);
                g = Math.round(g);
                b = Math.round(b);
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