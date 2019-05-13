<template>
  <div class="mt-range" :class="{ 'mt-range--disabled': disabled }">
    <slot name="start"></slot>
    <div class="mt-range-content" ref="content">
      <div class="mt-range-runway" :style="{ 'border-top-width': barHeight + 'px' }"></div>
      <div class="mt-range-progress" :style="{ width: progress + '%', height: barHeight + 'px' }"></div>
      <div class="mt-range-thumb" 
        @touchstart="start($event)"
        @touchmove="drag($event)"
        @touchend="end()" 
        ref="thumb"
        :style="{ left: progress + '%' }"></div>
    </div>
    <slot name="end"></slot>
  </div>
</template>

<style>
    .mt-range {
      position: relative;
      display: flex;
      height: 15px;
      line-height: 15px;
    }
      .mt-range > * {
        display: flex;
        display: -webkit-box;
      }
      .mt-range *[slot=start] {
        margin-right: 5px;
      }
      .mt-range *[slot=end] {
        margin-left: 5px;
      }
      .mt-range-content {
        position: relative;
        flex: 1;
        margin-right: 15px;
      }
      .mt-range-runway {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: -15px;
        border-top-color: #a9acb1;
        border-top-style: solid;
      }
      .mt-range-thumb {
        background-color: red;
        position: absolute;
        left: 0;
        top: 0;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        cursor: move;
        box-shadow: 0 1px 3px rgba(0,0,0,.4);
      }
      .mt-range-progress {
        position: absolute;
        display: block;
        background-color: #1890ff;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
      }
      .mt-range-disabled {
        opacity: 0.5;
      }

</style>

<script type="text/babel">
  export default {
    name: 'mt-range',
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: Number
      },
      barHeight: {
        type: Number,
        default: 1
      }
    },
    computed: {
      progress() {
        const value = this.value;
        if (typeof value === 'undefined' || value === null) return 0;
        return Math.floor((value - this.min) / (this.max - this.min) * 100);
      }
    },
    data(){
        return {
            thumb: null,
            content: null,
            dragState: {}
        }
    },
    methods: {
         start(event) {
          if (this.disabled) return;
          event = event.touches[0]
          const position = this.getThumbPosition()
          const thumbClickDetalX = event.clientX - position.thumbBoxLeft;
          this.dragState = {
            thumbStartLeft: position.left,
            thumbStartTop: position.top,
            thumbClickDetalX: thumbClickDetalX
          };
        },
        drag(event) {
          if (this.disabled) return;
          event = event.touches[0]
          const dragState = this.dragState
          const contentBox = this.content.getBoundingClientRect();
          const deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft - dragState.thumbClickDetalX;
          const stepCount = Math.ceil((this.max - this.min) / this.step);
          const newPosition = (dragState.thumbStartLeft + deltaX) - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);
          let newProgress = newPosition / contentBox.width;
          if (newProgress < 0) {
            newProgress = 0;
          } else if (newProgress > 1) {
            newProgress = 1;
          }
          this.$emit('input', Math.round(this.min + newProgress * (this.max - this.min)))
        },
        end() {
          if (this.disabled) return;
          this.$emit('change', this.value);
          this.dragState = {};
        },
        getThumbPosition() {
            const contentBox = this.content.getBoundingClientRect();
            const thumbBox = this.thumb.getBoundingClientRect();
            return {
                left: thumbBox.left - contentBox.left,
                top: thumbBox.top - contentBox.top,
                thumbBoxLeft: thumbBox.left
            };
        }
    },
    mounted() {
        this.thumb = this.$refs.thumb;
        this.content = this.$refs.content;

}
  };
</script>