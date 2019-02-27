<template>
    <div ref="mountNode" 
        class="mount-node" 
        @touchstart="handleStart($event)"
        @touchmove="handleMove($event)"
    >
    <!--  不能绑在wrap 上=== 这样子任何点击都会计算 -后期优化-->
        <div v-show="noImage" @click="inputHandle" class="no-image-file"  @touchstart.stop="()=>{}" @touchmove.stop="()=>{}">
            <!-- <span>暂时没有图片,请选择图像</span> -->
            <slot name="placeholder"><span>暂时没有图片,请选择图像</span></slot>
            <div style="display:none">
                <input 
                    @change="uploadImg"
                    type="file"
                    id="file-input"
                    accept="image/jpeg,image/x-icon,image/png"
                >
                <slot name="initial"></slot>
                <slot name="watermark"></slot>
            </div>
        </div>
    </div>
</template>
<style>
    .mount-node {
        overflow: hidden;
    }
    .no-image-file {
        /* width: 100%; */
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f1f3f5;
        flex-wrap: wrap;
    }
</style>

<script>
    export default {
        name: 'progresschart',
        props:['imgaeFile','value','position'],
        data() {
            return {
                // ready: false,
                noImage:true,
                ctx: null,
                options: null,
                arg: null,
                scale:1,
                canvas: null,
                image: {},
                points: [],
                lines: [],
                cropper: {},
                startPoint: {},
                nook: {
                    w: 25,
                    h: 25
                }
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
                this.updatePoint()
                this.fillCropper()
                // this.preview()
            },
            fillImage() {
                const image = this.image;
                const ctx = this.ctx
                ctx.drawImage(image.element, image.x, image.y, image.width, image.height);
            },
            updatePoint() {
                const c = this.cropper;
                let {w, h} =  this.nook
                this.points = [
                    {
                        x: c.x -    1,
                        y: c.y - 1,
                        width: w,
                        height: h
                    },
                    {
                        x: c.x + c.width - w + 1,
                        y: c.y - 1,
                        width: w,
                        height: h
                    },
                    {
                        x: c.x - 1,
                        y: c.y + c.height - h + 1,
                        width: w,
                        height: h
                    },
                    {
                        x: c.x + c.width - w + 1,
                        y: c.y + c.height - h + 1,
                        width: w,
                        height: h
                    }
                ]
                // 寻找四根线
                // w = w / 0.8
                // h = h / 0.8
                this.lines = [
                     {
                        x: c.x,
                        y: c.y - w / 2,
                        width: c.width,
                        height: h
                    },
                    {
                        x: c.x + c.width - w +  w / 2,
                        y: c.y,
                        width: w,
                        height: c.height
                    },
                    {
                        x: c.x,
                        y: c.y + c.height - h + w / 2,
                        width: c.width,
                        height: h
                    },
                    {
                        x: c.x - w / 2 ,
                        y: c.y,
                        width: w,
                        height: c.height
                    }
                ]
            },
            fillCropper() {
                const ctx = this.ctx,
                cropper = this.cropper,
                point = this.point,
                points = this.points
                // ctx.save();
                ctx.strokeStyle = '#fff'
                ctx.lineWidth = 2
                ctx.strokeRect(cropper.x, cropper.y, cropper.width, cropper.height)
                ctx.fillStyle = '#fff';

                ctx.fillRect(points[0].x, points[0].y, points[0].width / 4, points[0].height)
                ctx.fillRect(points[0].x, points[0].y, points[0].width, points[0].height / 4)

                ctx.fillRect(points[1].x + points[1].width / 4 * 3 , points[1].y, points[1].width / 4, points[1].height)
                ctx.fillRect(points[1].x, points[1].y, points[1].width, points[1].height / 4)

                 ctx.fillRect(points[2].x , points[2].y, points[2].width / 4, points[2].height)
                ctx.fillRect(points[2].x, points[2].y  + points[2].width / 4 * 3, points[2].width, points[2].height / 4)

                ctx.fillRect(points[3].x + points[3].width / 4 * 3 , points[3].y, points[3].width / 4, points[3].height)
                ctx.fillRect(points[3].x, points[3].y + points[3].width / 4 * 3, points[3].width, points[3].height / 4)
                
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
                ctx.fillStyle = 'rgba(0,0,0,0.1)'
                ctx.fillRect(0, 0, width, height)
                 //蒙层 
                ctx.restore()
            },
            handlePointMove({ x, y }) {
                const cropper = this.cropper,
                newCropper = {}
                switch (this.index) {
                    case 3:
                        newCropper.width = x - cropper.x
                        newCropper.height = y - cropper.y
                        break;
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
                    case 2:
                    // y 不会动
                        newCropper.width = (cropper.x + cropper.width) - x
                        newCropper.height = y - cropper.y
                        newCropper.x = x
                        break;
                    default:
                        break;
                }
                if (newCropper.width <= this.nook.w * 2 || newCropper.height <= this.nook.h * 2) {
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
                //   console.log('123456')
                const cropper = this.cropper,
                newCropper = {}
                switch (this.index) {
                    case 3:
                        newCropper.width = (cropper.x + cropper.width) - x
                        newCropper.x = x
                        break;
                    case 0:
                        newCropper.height =  (cropper.y + cropper.height) - y
                        newCropper.y = y
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
                if (newCropper.width <= 30 || newCropper.height <= 30) {
                    return;
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
                const rect = e.target.getBoundingClientRect()
                const touch = e.touches[0]
                return {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top
                }
            },
            // https://blog.csdn.net/qq_42014697/article/details/80728463  两指缩放
            handleStart(e) {
                if (e.touches.length > 1) {
                    this.startTouches = e.touches
                    this.startPoint.type = null
                    return;
                }
                this.startPoint = this.getPointByCoordinate(this.getCoordinateByEvent(e))
            },
            handleMove (e) {
                const touches = e.touches
                if (touches.length > 1) {
                    e.preventDefault()
                    const image = this.image
                    let startTouches = this.startTouches
                    let width = image.clientWidth
                    let height = image.clientHeight
                    let k; // 最终的缩放系数
                    const scale = this.scale;
                    // const offset = e.deltaY / 800;
                    k = (this.getDistance(touches[0], touches[1]) / this.getDistance(startTouches[0], startTouches[1]))
                    // k = k < 1 ? k / 10 : k * 10
                    k = k < 1 ? 1 / (1 + k / 80) : 1 + Math.abs(k) / 160
                    k = k * scale;
                    this.scale = this.limit(k, 0.02, 4)
                    width *= k;
                    height *= k;
                    image.x += (image.width - width) / 2;
                    image.y += (image.height - height) / 2;
                    image.width = width;
                    image.height = height;
                    this.draw();
                    return
                }
                const type = this.startPoint.type
                if (type) {
                    this[type](this.getCoordinateByEvent(e));
                }
            },
            getPointByCoordinate({x, y}) {
                // const point = this.point;
                const cropper = this.cropper;
                const image = this.image;
                let t = {}
                let index = 0
                // 四个角移动         
                if (this.points.some((point,i) => {
                    index = i
                    return x > point.x &&
                    x < point.x + point.width &&
                    y > point.y &&
                    y < point.y + point.height
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
                else if (
                    image &&
                    x > image.x &&
                    x < image.x + image.width &&
                    y > image.y &&
                    y < image.y + image.height
                ) {
                    t.offsetX = x - image.x;
                    t.offsetY = y - image.y;
                    t.type = 'handleImageMove'
                }
                return t;
            },
            getDistance(p1, p2) {
                const x = p2.pageX - p1.pageX,
                    y = p2.pageY - p1.pageY;
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
                console.log('获取图片')
                const image = this.image
                const cropper = this.cropper
                const op = this.options
                // this.previewList.forEach(v => {
                const w = cropper.width * quality,
                    h = cropper.height * quality
                if (!this.canvas) {
                    this.canvas = document.createElement('canvas')
                    this.cCtx = this.canvas.getContext('2d')
                    // const { mountNode } = this.$refs
                    // mountNode.appendChild(this.canvas)
                }
                // console.log(this.canvas)
                this.canvas.width = w
                this.canvas.height = h
                this.cCtx.clearRect(0, 0, w, h)
                // -------------
                this.cCtx.drawImage(
                    image.element,
                    (image.x - cropper.x) * quality,
                    (image.y - cropper.y) * quality,
                    image.width * quality,
                    image.height * quality
                )
                const types = {
                    Base64(canvas, mimeType, quality, resolve) {
                        return new Promise((resolve) => {;
                            resolve(canvas.toDataURL(mimeType, quality))
                        })
                    },
                    Blob(canvas, mimeType, quality){
                        return new Promise((resolve) => {;
                            canvas.toBlob((blob)=> {
                                resolve(blob)
                            }, mimeType)
                        })
                    } 
                }
                return new Promise((resolve) => {
                    if (!this.$slots.watermark) {
                        resolve(types[type](this.canvas, mimeType, quality, resolve))
                        return
                    }
                    const [left = '50%', top = '50%', size = 1] = this.position
                    const isImg = this.$slots.watermark && this.$slots.watermark[0].tag === 'img'
                    if (isImg) {
                        let watermarkImg = new Image()
                        watermarkImg.src = this.$slots.watermark[0].data.attrs.src
                        watermarkImg.crossOrigin = 'anonymous'
                        const width = watermarkImg.width * size * this.scale,
                        height = watermarkImg.height * size * this.scale
                        watermarkImg.onload = () => { // 等到图片加载进来之后
                            this.cCtx.drawImage(
                                watermarkImg,
                                (w - width) * parseInt(left) / 100,
                                (h - height) * parseInt(top) / 100,
                                width,
                                height
                            )
                            resolve(types[type](this.canvas, mimeType, quality, resolve))
                        }
                        return
                    }
                    // console.log(this.$slots.watermark)
                    const height = 12 * size,
                    text = this.$slots.watermark[0].text  || '请直接放文字',
                    width = this.cCtx.measureText(text).width,
                    x = (w - width) * parseInt(left) / 100,
                    y = (h + height / 2) *parseInt(top) / 100,
                    colorData = this.cCtx.getImageData(x, y, 1, 1).data
                    this.cCtx.font = 12 * size + 'px April'
                    this.cCtx.fillStyle =  `rgba(${255 - colorData[0]}, ${255 - colorData[1]}, ${255 - colorData[2]}, 1)`
                    // console.log(this.cCtx.fillStyle)
                    if(this.cCtx.fillStyle === '#ffffff') {
                        this.cCtx.fillStyle = '#000'
                    }
                    this.cCtx.fillText(text, x, y)
                    resolve(types[type](this.canvas, mimeType, quality, resolve))
                })
            },
            changeImage(src) {
                if (this.noImage) return
                if (src) {
                    this.createImage(src)
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
            createImage(imgfile) {
                let img = new Image()
                //  url , imgsrc, 文件  三种情况
                let src = imgfile
                if (Object.prototype.toString.call(imgfile) === '[object File]') {
                   src = window.URL.createObjectURL(imgfile)
                }
                img.crossOrigin = 'anonymous'
                img.src = src
                img.onload = () => { // 等到图片加载进来之后
                    this.animation(img)
                }
            },
            inputHandle() {
                document.getElementById('file-input').click()
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
            const pixelRatio = this.getPixelRatio(this.ctx)
            canvasDom.width = clientWidth * pixelRatio
            canvasDom.height = clientHeight * pixelRatio
            this.ctx.scale(pixelRatio, pixelRatio)
            // console.log(this.$slots.initial[0].data.attrs.src)
            if (this.$slots.initial) {
                this.createImage(this.$slots.initial[0].data.attrs.src)
                this.noImage = false
            }
            this.$emit('input', {
                getImage: this.getImage,
                changeImage: this.changeImage
            })           
        }
    }
</script>