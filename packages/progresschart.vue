<template>
    <div ref="mountNode" class="mount-node" style="position: relative;" @click="canvasHandle($event)"/>
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
                default: 0 // 空缺角度
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
            },
            position: { // html内容位置
                type: Array,
                default: () => ['50%', '50%']
            },
        },  
        data() {
            return {
                ctx: null,
                options: null,
                arg: null,
                scale:1,
                canvas: null,
                centrality: {
                    x: null,
                    y: null
                },
                image: {},
                point: {},
                cropper: {},
                startPoint: {}
            }
        },
        destroyed() {
            this.circleTime && cancelAnimationFrame(this.circleTime)
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
                    const image = this.image;
                    this.arg = [image.element, image.x, image.y, image.width, image.height]
                    this.scale = k
                    this.draw()
                }
              
                // 两点之间的距离
                // d=√[(x2-x1)²+(y2-y1)²]
              
                // this.fillBackground()
            },
            draw() {
                const { width, height } = this.options

                // 避免预览到背景
                this.ctx.clearRect(0, 0, width, height)
                this.fillBackground()
                this.fillImage()
                this.fillCropper();
                this.preview();
            },
            fillImage() {
                const ctx = this.ctx
                ctx.drawImage(...this.arg);
            },
            updatePoint() {
                const c = this.cropper;
                const w = 8;
                const h = 8;    
                this.point = {
                    width: w,
                    height: h,
                    x: c.x + c.width - w / 2,
                    y: c.y + c.height - h / 2
                };
            },
            fillCropper() {
                const ctx = this.ctx,
                cropper = this.cropper
                this.updatePoint()
                const point = this.point;
                ctx.save();
                ctx.strokeStyle = '#39f';
                ctx.strokeRect(cropper.x, cropper.y, cropper.width, cropper.height);
                ctx.fillStyle = '#39f';
                ctx.fillRect(point.x, point.y, point.width, point.height);
                ctx.restore();
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
                const s = this.startPoint;
                const w = x - this.cropper.x;
                const h = y - this.cropper.y;

                if (w <= 0 || h <= 0) {
                    return;
                }
                this.cropper.width = w 
                this.cropper.height = h
                this.updatePoint()
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

                if (currentX < 0) {
                currentX = 0;
                }

                if (currentX > maxX) {
                currentX = maxX;
                }

                if (currentY < 0) {
                currentY = 0;
                }

                if (currentY > maxY) {
                currentY = maxY;
                }
                this.cropper.x = currentX 
                this.cropper.y = currentY
                this.updatePoint()
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
                this.startPoint = this.getPointByCoordinate(this.getCoordinateByEvent(e))
                if (this.startPoint.type ==  'preview') {
                    this.preview()
                }
            },
            getPointByCoordinate({x, y}) {
                const point = this.point;
                const cropper = this.cropper;
                const image = this.image;
                let t = {}

                // 设置偏移(点击坐标与定点坐标)
                if (
                    point &&
                    x > point.x &&
                    x < point.x + point.width &&
                    y > point.y &&
                    y < point.y + point.height
                ) {
                t.type = 'handlePointMove'
                } else if (
                cropper &&
                x > cropper.x &&
                x < cropper.x + cropper.width &&
                y > cropper.y &&
                y < cropper.y + cropper.height
                ) {
                t.offsetX = x - cropper.x;
                t.offsetY = y - cropper.y;
                t.type = 'handleCropperMove'
                } else if (
                image &&
                x > image.x &&
                x < image.x + image.width &&
                y > image.y &&
                y < image.y + image.height
                ) {
                t.offsetX = x - image.x;
                t.offsetY = y - image.y;
                t.type = Types.image;
                } else {
                    t.type = Types.background;
                }
                return t;
            },
            handleMove (e) {
                const type = this.startPoint.type;
                this[type](this.getCoordinateByEvent(e));
            },
            pointCircle(cx, cy, r, color) {
                const { ctx } = this
                ctx.beginPath()
                ctx.fillStyle = color
                ctx.arc(cx, cy, r, 0, Math.PI * 2)
                ctx.fill()
            },
            // 画圆
            critical(value, min, max) {
                if (value < min) {
                    return min
                }
                if (value > max) {
                    return max
                }
                return value
            },
            preview() {
                const image = this.image;
                const cropper = this.cropper;
                const op = this.options;
                const v = {
                    zoom: 1.8
                }
                // this.previewList.forEach(v => {
                const w = cropper.width * v.zoom
                const h = cropper.height * v.zoom
                if (!this.canvas) {
                    this.canvas = document.createElement('canvas')
                    this.copyCanvs = this.canvas.cloneNode(true)
                    // this.canvas.style.display = 'none'
                    const { mountNode } = this.$refs
                    mountNode.appendChild(this.canvas)
                    this.cCtx = this.canvas.getContext('2d')
                    this.copyCtx = this.copyCanvs.getContext('2d')
                }
                // console.log(this.canvas)
                this.canvas.width = this.copyCanvs.width = w
                this.canvas.height = this.copyCanvs.height = h
                console.log(this.canvas)
                this.cCtx.clearRect(0, 0, w, h)
                this.copyCtx.clearRect(0, 0, w, h)
                // -------------
                this.cCtx.drawImage(
                    image.element,
                    (image.x - cropper.x) * v.zoom,
                    (image.y - cropper.y) * v.zoom,
                    image.width * v.zoom,
                    image.height * v.zoom
                );
                this.copyCtx.drawImage(
                    this.canvas
                    (image.x - cropper.x) * v.zoom,
                    (image.y - cropper.y) * v.zoom,
                    image.width * v.zoom,
                    image.height * v.zoom
                );
                
                this.image = {
                    element: this.copyCanvs,
                    x: cropper.x,
                    y: cropper.y,
                    width: cropper.width,
                    height: cropper.height
                }
                this.arg = [
                    this.canvas,
                    cropper.x,
                    cropper.y,
                    cropper.width,
                    cropper.height,
                ]
                this.draw()
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
            getClickLocation(e, t, canvas) {
                const a = canvas.getBoundingClientRect()
                // console.log('canvas的距离顶部：' + a.top)
                return {
                    x: (e - a.left) * (canvas.width / a.width),
                    y: (t - a.top) * (canvas.height / a.height)
                }
            },
            canvasHandle(e) {
                // if (this.type !== 'pie') return
                // 把事件移到到这个位置 把  绑定事件和移除事件 交给vue
                // console.log('点击的点距离顶部：' + e.screenX)
                if (this.frameVal !== this.percent || this.type !== 'pie') return
                if (this.pieVlaue < this.pieDeviation) { // 动画没有结束  就点击了下一个
                    cancelAnimationFrame(this.circleTime)
                    this.oldIndex = this.tempOldIndex
                    this.pie(this.centrality.x, this.centrality.y,  this.frameVal, this.radius - this.pieDeviation)
                }
                this.pointLocation = this.getClickLocation(e.clientX, e.clientY, e.target)
                this.startTime = 0
                this.circleTime = requestAnimationFrame(this.pieFrame)
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
            this.cropper = {
                x:0,
                y:0,
                width:80,
                height:80
            }
            // if (this.bgImg) {
                let img = null
                img = new Image()
                img.src =  require('./../bg.png')
                img.onload = () => { // 等到图片加载进来之后
                    this.animation(img)
                }
            // } else {
            //     this.animation()
            // }

              // 缩放
            // canvasDom.addEventListener('mousewheel', this.handleMouseWheel);
            canvasDom.addEventListener('touchstart', this.handleStart);
            canvasDom.addEventListener('touchmove', this.handleMove);

            // this._id = bind(canvas, {
            // onStart: this.handleStart,
            // onMove: this.handleMove
            // });
        }

        // private handleStart = e => {
        //     this._startPoint = this.getPointByCoordinate(e.x, e.y);
        // };

        // private handleMove = e => {
        //     const type = this._types[this._startPoint.type];

        //     if (!type || !type.handler) {
        //     return;
        //     }

        //     type.handler(e);
        // };
           
        // }
    }
</script>