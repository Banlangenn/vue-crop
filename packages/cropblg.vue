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
        width: 23px;
        height: 23px;
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

            <!-- 确定 取消icon -->
            <img src="./img/ok.jpg"  style="display:none" id="draw-ok-icon" alt="">
            <img src="./img/cancel.jpg" style="display:none"  id="draw-cancel-icon" alt="">
            <!-- <svg style="display:none" id="draw-ok-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1026" width="128" height="128"><path d="M512 64C262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448-198.4-448-448-448z m256 339.2l-288 288c-6.4 12.8-19.2 12.8-32 12.8s-19.2 0-32-12.8L313.6 588.8c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L448 633.6l275.2-275.2c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 38.4 0 44.8z" fill="" p-id="1027"></path></svg>
            <svg  style="display:none"  id="draw-cancel-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1159" width="128" height="128"><path d="M499.2 64c-249.6 0-448 198.4-448 448s198.4 448 448 448 448-198.4 448-448-198.4-448-448-448z m179.2 582.4c12.8 12.8 12.8 32 0 44.8-12.8 12.8-32 12.8-44.8 0L499.2 556.8l-134.4 134.4c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L454.4 512 320 377.6c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0l134.4 134.4 134.4-134.4c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L544 512l134.4 134.4z" fill="" p-id="1160"></path></svg> -->
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
                        @touchend="handleGeometry"
                        :style="{fill: changeDrawAction == 3 ||  changeDrawAction == 4 ? color: ''}"
                        class="draw-icon geometry "
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2410" width="128" height="128"><path d="M512 955.733333H85.333333a17.066667 17.066667 0 0 1-17.066666-17.066666V512a17.066667 17.066667 0 0 1 17.066666-17.066667h426.666667a17.066667 17.066667 0 0 1 17.066667 17.066667v426.666667a17.066667 17.066667 0 0 1-17.066667 17.066666zM102.4 921.6h392.533333V529.066667H102.4v392.533333z m665.6-51.2c-51.712 0-96.546133-18.619733-133.239467-55.3472C598.596267 778.9056 580.266667 734.3616 580.266667 682.666667c0-51.6096 18.295467-96.4096 54.408533-133.137067 18.158933-17.5616 37.973333-30.7712 59.204267-39.5776 22.528-9.966933 47.4624-15.018667 74.120533-15.018667 51.677867 0 96.221867 18.3296 132.386133 54.493867C937.1136 586.1376 955.733333 630.971733 955.733333 682.666667c0 51.7632-18.670933 96.3584-55.4496 132.5056C864.341333 851.746133 819.746133 870.4 768 870.4z m-153.6-187.733333c0 42.922667 14.557867 78.318933 44.4928 108.253866C689.390933 821.435733 725.060267 836.266667 768 836.266667c42.8544 0 78.2336-14.7968 108.151467-45.243734C906.8032 760.900267 921.6 725.538133 921.6 682.666667c0-42.922667-14.830933-78.592-45.346133-109.1072C846.301867 543.624533 810.9056 529.066667 768 529.066667c-21.9136 0-42.257067 4.096-60.450133 12.168533l-0.1536 0.068267-0.3584 0.1536c-17.288533 7.150933-33.553067 18.0224-48.3328 32.324266C628.974933 604.0064 614.4 639.709867 614.4 682.666667z" p-id="2411"></path><path d="M768 716.8H256a34.116267 34.116267 0 0 1-31.351467-47.616l73.386667-170.666667v-0.017066L480.6144 71.901867a34.133333 34.133333 0 0 1 62.7712-0.017067L731.9552 512.170667l67.413333 157.013333A34.133333 34.133333 0 0 1 768 716.8z m-170.666667-68.266667h118.869334l-46.984534-109.4144a0.136533 0.136533 0 0 0-0.034133-0.068266L512 172.066133l-151.210667 353.297067-0.0512 0.136533-52.906666 123.050667H597.333333z" p-id="2412"></path></svg>
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
                    <div  v-show="showMatching || showGeometry" class="triangle" :style="{left: triangleLeft + 'px'}"></div>
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
                     <!-- 矩形 -->
                    <div v-show="showGeometry" class="draw-matching-wrap">

                        <div class="writing-style">
                            <span 
                            v-for="item of geometryList"
                            :key="item.lable"
                            @touchstart="handleChoiceGeometry($event, item.value)"
                            :class="{active: geometry == item.value}"
                            > {{item.lable}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  蒙层 -->
        <div class="mask"
            :style="{width: options.width + 'px', height: options.height + 'px'}"
            @touchstart.stop="handleMask($event)" 
            @touchmove.stop="()=>{}"
            @touchend.stop="()=>{}"
            v-show="showMatching || showGeometry"
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


                // 几何图形
                geometryList: [
                    {lable: '三角形', value: 1},
                    {lable: '矩形', value: 2},
                    {lable: '梯形', value: 3},
                    {lable: '圆形', value: 4},
                    {lable: '箭头', value: 5},
                    {lable: '数轴', value: 6},
                    {lable: '坐标轴', value: 7},
                    // {lable: '椭圆', value: 8},
                    // {lable: '弧形', value: 9}
                ],

                // ----------------------------------------------------------------------



                changeDrawAction: -1,
                // penColor: '',
                //   penColor: '',
                debug: false, // debug
                logLevel: 3,
                // logModule: 'rect', // 日志模块
                
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
                triangleLeft: 0, // 三角形 50  242

                weight: 2,
                writing: 1, // 书写线的 风格
                color: '#f14864',  // 颜色
                showMatching: false,

                // 矩形
                showGeometry: false,
                geometry: 6, // 矩形

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

                this.meaninglessm = false //无意义事件- icon 点击 只需要start move 和 end  都不需要执行
                // 确定 取消 icon
                this.okIcon = {
                    element:  document.getElementById('draw-ok-icon')
                }
                this.cancelIcon =  {
                    element: document.getElementById('draw-cancel-icon')
                }













                const clientW = img.width
                const clientH = img.height
                const { width, height } = this.options
                const { k, width: currentW, height: currentH } = this.convert(img, this.options,)
                this.scale = k
                // 针对小图片
                this.image = {
                    element: img,
                    width: currentW, // 显示宽度
                    height: currentH,
                    x: (width - currentW) / 2, // (canvas宽度 -  img宽度) / 2 =  把图片放正中间
                    y: (height - currentH) / 2,
                    clientWidth: clientW, // 真实 宽度
                    clientHeight: clientH
                }

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
                // ctx.lineCap = 'round'
                for (let index = 0; index < pointList.length; index++) {
                    const el = pointList[index];
    
                    const scale = this.scale / el.scale
                    
                    // 图片已经 缩放过了 -- 到 笔记这里 再缩放-- 就有问题了-- 可以解决  
                    // 存一下 厨师 缩放 比例--为基准--然后计算缩放比
                    ctx.lineWidth = this.limit(el.lineWidth * scale, 1, 15)
                    //  * 1.3 是解决 store 点堆积 会造成线  加粗
                    // 为什么还是 会变细 画的线
                    // ctx.lineWidth = this.limit(el.lineWidth, 1, 15)
                    // console.log(ctx.lineWidth)
                    ctx.beginPath()
                    //  {lable: '书写', value: 1},
                    // {lable: '直线', value: 2},
                    // {lable: '虚线', value: 3},
                    // {lable: '虚直线', value: 4}
                    // 虚线
                    ctx.strokeStyle = el.color
                    
                    const points = el.pointLine

                    // 矩形处理
                    const geometry = el.geometry

                    /**
                     *  只有 数轴有填充颜色的
                     */
                    if (geometry) {
                        ctx.fillStyle = el.color
                    }
                    if (geometry && geometry == 4) {
                        const maxX = image.x + el.maxX * scale
                        const minX = image.x + el.minX * scale
                        const radius = (maxX - minX) / 2 - el.offset
                        const originM = this.restPoint(el.centra, image, scale)
                        this.geometryArc(ctx, originM, radius)
                        continue
                    }
                    /**
                     *  单 箭头
                     */
                    if (geometry && geometry == 5) {
                        const originPointFirst = this.restPoint(points[0], image, scale)
                        const originPointSecond = this.restPoint(points[1], image, scale)
                        ctx.fillStyle = el.color
                        this.geometryLineArrow(ctx, originPointFirst, originPointSecond, 20)
                        continue
                    }
                    if (geometry && geometry == 6) {
 
                        const left = this.restPoint(points[0], image, scale)
                        const right = this.restPoint(points[1], image, scale)
                        const originM = this.restPoint(el.centra, image, scale)
                        ctx.fillStyle = el.color

                        this.geometryLineArrow(ctx, left, right, 15, originM, 'x', scale)
                        continue
                    }
                    if (geometry && geometry == 7) {
                        // const left = this.restPoint(points[3], image, scale)
                        // const right = this.restPoint(points[1], image, scale)
                        // const top = this.restPoint(points[0], image, scale)
                        // const bottom = this.restPoint(points[2], image, scale)

                        const [top, right, bottom, left] = points.map(e => this.restPoint(e, image, scale))
                        const originM = this.restPoint(el.centra, image, scale)

                        this.geometryLineArrow(ctx, left, right, 15, originM, 'x', scale)
                        this.geometryLineArrow(ctx, top, bottom, 15, originM, 'y', scale)
                        continue
                    }

                    // 矩形处理 end

                    if (el.writing == 3 || el.writing == 4) {
                        ctx.setLineDash([5, 10])  // 虚线
                    } else {
                        ctx.setLineDash([]) // 实线
                    }


                    const originPoint = this.restPoint(points[0], image, scale)
                    ctx.moveTo(originPoint.x, originPoint.y)
                    for (let i = 1; i < points.length; i++) {
                        const originPoint = this.restPoint( points[i], image, scale)
                        ctx.lineTo(originPoint.x, originPoint.y)
                    }

                    // 矩形
                    if (geometry) {
                        // 解决 就行闭合  棱角不尖锐
                        ctx.closePath()
                    }
                    ctx.stroke()
                }
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
            handleChoiceGeometry(e, geometry) {
                if(!this.sendData(e, 13, geometry)) return
                this.geometry = geometry
            },
            handleGeometry(e) {
                if(!this.sendData(e, 12)) return
                // 几何图形
                // if(!this.sendData(e, 12)) return
                // 三角形的 定位left
                this.triangleLeft = 240
                this.changeDrawAction = 3

                if ( this.showGeometry) {
                    this.showGeometry = false
                } else {
                    this.showMatching = false
                    this.showGeometry = true
                }
            },
            handleMask(e) {
                if(!this.sendData(e, 14)) return
                this.showMatching = false
                this.showGeometry = false
            },
            handleMatching(e) {
                if(!this.sendData(e, 8)) return
                // 1）touches：当前位于屏幕上的所有手指的列表。
                // 2）targetTouches：位于当前DOM元素上手指的列表。
                // 3）changedTouches：涉及当前事件手指的列表。 
                this.triangleLeft = 50
                if ( this.showMatching) {
                    this.showMatching = false
                } else {
                    this.changeDrawAction = 1

                    this.showGeometry = false
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

                //  初始化  画笔参数  挪到启动地方
                const lineWidth = this.weight // this.limit(this.weight, 1, 15)
                const color = this.color
                const ctx = this.ctx
                ctx.lineWidth = lineWidth - 0.68 // 加粗 原因   写东西的时候 不停 store 导致线条变粗  为了和谐  减去这个值
                ctx.strokeStyle = color

                const ctx2 = this.ctx2
                ctx2.lineWidth = lineWidth // 
                ctx2.strokeStyle = color

                // --  画画
                if (this.changeDrawAction == 1 || this.changeDrawAction == 3) {
                    // console.log('不是普通')
                    // 上次肯定会被清掉
                    this.pointLine = []
                    // 如果是直线 需要永远知道第一个点  在什么位置
                    this.firstPoint = this.drawPoint
                }
            },
            handleMove (e) {
                if (this.meaninglessm) return
                // 判断是不是 读的一端
                if(!this.sendData(e, 2)) return
                // 判断是不是 第一次触发 新动作
                const currentPoint = this.getCoordinateByEvent(e)
                const drawPoint = this.drawPoint


                
                /**
                 *  画笔  用的最多 放在第一个  少很多判断
                 */
                if (this.changeDrawAction == 1) {
                    
                    // 划线  第一个点 用beginPath
                    if (this.writing == 2 || this.writing == 4) { // 是直线
                        const ctx2 = this.ctx2
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
                            ctx2.setLineDash([5, 10]) // 参数是一个数组，数组元素是数字。虚线是实虚交替的，这个数组的元素用来描述实边长度和虚边的长度
                        } else {
                            ctx2.setLineDash([])
                        }
                        // 这个  ctx  不一样
                        ctx2.beginPath()
                        // ctx.lineCap = 'round'
                        // ctx2.strokeStyle = this.color
                        // ctx2.lineWidth = lineWidth
                        ctx2.moveTo(this.firstPoint.x, this.firstPoint.y)
                        ctx2.lineTo(currentPoint.x, currentPoint.y)
                        ctx2.stroke()
                        //  this.drawPoint  用这个变量的原因是  起点和最后一点 都不在 move事件上
                        if (this.pointLine.length === 0) {
                            this.pointLine.push(drawPoint)
                        }
                    } else {
                        // 划线
                        // 先实现划线
                        //  画 相对于 画布  // 存 相对于 画布
                        // 屡一下   -- 这个东西  想对于画布  在图片在哪里 ===== 根据图片的位置还原 画布位置
                        const ctx = this.ctx
                        // ctx.lineCap = 'round'
                        // 解决 突然同步-- 这两个属性化石上个回放的属性 还有 笔的  很多问题  突然杀入  应尽量避免这个问题
                       
                        if (this.pointLine.length == 0) {
                            if (this.writing == 3) {
                                ctx.setLineDash([5, 10])
                            } else {
                                ctx.setLineDash([])
                            }
                            ctx.beginPath()       
                            ctx.moveTo(drawPoint.x, drawPoint.y)
                            ctx.lineTo(currentPoint.x, currentPoint.y)
                        } else {
                            ctx.lineTo(currentPoint.x, currentPoint.y)
                        }
                        ctx.stroke()

                        //  this.drawPoint  用这个变量的原因是  起点和最后一点 都不在 move事件上 // end  上的 最后一笔 时最准确的 
                        this.pointLine.push(drawPoint)
                    }
                    this.drawPoint = currentPoint
                    return
                }
                

                /**
                 * 
                 *  橡皮
                 * 
                 */

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
                            x < minPonit.x ||
                            y < minPonit.y)
                        ) {
                            this.log('不在这条线的矩形内-- 不检测跳过进入下一条：预检测耗时' + 
                            '' + (new Date().getTime() - time1) + 'ms' )
                            continue 
                        }
                        // 圆 特殊处理
                        const geometry = element.geometry
                        if (geometry && geometry == 4) {
                            const radius = (maxPonit.x - minPonit.x) / 2 - element.offset
                            const originM = this.restPoint(element.centra, image, scale)
                            const dis = this.getDistance({pageX: x, pageY: y}, {pageX: originM.x, pageY: originM.y})
                            // dis < lineDis || 
                            if (Math.abs(dis - radius) < lineDis) {
                                this.removeLine(index)
                                this.sendData(e, 4, index)
                            }
                            continue
                        }
                        //  坐标轴
                        if (geometry && geometry == 7) {
                            // const points = element.
                            // 点到 线的 距离
                            const dis = this.distanceOfPoint2Line(this.restPoint(pointLine[3], image, scale), this.restPoint(pointLine[1], image, scale), {x, y})
                            // 点到 线的 距离
                            if (dis <= lineDis ) {
                                this.removeLine(index)
                                this.sendData(e, 4, index)
                                // 尽量少算一个
                                continue
                            }
                            const dis2 = this.distanceOfPoint2Line(this.restPoint(pointLine[0], image, scale), this.restPoint(pointLine[2], image, scale), {x, y})
                            if (dis2 <= lineDis) {
                                this.removeLine(index)
                                this.sendData(e, 4, index)
                            }
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
                            if (Math.abs(x - originPoint.x) < lineDis && Math.abs(y - originPoint.y) < lineDis) {
                                this.removeLine(index)
                                this.sendData(e, 4, index)
                                this.log( '点判断删除 + 耗时' + '' + (new Date().getTime() - time) + 'ms', 'red', 2)
                                break
                            }
                            // 判断线 不是最后一个
                            if (lineLength == 1 || j == lineLength - 1) break
                            const secondItem = pointLine[j + 1]
                            // 如果 离上一个点差的很远 ---  用线 检测
                            if (geometry || this.getDistance({pageX: item.x, pageY: item.y}, {pageX: secondItem.x, pageY: secondItem.y}) > lineDis ) {
                                // this.log('差的很远的的一条线 橡皮离这个线的距离')
                                const dis = this.distanceOfPoint2Line(originPoint, this.restPoint(secondItem, image, scale), {x, y})
                                // this.log('点到线的距离为： ' + dis)
                                if (dis < lineDis) {
                                    this.removeLine(index)
                                    this.sendData(e, 4, index)

                                    this.log( '点到线距离判断删除 + 耗时' + '' + (new Date().getTime() - time) + 'ms', 'red', 2)
                                    break
                                }
                            }
                        }
                        this.log('index:' + index + ',这根线检测完毕 ：检测耗时' + '' + (new Date().getTime() - time2) + 'ms', 'red', 2)
                        // 20
                    }
                    // this.log('橡皮的半径' + ('' + radius))

                    //  检测耗时 不多  主要在 重绘耗时
                    this.log( '一共(' + pointList.length + 
                        '根),检测耗时' + '' + 
                        (new Date().getTime() - time) + 'ms', 'red', 5)
                    return
                }

                /**
                 * 
                 *  矩形
                 * 
                 */
                if (this.changeDrawAction == 3) {
                   
                    // console.log('矩形')
                    // this.log('矩形模式', 'red', 2, 'rect')
                    const firstPoint = this.drawPoint
                  
                   
                    let points = []
                    switch (this.geometry) {
                        case 1:
                            // 三角形
                            points = [
                                // {x: firstPoint.x, y: firstPoint.y },
                                {x: firstPoint.x, y: currentPoint.y },
                                {x: currentPoint.x, y: currentPoint.y },
                                {x: firstPoint.x, y: firstPoint.y },
                            ]
                            break
                        case 2:
                            // 四边形
                            points = [
                                //  {x: firstPoint.x, y: firstPoint.y },
                                {x: currentPoint.x, y: firstPoint.y },
                                {x: currentPoint.x, y: currentPoint.y},
                                {x: firstPoint.x, y: currentPoint.y },
                                {x: firstPoint.x, y: firstPoint.y },
                            ]
                            break
                        case 3:
                            // 梯形
                            const rectLength = (currentPoint.x - firstPoint.x) / 3
                            points = [
                                // {x: firstPoint.x, y: firstPoint.y },
                                {x: currentPoint.x  - rectLength, y: firstPoint.y },
                                {x: currentPoint.x, y: currentPoint.y},
                                {x: firstPoint.x - rectLength, y: currentPoint.y },
                                {x: firstPoint.x, y: firstPoint.y },
                            ]
                            break
                        case 4: // 圆
                        case 5: // 箭头

                            points = [firstPoint, currentPoint]
                             break
                        case 6: // 数轴
                        case 7: // 坐标轴轴
                        case 8: // 椭圆
                            const midpoint =  this.getMidpoint(firstPoint, currentPoint)
                            points = [
                                {x: midpoint.x, y: firstPoint.y },
                                {x: currentPoint.x, y: midpoint.y },
                                {x: midpoint.x, y: currentPoint.y },
                                {x: firstPoint.x, y: midpoint.y },
                            ]
                            break
                        default:
                            break
                    }

                    this.renderGeometry(points, 8, false)

                    this.pointLine = points

                    return 
                }

                /**
                 * 
                 * 缩放
                 * 
                 */
                const touches = e.touches
                if (touches.length == 2 && this.changeDrawAction == -1) {
                    // 缩放控制端 不走
                    if (this.type == 1 ) return
                  
                    let k; // 最终的缩放系数
                    const scale = this.scale
                    // const offset = e.deltaY / 800;

                    
                    let startTouches = this.startTouches
                    // --- 要和前一个比 不能和最开始的比
                    const dis1 = this.getDistance(touches[0], touches[1])
                    const dis2 = this.getDistance(startTouches[0], startTouches[1])
                    if ( Math.abs(dis1 - dis2) < 2) {
                        return //  避免闪动
                    }

                    k = dis1 / dis2
                    this.startTouches = touches
                    // k = k < 1 ? k / 10 : k * 10
                    k = k < 1 ? 1 / (1 + k / 60) : 1 + k / 60
                    // k = this.limit(k * scale, 0.5, 1.2)

                    // k = k.toFixed(2)  //// 
                    // k = k < 1 ? 1 / (1 + k / 60) : 1 + Math.abs(k) / 60
                    // tMatrix[0] + sc - 1 > 0.5 && tMatrix[0] + sc - 1 < 3 ? tMatrix[0] + sc - 1 : tMatrix[0];
                    k = this.limit(k * scale, 0.5, 3)
                   if (k == this.scale) return
                    // 直接通知对方 缩放比例 不用再计算-- 自己计算 容易出现两边不同步
                    this.sendData(e, 5, k)
                    this.scaleImage(k)
                    // 在这个里边赋值 this.scale
                    return
                }
  
                // 这是干啥的--画=>图片和 线  移动
                const type = this.startPoint ? this.startPoint.type : null
                if (type) { // && this.getCoordinateByEvent(e)
                    this[type](currentPoint)
                }
            },

            handleEnd(e){
                // 必须放在第一个  因为 要通知-- 控制方  把meaninglessm  重置为 false
                if(!this.sendData(e, 3)) return
                if (this.meaninglessm) {
                    this.meaninglessm = false
                    return
                }
               //  结束对 延迟的 感知很小-- 可以把计算量大的都移动到 这部分来
               const radius = 7 // 辅助的 圆球半径 

                // 有两种 动作  画笔 和 橡皮

                if (this.changeDrawAction == -1) return
                if (this.changeDrawAction == 3) {

                    if(this.geometry == 5) {
                        this.clearCtx2()
                        this.addNewData(true)
                        this.renderCanvas()
                        return
                    }
                    if (this.geometry == 7) {
                        const left = this.pointLine[3]
                        const right = this.pointLine[1]
                        const top = this.pointLine[0]
                        const bottom = this.pointLine[2]
                        if (Math.abs(left.x - right.x) < 80) {
                            this.clearCtx2()
                            return
                        }
                        //  如果  两个点 小于 80 --- 不给保留
                        // 如果出现 起点变终点--- 对调一下-- 可以省 很多判断-----但是 有点局限了
                        const arr = [...this.pointLine]
                        if (left.x > right.x) {
                           arr[3] = right
                           arr[1] = left
                        }

                        if (top.y > bottom.y) {
                            arr[2] = top
                            arr[0] = bottom
                        }
                        this.pointLine = arr
                        // 更新 偏移量
                        this.offsetLeft = this.circleMidpoin.x - this.pointLine[3].x  
                    }
                    if (this.geometry == 6) {
                        const left = this.pointLine[3]
                        const right = this.pointLine[1]
                        // const top = this.pointLine[0]
                        // const bottom = this.pointLine[2]
                        if (Math.abs(left.x - right.x) < 80) {
                            this.clearCtx2()
                            return
                        }
                        //  如果  两个点 小于 80 --- 不给保留
                        // 如果出现 起点变终点--- 对调一下-- 可以省 很多判断-----但是 有点局限了
                            if (left.x < right.x) {
                                this.pointLine = [left, right]
                            } else {
                                this.pointLine = [right, left]
                            }
                            // 更新 偏移量
                            this.offsetLeft = this.circleMidpoin.x - this.pointLine[0].x
                   
                            
                    }
                    this.renderGeometry(this.pointLine, radius, true)
                    //  待确认状态
                    this.changeDrawAction = 4
                    // 获取可滑动的 控制点
                    return
                }
                // 搜集点 进入画笔
                // this.log(this.pointLine)
                if (this.changeDrawAction == 1 && this.pointLine.length > 0) {
                    const drawPoint = this.drawPoint
                    this.pointLine.push({
                        x: drawPoint.x,
                        y: drawPoint.y
                    })
                    this.addNewData()
                }

                /**
                 *  结束事件 对延迟没什么要求------ 
                 */
                // 清除第二canvas 画布
                // 这个判断有问题  changeDrawAction  2 是橡皮  writing 2 4  是直线
                // console.log(this.changeDrawAction)
                if (this.changeDrawAction == 2 ) {
                    this.clearCtx2()
                }

                // 直线的 橡皮画在-- 第二个canvas上
                if(this.changeDrawAction == 1 && (this.writing == 2 || this.writing == 4)) {
                    this.clearCtx2()
                    this.renderCanvas()
                }
                // 解决橡皮插  会改变全局ctx.strokeStyle
                if(this.changeDrawAction == 2) {
                   this.ctx.strokeStyle = this.color
                }
                
            },
            addNewData(isGeometry) {
                // {radius: null, centra: null}
                // 给个正方形----- 
                //  加个 maxX maxY  minX minY
                // 会有 明明在范围内 检测不到--- 范围太小了 加一点
                const offset = 4
                let points = this.pointLine
                const image = this.image
                // 三角形  正方形 和 梯形 --- 和点线一样的 判断
                if  (this.changeDrawAction == 3) {
                    if ((this.geometry == 1 || this.geometry == 2 || this.geometry == 3)) {
                        points = this.pointLine.slice(-1).concat(this.pointLine)
                    }

                }
                points = points.map(e=> {
                    return  {
                        x: e.x - image.x,
                        y: e.y - image.y
                    }
                })
                const { maxX, maxY, minX, minY } = this.getCritica(points, offset)


                let pointObj = {
                    pointLine: points,
                    scale: this.scale, //  e.scale || this.scale, 为什么 e.scale
                    lineWidth: this.weight,
                    color: this.color,
                    writing: this.writing,
                    maxX,
                    maxY,
                    minX,
                    minY,
                    offset,
                }
                if (isGeometry) {
                    console.log('点的个数:' + points.length)
                    // 特殊解构
                    // delete pointObj.pointLine
                    pointObj.geometry = this.geometry

                    if(this.geometry == 4 || this.geometry == 6 || this.geometry == 7) {
                        pointObj.centra = {
                            x: this.circleMidpoin.x - image.x,
                            y: this.circleMidpoin.y - image.y,
                        }
                    }
                }
                this.pointList.push(pointObj)
                this.pointLine = []
        

                /**
                 *  结束事件 对延迟没什么要求------ 
                 */
                // 清除第二canvas 画布
              
            },
            geometryArc(ctx, midpoin, radius) {
                    // ctx.arc(midpoin.x, midpoin.y, 1, 0, 2 * Math.PI)
                    // ctx.stroke()

                    // 圆圈
                    ctx.beginPath()
                    ctx.arc(midpoin.x, midpoin.y, radius , 0, 2 * Math.PI)
                    
                    ctx.stroke()
            },
            //   箭头
            geometryLineArrow(ctx, p1, p2, headlen, midpoin, Axis, k = 1) {
                let fromX, fromY, toX, toY

                headlen = headlen * k //  箭头的的 长度
                // 箭头
                fromY = p1.y
                fromX = p1.x
                toX = p2.x
                toY = p2.y

                if (midpoin) {

                    if (Axis == 'y') {
                        // 是y轴
                        if (p1.y > p2.y) {
                            fromY = p1.y
                            fromX = p1.x
                            toX = p2.x
                            toY = p2.y
                        } else {
                            fromY = p2.y
                            fromX = p2.x
                            toX = p1.x
                            toY = p1.y
                        }
                    } else {
                        // 是x轴
                        if (p1.x > p2.x ) {
                            fromY = p2.y
                            fromX = p2.x
                            toX = p1.x
                            toY = p1.y 
                        }

                                
                    // 中间位置
                        ctx.beginPath()
                        ctx.arc(midpoin.x, midpoin.y, 5 * k , 0, 2 * Math.PI)
                        ctx.fill()
                        ctx.stroke()
                    }

                    //  把 数组的 坐标画出来
                    this.geometryAxis(ctx, p1, p2, midpoin, Axis, k)
                }

                // const headlen = 20 //自定义箭头线的长度
                const theta = 20 //自定义箭头线与直线的夹角，个人觉得45°刚刚好
                
                // 计算各角度和对应的箭头终点坐标
                const angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI
                const angle1 = (angle + theta) * Math.PI / 180
                const angle2 = (angle - theta) * Math.PI / 180
                const topX = headlen * Math.cos(angle1)
                const topY = headlen * Math.sin(angle1)
                const botX = headlen * Math.cos(angle2)
                const botY = headlen * Math.sin(angle2)
                ctx.beginPath()
                //画直线
                ctx.moveTo(fromX, fromY)
                ctx.lineTo(toX, toY)
                //箭头线终点坐标
                const arrowX = toX + topX
                const arrowY = toY + topY
                //画上边箭头线
                ctx.moveTo(arrowX, arrowY)
                ctx.lineTo(toX, toY)


                const arrowX1 = toX + botX
                const arrowY1 = toY + botY
                //画下边箭头线
                ctx.lineTo(arrowX1, arrowY1)


                
                ctx.fill()
                ctx.stroke()
            },
            /**
             * 
             *  中心点  起点 终点  x轴/y轴 缩放比例
             */
            geometryAxis(ctx, p1, p2, midpoin, Axis, k = 1) {
                 // 圆心到终点位置
                const bulge = this.limit(5 * k, 2, 50 ) // 左边位置
                const interval = 50 * (this.type == 2 ?  k : this.kScale * k) // 左边间隔
                // 如何兼容 y 轴
                 let from,  to
                if (p1[Axis] < p2[Axis]) {
                    from = p1[Axis]
                    to = p2[Axis]
                } else {
                    from = p2[Axis]
                    to = p1[Axis]
                }
                // 轴的 x 坐标   0.0 的 位置
                // const y = midpoin.y
                const offsetLeft = midpoin[Axis]- from
                const offsetRight = to - midpoin[Axis]
                function mark(p1, p2) {
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)  
                }
                let leftNumber =  Math.floor(offsetLeft / interval) + 1
                let rightNumber = Math.floor(offsetRight / interval) + 1
                if (leftNumber < 0) {
                    leftNumber = leftNumber * -1 + 1
                    rightNumber = rightNumber * -1 + 1
                }
                

                ctx.beginPath()
                for (let index = 1; index < leftNumber; index++) {
                    const start = midpoin[Axis] - interval * index
                    if (Axis == 'x') {
                        mark({x: start, y: midpoin.y}, {x: start, y:  midpoin.y - bulge})
                    } else {
                        mark({x: midpoin.x, y: start}, {x: midpoin.x + bulge, y: start})
                    }
                 
                }
                for (let index = 1; index < rightNumber; index++) {
                    const start = midpoin[Axis] + interval * index
                    if (Axis == 'x') {
                        mark({x: start, y: midpoin.y}, {x: start, y:  midpoin.y - bulge})
                    } else {
                        mark({x: midpoin.x, y: start}, {x: midpoin.x + bulge, y: start})
                    }
                }
                ctx.stroke() 
            },
            geometryEllipse(context, x, y, a, b){  // 椭圆
                //关键是bezierCurveTo中两个控制点的设置
                //0.5和0.6是两个关键系数（在本函数中为试验而得）
                var ox = 0.5 * a,
                oy = 0.6 * b;
                context.save();
                context.translate(x, y);
                context.beginPath();
                //从椭圆纵轴下端开始逆时针方向绘制
                context.moveTo(0, b); 
                context.bezierCurveTo(ox, b, a, oy, a, 0);
                context.bezierCurveTo(a, -oy, ox, -b, 0, -b);
                context.bezierCurveTo(-ox, -b, -a, -oy, -a, 0);
                context.bezierCurveTo(-a, oy, -ox, b, 0, b);
                context.closePath();
                context.stroke();
                context.restore();

            },

            // 渲染几何图形
            /**
             *  1. 绘图点
             *  2. 辅助线的 圈半径
             *  3. 是否显示 辅助线  （箭头特别）
             */
            renderGeometry(points, radius, isAuxiliary) {
                const ctx = this.ctx2
                this.clearCtx2()
                 
                 

                // 画圆
                // if (condition) {
                    
                // }
                //    矩形
                // 给每个角 上个圆圈
                // const radius = 10 //  半径
                const geometry = this.geometry
                ctx.strokeStyle = this.color
                ctx.lineWidth = this.weight
                ctx.fillStyle= this.color
                ctx.beginPath()
                if (geometry == 8) {
                    const  firstPoint =  points[3]
                    const  secondPoint = points[1]
                    const m = this.getMidpoint(firstPoint, secondPoint)
                    const a = m.x - points[3].x
                    const b =  points[0].y - m.y
                    this.geometryEllipse(ctx, m.x, m.y, a, b)
                } else 
                // 圆形
                 if (geometry == 6 || geometry == 7) { 
                    // 箭头
                    let firstPoint
                    let secondPoint
                    if (points.length == 2) {
                        firstPoint = points[0]
                        secondPoint = points[1]
                    } else {
                        firstPoint = points[3]
                        secondPoint = points[1]
                    }


                    // 把 左边那个求出来
                    if (!isAuxiliary) {
                        this.circleMidpoin = this.getMidpoint(firstPoint, secondPoint)
                    } else {
                        const y = firstPoint.y //  y 是固定的
                        this.circleMidpoin = {x: firstPoint.x + this.offsetLeft, y}
                    }
                    //   怎么画 y 轴坐标
                    this.geometryLineArrow(ctx, firstPoint, secondPoint, 15, this.circleMidpoin, 'x')

                    if (this.geometry == 7) {

                        // 不可以存 2笔--图中一个 全部删除//  要特殊对待了  判断两根直线
                        this.geometryLineArrow(ctx, points[0], points[2], 15, this.circleMidpoin, 'y')
                    }
                    // 
                } else if (geometry == 5) { 
                    // 箭头 
                    this.geometryLineArrow(ctx, points[0], points[1], 20)
                } else if (geometry == 4) {
                    // 圆形可以当做正方形来做  圆心就是 中间  半径就是 边长 / 
                     //  圆心
                     
                     let firstPoint, secondPoint
                    // ----------------
                    if (points.length == 2 || this.index == 3 || this.index == 0) {
                        firstPoint = points[0]
                        secondPoint = points[3] ? points[3] : points[1]
                    } 
                    else {
                        firstPoint = points[2]
                        secondPoint = points[1]
                    }
                    const midpoin = this.circleMidpoin = this.getMidpoint(firstPoint, secondPoint)
                    const radius = this.circleRadius = this.getDistance({pageX:firstPoint.x, pageY: firstPoint.y}, {pageX: midpoin.x, pageY: midpoin.y})

                    this.geometryArc(ctx, midpoin, radius)
             
                } else {
                    // 多边形
                    //  测试 两个循环快-- 线越多 越明显
                    const startPoint = points.slice(-1)[0]
                    ctx.moveTo(startPoint.x, startPoint.y)
                    for (let index = 0; index < points.length; index++) {
                        const item = points[index]
                        ctx.lineTo(item.x, item.y)
                    }
                    ctx.closePath()
                    ctx.stroke()
                }
                
                // 辅助线
                if (isAuxiliary && geometry !== 5) {  //  箭头是没有控制点的


                    this.rectControlPoint = this.getControlPoint(points)
                    // 画4个控制点
                    for (let index = 0; index < this.rectControlPoint.length; index++) {
                        const item =  this.rectControlPoint[index]
                        ctx.beginPath()
                        ctx.arc(item.x, item.y, radius, 0, 2 * Math.PI)
                        ctx.fill();  
                        ctx.stroke()
                    }
                    // 4个圈是 对的
                    // 画辅助线
                    this.drawAuxiliaryLine(ctx, this.rectControlPoint)
                }  
              
            },
            // 获取控制点
            getControlPoint(points) {
                const radius = 10
                // 画图
                if (this.geometry == 4 ) {
                    // 圆形 都要特殊处理
                    const midpoin = this.circleMidpoin
                    const circleRadius = this.circleRadius 

                    const arr = [
                        {x: midpoin.x, y: midpoin.y - circleRadius, width: radius * 2, height: radius * 2},
                        {x: midpoin.x + circleRadius, y: midpoin.y, width: radius * 2, height: radius * 2},
                        {x: midpoin.x - circleRadius , y: midpoin.y, width: radius * 2, height: radius * 2},
                        {x: midpoin.x, y: midpoin.y + circleRadius, width: radius * 2, height: radius * 2},
                    ]
                    this.pointLine = arr
                    return arr

                }

               
                return points.map(item => (
                    { x: item.x, y: item.y, width: radius * 2, height: radius * 2 }
                ))
            },
            //  画辅助线
            drawAuxiliaryLine(ctx, points) {

                // import okIcon from './img/ok.png'
                // import cancelIcon from './img/cancel.png'
                //  怎么用上这个矩形  能不根据 矩形 反推 图形
                const { minX, minY, maxX, maxY } = this.getCritica(points, 8)
                

                // 确定 取消 按钮
                ctx.drawImage(this.cancelIcon.element, minX, minY - 20, 20, 20)
                ctx.drawImage(this.okIcon.element, maxX - 20, minY - 20, 20, 20)
                //  事件系统
                this.cancelIcon = {
                    x: minX, y: minY - 20, width: 20, height: 20,
                    element: this.cancelIcon.element
                }
                this.okIcon = {
                   x: maxX - 20, y:  minY - 20, width: 20, height: 20,
                    element: this.okIcon.element
                }




                //
                const AL = {
                    x: minX,
                    y: minY,
                    width: maxX - minX,
                    height: maxY - minY,
                }
                ctx.setLineDash([5, 10])
                ctx.rect(AL.x, AL.y, AL.width, AL.height)
                ctx.stroke()
                ctx.setLineDash([])
                // 拖动   矩形要用
                this.auxiliaryLine = AL
            },
            // 获取最大 最小值
            getCritica(points, offset) {
                let maxX = points[0].x, maxY = points[0].y,  minX = points[0].x, minY = points[0].y
                for (let index = 1; index < points.length; index++) {
                    const element = points[index]
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
                return {
                    maxX: maxX + offset,
                    maxY: maxY + offset,
                    minX: minX - offset,
                    minY: minY - offset,
                }
            },
            /**
             *  scale 缩放 比例
             *  position  是否要计算图片的xy位置
             * 
             *  因为 读初始化  图片的 xy 是 传过来的不 需要计算 
             * 
             */
            scaleImage(scale, position) {
                this.scale = scale
                const image = this.image

                const width = image.clientWidth * scale
                const height = image.clientHeight * scale
                if (!position) {
                    this.image.x += (image.width - width) / 2
                    this.image.y += (image.height - height) / 2
                }
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
            // getRange() {

            // },
            // start 就触发

            // 恢复 3
            recoveryThree() {
                this.clearCtx2()
                this.changeDrawAction = 3
            },
            //  touchstart  触发 这个方法
            getPointByCoordinate({x, y}) {

                this.log('触发检测 点击区域')
                // if (this.changeDrawAction !== -1) {
                //     return
                // }
           
                const image = this.image
                let t = {}
                let index = 0 // 第几个控制点
                if (this.changeDrawAction == 4 && this.checkRegion(x, y, this.cancelIcon)) {
                    this.log('cancelIcon', '#f60rrr', 3)
                    /**
                     * 问题--  控制方 有时候-- 点击 会点不上
                     * 
                     * 控制点 有同样问题
                     * 
                     */
                    this.recoveryThree()
                    this.meaninglessm = true

                } else  if (this.changeDrawAction == 4 && this.checkRegion(x, y, this.okIcon)) {
                    // console.log('okIcon')
                    this.log('okIcon', '#f60rrr', 3)


                    this.changeDrawAction = 3
                    this.clearCtx2()
                    this.addNewData(true)
                    this.renderCanvas()
                    this.meaninglessm = true
                } else if (this.changeDrawAction == 4 && this.rectControlPoint.some((point,i) => {
                    index = i
                    // 要构造一个小 正方形
                    return this.checkRegion(x, y, {...point, x: point.x - 8 , y: point.y - 8,})
                })) {
                    // 控制点
                    // 面条代码
                    t.type = 'handlePointMove'
                    this.index = index


                } else if (this.changeDrawAction == 4 && this.checkRegion(x, y, this.auxiliaryLine)) {
                    // 矩形拖动
                    t.type = 'handleGeometryMove'
                    t.x = x 
                    t.y = y
                    this.oldPointLine = this.pointLine.slice()
                    
                    // console.log(this.oldPointLine)
                } else if (this.changeDrawAction ==  -1 && this.checkRegion(x, y, image)) {
                    // 图片
                    t.offsetX = x - image.x
                    t.offsetY = y - image.y
                    t.type = 'handleImageMove'
                }
                return t
            },
            //  第一个值  第二个  中间点  point  点中哪个点
            getAxisCritical(circleMidpoinVlaue, pointVlaue, isStartPoint) {
                // 尽量 不要 依赖this
                const number = 40
                const rightMinX = circleMidpoinVlaue + number
                const leftMinX = circleMidpoinVlaue - number
                if (isStartPoint) {
                    // 算出最大 最小值
                    if (pointVlaue > leftMinX) {
                       return leftMinX
                    }
                } else {
                    if (pointVlaue < rightMinX) {
                        return rightMinX
                    }
                }
                return  pointVlaue
            },
            handlePointMove(point) {
                //  和point 关联起来
                // 1. 靠手写  
                // 2. 用辅助线来 -- 确定 图形

                    
                // 1三角 2四边 3梯形
                if (this.geometry == 7) {
                    switch (this.index) {
                        case 0:
                        case 2:
                            const topBottomX = this.circleMidpoin.x  // x 是不会变的
                            const topBottomY = this.getAxisCritical(this.circleMidpoin.y, point.y, this.index == 0)
                            this.pointLine.splice(this.index, 1, { x: topBottomX, y: topBottomY })
                            break
                        case 3:
                        case 1:
                            // 左右
                            const x = this.getAxisCritical(this.circleMidpoin.x, point.x, this.index == 3)
                            if (this.index == 3) {
                                this.offsetLeft = this.circleMidpoin.x - x
                            }
                            const y = this.circleMidpoin.y  // y 是不会变的
                            this.pointLine.splice(this.index, 1, { x, y})
                            break;
                        default:
                            break;
                    }
                    
                } else if (this.geometry == 6) {

                    //  中间点  point  点中哪个点
                    const x = this.getAxisCritical(this.circleMidpoin.x, point.x, this.index == 0)
                    if (this.index == 0) {
                        this.offsetLeft = this.circleMidpoin.x - x
                    }
                    const y = this.circleMidpoin.y  // y 是不会变的
                    this.pointLine.splice(this.index, 1, { x, y})
                } else if (this.geometry == 4) {
                    // console.log(this.geometry)
                    // 这个圆形和 四边形一样的逻辑
                    const  currentPoint = this.pointLine[this.index]
                    if (this.index == 3 || this.index == 0) {
                        this.pointLine.splice(this.index, 1, {x: currentPoint.x, y: point.y})
                    } else {
                        this.pointLine.splice(this.index, 1, {x: point.x, y: currentPoint.y})
                    }
                    

                } else if (this.geometry == 2 || this.geometry == 4 || this.geometry == 3) {
                    //  相邻 两个控制点 要变
                    let beforeIndex = 0
                    if (this.index == 0) {
                        beforeIndex = 3
                    } else {
                        beforeIndex = this.index - 1
                    }

                   let afterIndex = 0
                    if (this.index == 3) {
                        // 对的
                        afterIndex = 0
                    } else {
                        afterIndex = this.index + 1
                    }

                    const before = this.pointLine[beforeIndex]
                    const after = this.pointLine[afterIndex]
                    if (beforeIndex == 1 || beforeIndex == 3) {
                        // 对的
                        if (this.geometry !== 3) {
                            this.pointLine.splice(afterIndex, 1, {x: point.x, y: after.y})
                        }
                        this.pointLine.splice(beforeIndex, 1, {x: before.x, y: point.y})
                    } else {
                        if (this.geometry !== 3) {
                            this.pointLine.splice(beforeIndex, 1, {x: point.x, y: before.y})
                        }
                        this.pointLine.splice(afterIndex, 1, {x: after.x, y: point.y})
                    }

                    this.pointLine.splice(this.index, 1, point)

                } else {
                    this.pointLine.splice(this.index, 1, point)
                }
                // console.log()
                // console.log('移动控制点')
          
                // --
                // 控制点
                // this.lin
                this.renderGeometry(this.pointLine, 8, true)
               
            },
            // 移动辅助线
            handleGeometryMove({ x, y }) {
                const { width, height } = this.options
                const s = this.startPoint


                // 要基于  最开始的  加  而不是 上次的加 

                // 这是第一个x 第一个点的 位置
                // const auxiliaryLineMaxX = width - auxiliaryLine.width - 5
                // const auxiliaryLineMaxY = height - auxiliaryLine.height - 5
                // 求出 --当前xy  相对于 辅助线的 位置
         
                    const maxX = width - 8
                    const maxY = height - 8
                    const currentX = x - s.x 
                    const currentY =  y - s.y


                    // 方案一
                    // this.pointLine = this.oldPointLine.map(e => {
                    //     return {
                    //         x: this.limit(e.x + currentX, 10, maxX) ,
                    //         y: this.limit(e.y + currentY, 30, maxY)
                    //     }
                    // })
                    // this.renderGeometry(this.pointLine, 10, true)



                    // 方案二
                    let arr = []
                    for (let index = 0; index < this.oldPointLine.length; index++) {
                        const element = this.oldPointLine[index]
                        const item = { x: element.x + currentX, y: element.y + currentY }
                        if (item.x <= 8 || item.y <= 28 || item.x >= maxX || item.y >= maxY ) {
                           return
                        }
                        arr.push(item)
                    }

                    // 方案三
                    // let arr = []
                    // const { minX, minY, maxX, maxY } = this.getCritica(this.oldPointLine, 0)
                    // const pointMaxX = width - 10
                    // const pointMaxY = height - 10
                   
                    // for (let index = 0; index < this.oldPointLine.length; index++) {
                    //     const element = this.oldPointLine[index]
                    //     let item = { x: element.x + currentX, y: element.y + currentY }
                    //     console.log( item.x + '==' + minX)
                    //     //  console.log()
                    //     if(item.x == minX) {
                    //        item.x = this.limit(item.x, 10, maxX) 
                    //     } else  if(item.x == maxX) {
                    //        item.x = this.limit(item.x, minX, pointMaxX) 
                    //     } else if(item.y == minY) {
                    //        item.y = this.limit(item.y, 10, minY) 
                    //     } else if(item.y == maxY) {
                    //         item.y = this.limit(item.y , minY, pointMaxY) 
                    //     }
                    //     arr.push(item)
                    // }



                   this.pointLine = arr
                   this.renderGeometry(this.pointLine, 8, true)

                
                // 判断边界
                //    this.auxiliaryLine.x = this.limit(currentX, 0, maxX)
                //    this.auxiliaryLine.y = this.limit(currentY, 0, maxY)
                // this.draw()
            },
            // 求两点的中点
            getMidpoint(p1, p2) {
                return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
            },
            // 求两点之间的 距离
            getDistance(p1, p2) {
                const x = p2.pageX - p1.pageX,
                    y = p2.pageY - p1.pageY
                return Math.sqrt((x * x) + (y * y))
            },
           /*
            * 两点的夹角
            */
            getAngle(p1, p2) {
                var x = p1.pageX - p2.pageX,
                    y = p1.pageY - p2.pageY;
                return Math.atan2(y, x) * 180 / Math.PI;
            },
            // 限定范围值
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
                // return false
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
                /**
                 *  如果是写的话 --  直接返回 data  就好了  不需要计算
                 */
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
                        this.log('缩放', 'orange', 3)
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
                    case 12: 
                        this.log('选择几何图形板', '#f60rrr', 3)
                        this.handleGeometry({}, value)
                        break
                    case 13: 
                        this.log('选择几何图形', '#f60rrr', 3)
                        this.handleChoiceGeometry({}, value)
                        break
                    case 14: 
                        this.log('空白地方', '#f60rrr', 3)
                        this.handleMask()
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
                                // this.image.x  这是真是 位置  不是根据图片来的 他本省就是图片
                                imageX: this.image.x, // 
                                imageY: this.image.y, // 图片你位置
                                //TODO:  缺少注释
                                drawPoint: this.drawPoint, // 前一个点

                                weight: this.weight, // 线粗细
                                writing: this.writing, // 书写线的 风格
                                color: this.color,  // 颜色
                                showMatching: this.showMatching, // 调色盘

                                // 矩形 相关 ---| 矩形盘
                                showGeometry: this.showGeometry,
                                geometry: this.geometry,
                                // circleMidpoin: this.circleMidpoin,
                                offsetLeft:  this.offsetLeft,
                                // 控制点
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
                            // TODO: 这个值 有问题
                            // this.dataScale(value)
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
                            //
                        
                            this.image.x = this.dataScale(originData.imageX)
                            this.image.y = this.dataScale(originData.imageY)
                            
                            this.scaleImage(this.dataScale(originData.scale), true)
                            // 矩形 相关 ---| 矩形盘
                           

                            // 自带renderCanvas
                            /**
                             *  2个 canvas 渲染
                             */
                            /** 
                             *  1. 绘图点
                             *  2. 辅助线的 圈半径
                             *  3. 是否显示 辅助线  （箭头特别）
                             */

                            if (originData.changeDrawAction == 4) {
                                this.showGeometry = originData.showGeometry
                                this.geometry = originData.geometry
                                this.offsetLeft = this.dataScale(originData.showGeometry) 

                                const data = originData.pointLine.map(item => ({ x: item.x * this.kScale, y: item.y * this.kScale }))
                                this.renderGeometry(data, 8, true)
                            }
                            
                            
                            
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