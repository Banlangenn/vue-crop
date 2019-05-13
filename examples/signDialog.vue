<template>
  <transition
    name="dialog-fade">
    <div class="el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick" @mousewheel.prevent.stop="()=>{}"  @touchmove.prevent.stop="()=>{}">
      <div
        class="el-dialog"
        :class="[{ 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header" v-if="$slots.title">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
        </div>
        <!-- 内容模块 -->
        <div class="el-dialog__body" v-if="rendered">
            <slot></slot>
        <!-- 内容模块 -->
        </div>
        <!-- 友好提示 -->
        <div class="popupTips" v-if="$slots.desc">
            <slot name= "desc"></slot>
        </div>
        <!-- 页脚按钮 -->
        <div class="el-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
        <!-- 关闭按钮 -->
        <button
        type="button"
        class="el-dialog__closebtn"
        aria-label="Close"
        v-if="showClose"
        @click="handleClose">
        <i class="el-dialog__close el-icon el-icon-close"></i>
        <!-- 52555 -->
        </button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
    name: 'SignDialog',
    props: {
        visible: Boolean,
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        },
        appendToBody: {
            type: Boolean,
            default: true
        },
        lockScroll: {
            type: Boolean,
            default: true
        },
        showClose: {
            type: Boolean,
            default: true
        },
        width: String,
        fullscreen: Boolean,
        customClass: {
            type: String,
            default: ''
        },
        top: {
            type: String,
            default: '15vh'
        },
        beforeClose: Function,
        center: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            closed: false,
            rendered: -1,
            mask: ''
        }
    },
    watch: {
        visible(val) {
            if (val) {
                this.closed = false
                // this.$emit('open')
                // this.$el.addEventListener('scroll', this.updatePopper)
                this.$nextTick(() => {
                    this.$refs.dialog.scrollTop = 0
                })
                if (this.appendToBody) {
                    document.body.appendChild(this.$el)
                }
                // 添加mask
                let mask = document.createElement('div')
                mask.className = 'modal'
                document.body.appendChild(mask)
                this.mask = mask
            } else {
                if (!this.closed) this.$emit('close')
                // 删除mask
                this.mask.parentNode.removeChild(this.mask)
            }
        }
    },
    computed: {
        style() {
            let style = {}
            if (!this.fullscreen) {
                style.marginTop = this.top
                if (this.width) {
                    style.width = this.width
                }
            }
            return style
        }
    },
    methods: {
        handleWrapperClick() {
            if (!this.closeOnClickModal) return
            this.handleClose()
        },
        handleClose() {
            if (typeof this.beforeClose === 'function') {
                this.beforeClose(this.hide)
            } else {
                this.hide()
            }
        },
        hide(cancel) {
            if (cancel !== false) {
                this.$emit('update:visible', false)
                this.$emit('close')
                this.closed = true
            }
        },
        afterLeave() {
            this.$emit('closed')
        }
    },
    mounted() {
        if (this.visible) {
            this.rendered = true
            // this.open()
            if (this.appendToBody) {
                document.body.appendChild(this.$el)
            }
            let mask = document.createElement('div')
            mask.className = 'modal'
            document.body.appendChild(mask)
            this.mask = mask
            //  document.body.appendChild()
        }
    },
    destroyed() {
        if (this.appendToBody && this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
    }
}
</script>
<style lang="scss">
    .el-dialog__wrapper {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        margin: 0;
        // background-color: rgba(0, 0, 0, .6);
        z-index: 2;
    }
    .el-dialog--center .el-dialog__footer {
        text-align: inherit;
    }
    .el-dialog__footer {
        padding: 10px 0;
        // padding-top: 10px;
        text-align: right;
        box-sizing: border-box;
    }
    .el-dialog {
        position: relative;
        margin: 0 auto 10px;
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        box-sizing: border-box;
        width: 80%;
        padding: 30px 20px;
        max-width: 350px;
        .el-dialog__body {
            position: relative;
            img {
                width: 100%;
            }
        }
    }
    .el-dialog--center {
        text-align: center;
    }
    .el-dialog__closebtn {
        position: absolute;
        left: calc(50% - 15px);
        bottom: -60px;
        width: 30px;
        height: 30px;
        // background-color: red;
        display: inline-block;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
    }
    .el-icon-close {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA7CAYAAADFJfKzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTY2QkIxNzVBRUUzMTFFOEI0QkM5Q0RBNzU4QzcyN0QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTY2QkIxNzZBRUUzMTFFOEI0QkM5Q0RBNzU4QzcyN0QiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzZEMTQwOEFFQ0YxMUU4QjRCQzlDREE3NThDNzI3RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NjZCQjE3NEFFRTMxMUU4QjRCQzlDREE3NThDNzI3RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqhxSVYAAAXVSURBVHja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");
        background-size: 100% 100%;
    }
    .dialog-footer {
        .signBtn {
            width: 96px;
            padding: 9px 21px;
            height: 37px;
            border-radius: 5px;
            border:1px solid #ed554c;
            background-color: #fff;
            font-size: 13px;
        }
        button:first-child {
            margin-right: 10px;
        }
        button:last-child {
            margin-left: 10px;
        }
        .sureBtn {
            color:#ed554c;
        }
        .canceBtn {
            background-color:#ed554c;
            color:#ffffff;
        }
    }
    .popupTips > p, .popupTips > span, .popupTips > div {
                padding: 10 0;
                display:flex;
                flex-direction: column;
                font-size: 15px;
                line-height: 24px;
    }
    // .signBtn {
    //     padding: 9px 21px;
    //     background: #f7584f;
    //     color: #fff;
    //     border: none;
    //     font-size: 13px;
    //     border-radius: 6px;
    //     margin:  0 auto;
    // }
    .sureBtn {
        color:#ed554c;
    }
    .canceBtn {
        background-color:#ed554c;
        color:#ffffff;
    }
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
        z-index: 1;
    }
    .dialog-fade-enter-active{animation:dialog-fade-in .3s}
    .dialog-fade-leave-active{animation:dialog-fade-out .3s}
    @keyframes dialog-fade-in{0%{transform:translate3d(0,-20px,0);opacity:0}to{transform:translateZ(0);opacity:1}}
    @keyframes dialog-fade-out{0%{transform:translateZ(0);opacity:1}to{transform:translate3d(0,-20px,0);opacity:0}}
</style>
