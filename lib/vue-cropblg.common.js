module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f589c96-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/cropblg.vue?vue&type=template&id=5aff7163&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"mountNode",staticClass:"mount-node",staticStyle:{"overflow":"hidden"},on:{"touchstart":function($event){return _vm.handleStart($event)},"touchmove":function($event){return _vm.handleMove($event)},"touchend":function($event){return _vm.handleEnd($event)}}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.noImage),expression:"noImage"}],staticClass:"no-image-file",staticStyle:{"height":"100%","display":"flex","justify-content":"center","align-items":"center","flex-wrap":"wrap"},on:{"click":_vm.inputHandle,"touchstart":function($event){$event.stopPropagation();return (function (){})($event)},"touchmove":function($event){$event.stopPropagation();return (function (){})($event)}}},[_vm._t("placeholder",[_c('span',[_vm._v("暂时没有图片,请选择图像")])]),_c('div',{staticStyle:{"display":"none"}},[_c('input',{attrs:{"type":"file","multiple":false,"id":"file-input","accept":"image/*"},on:{"change":_vm.uploadImg}}),_vm._t("defaultImgUrl")],2)],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/cropblg.vue?vue&type=template&id=5aff7163&

// CONCATENATED MODULE: ./packages/util.js
// exif  https://github.com/exif-js/exif-js/blob/master/exif.js
var getImageDirection = function getImageDirection(img) {
  return new Promise(function (reslove, reject) {
    getImageData(img).then(function (data) {
      var orientation = getOrientation(data) || 1;
      reslove(orientation);
    }).catch(function (error) {
      reject(error);
    });
  });
}; // 这里的获取exif要将图片转ArrayBuffer对象，这里假设获取了图片的baes64
// 步骤一
// base64转ArrayBuffer对象

function getImageData(img) {
  var data = null;
  return new Promise(function (reslove, reject) {
    if (img.src) {
      // eslint-disable-next-line
      if (/^data\:/i.test(img.src)) {
        // Data URI
        data = base64ToArrayBuffer(img.src);
        reslove(data);
      } else {
        var http = new XMLHttpRequest();

        http.onload = function () {
          if (this.status == 200 || this.status === 0) {
            data = http.response;
            reslove(data);
          } else {
            throw "Could not load image";
          }

          http = null;
        };

        http.open("GET", img.src, true);
        http.responseType = "arraybuffer";
        http.send(null);
      }
    } else {
      reject('img error');
    }
  });
}
/*eslint no-useless-escape: "error"*/


function base64ToArrayBuffer(base64) {
  // eslint-disable-next-line
  base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
  var binary = atob(base64);
  var len = binary.length;
  var buffer = new ArrayBuffer(len);
  var view = new Uint8Array(buffer);

  for (var i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }

  return buffer;
} // 步骤二，Unicode码转字符串
// ArrayBuffer对象 Unicode码转字符串


function getStringFromCharCode(dataView, start, length) {
  var str = '';
  var i;

  for (i = start, length += start; i < length; i++) {
    str += String.fromCharCode(dataView.getUint8(i));
  }

  return str;
} // 步骤三，获取jpg图片的exif的角度（在ios体现最明显）


function getOrientation(arrayBuffer) {
  var dataView = new DataView(arrayBuffer);
  var length = dataView.byteLength;
  var orientation;
  var exifIDCode;
  var tiffOffset;
  var firstIFDOffset;
  var littleEndian;
  var endianness;
  var app1Start;
  var ifdStart;
  var offset;
  var i; // Only handle JPEG image (start by 0xFFD8)

  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
    offset = 2;

    while (offset < length) {
      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
        app1Start = offset;
        break;
      }

      offset++;
    }
  }

  if (app1Start) {
    exifIDCode = app1Start + 4;
    tiffOffset = app1Start + 10;

    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
      endianness = dataView.getUint16(tiffOffset);
      littleEndian = endianness === 0x4949;

      if (littleEndian || endianness === 0x4D4D
      /* bigEndian */
      ) {
          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
            firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

            if (firstIFDOffset >= 0x00000008) {
              ifdStart = tiffOffset + firstIFDOffset;
            }
          }
        }
    }
  }

  if (ifdStart) {
    length = dataView.getUint16(ifdStart, littleEndian);

    for (i = 0; i < length; i++) {
      offset = ifdStart + i * 12 + 2;

      if (dataView.getUint16(offset, littleEndian) === 0x0112
      /* Orientation */
      ) {
          // 8 is the offset of the current tag's value
          offset += 8; // Get the original orientation value

          orientation = dataView.getUint16(offset, littleEndian); // Override the orientation with its default value for Safari (#120)
          // if (IS_SAFARI_OR_UIWEBVIEW) {
          //   dataView.setUint16(offset, 1, littleEndian);
          // }

          break;
        }
    }
  }

  return orientation;
} // canvas-exif-orientation  https://github.com/koba04/canvas-exif-orientation/blob/master/index.js
//   


function correctImage(img, orientation, type, x, y, width, height) {
  if (!/^[1-8]$/.test(orientation)) throw new Error('orientation should be [1-8]');
  if (x == null) x = 0;
  if (y == null) y = 0;
  if (width == null) width = img.width;
  if (height == null) height = img.height;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.save();

  switch (+orientation) {
    // 1 = The 0th row is at the visual top of the image, and the 0th column is the visual left-hand side.
    case 1:
      break;
    // 2 = The 0th row is at the visual top of the image, and the 0th column is the visual right-hand side.

    case 2:
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      break;
    // 3 = The 0th row is at the visual bottom of the image, and the 0th column is the visual right-hand side.

    case 3:
      ctx.translate(width, height);
      ctx.rotate(180 / 180 * Math.PI);
      break;
    // 4 = The 0th row is at the visual bottom of the image, and the 0th column is the visual left-hand side.

    case 4:
      ctx.translate(0, height);
      ctx.scale(1, -1);
      break;
    // 5 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual top.

    case 5:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(90 / 180 * Math.PI);
      ctx.scale(1, -1);
      break;
    // 6 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual top.

    case 6:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(90 / 180 * Math.PI);
      ctx.translate(0, -height);
      break;
    // 7 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual bottom.

    case 7:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(270 / 180 * Math.PI);
      ctx.translate(-width, height);
      ctx.scale(1, -1);
      break;
    // 8 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual bottom.

    case 8:
      canvas.width = height;
      canvas.height = width;
      ctx.translate(0, width);
      ctx.rotate(270 / 180 * Math.PI);
      break;
  }

  ctx.drawImage(img, x, y, width, height);
  ctx.restore();
  return canvas; // return  new Promise((reslove) => {
  //     if (!type) {
  //         reslove(canvas)
  //         return
  //     }
  //     canvas.toBlob(function(blob) {
  //         const newImg = new Image()
  //         const url =  window.URL.createObjectURL(blob)
  //         newImg.src = url
  //         newImg.onload = function() {
  //         // 手机上有严重的性能问题
  //             reslove(newImg)
  //         }
  //     })
  // })
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/cropblg.vue?vue&type=script&lang=js&
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var cropblgvue_type_script_lang_js_ = ({
  name: 'crop',
  //1. props 验证   2.支持pc
  props: ['value', 'position', 'textWatermark', 'imgLoaded', 'imageWatermark', 'defaultImgUrl', 'color', 'angle', 'rotation', 'shape', 'penBtn', 'revokeBtn', 'rotateBtn'],
  data: function data() {
    return {
      // ready: false,
      noImage: true,
      ctx: null,
      options: null,
      pixelRatio: null,
      scale: 1,
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
    };
  },
  watch: {
    shape: function shape() {
      if (!this.noImage) {
        this.draw();
      }
    },
    rotation: function rotation() {
      //  内旋转 外旋转 只能有一个
      if (!this.noImage && !this.rotateBtn && !this.drawAction) {
        this.rotateAngle = this.rotation;
        this.draw();
      }
    }
  },
  methods: {
    init: function init(img) {
      this.pointList = [];
      var clientW = img.width,
          clientH = img.height,
          _this$options = this.options,
          width = _this$options.width,
          height = _this$options.height;
      var currentW = clientW,
          currentH = clientH,
          k = 1; // contain 时的缩放比
      // contain 图片

      if (clientW > width) {
        // alert('12123')
        currentW = width;
        k = currentW / clientW;
        currentH = k * clientH;
      }

      if (currentH > height) {
        currentH = height;
        k = currentH / clientH;
        currentW = k * clientW;
      } // 针对小图片


      var minNum = 120;

      if (clientW < minNum && currentH < minNum) {
        currentW = minNum;
        k = currentW / clientW;
        currentH = k * clientH;
      }

      this.scale = k; // 针对小图片

      this.image = {
        element: img,
        width: currentW,
        // 显示宽度
        height: currentH,
        // 真是 宽度
        x: (width - currentW) / 2,
        y: (height - currentH) / 2,
        clientWidth: clientW,
        clientHeight: clientH
      };
      var corePoint = this.corePoint = {
        x: width / 2,
        y: height / 2
      };
      this.maxRadius = Math.min(width, height) / 2;
      this.arc = {
        x: corePoint.x,
        y: corePoint.y,
        r: this.maxRadius / 2
      };
      this.cropper = {
        x: (width - currentW / 2) / 2,
        y: (height - currentH / 2) / 2,
        width: currentW / 2,
        height: currentH / 2
      };
      var interval = 8; // 间隔

      var number = 0; //  按钮数量
      //  三个 if  更好 内聚 --

      var rotateBtn = this.rotateBtn === undefined || this.rotateBtn;
      var penBtn = this.penBtn === undefined || this.penBtn;
      var revokeBtn = this.revokeBtn === undefined || this.revokeBtn;

      if (rotateBtn) {
        this.touchBar = {
          x: width - 30 - 7,
          y: 10,
          width: 30,
          height: 30
        };
        number++;
      } // width  画布宽度


      if (penBtn) {
        this.paintBrush = {
          x: width - 30 - 7,
          y: 10 + (30 + interval) * number,
          width: 30,
          height: 30
        };
        number++;
      }

      if (revokeBtn) {
        this.revokeBar = {
          x: width - 30 - 7,
          y: 10 + (30 + interval) * number,
          width: 30,
          height: 30
        };
        number++;
      }

      this.draw();
    },
    draw: function draw() {
      var _this$options2 = this.options,
          width = _this$options2.width,
          height = _this$options2.height,
          shape = this.shape || 'rect'; // 避免预览到背景

      this.ctx.clearRect(0, 0, width, height); // // 背景 // 考虑用css 实现

      this.fillBackground(); //  处理出片

      this.fillImage(); // console.timeEnd('fillImage')

      this.drawPointFn(this.ctx);

      if (!this.averageColor) {
        this.averageColor = this.getImageColor(this.ctx.getImageData(this.corePoint.x - 25, this.corePoint.y - 25, 50, 50).data);
      }

      if (shape === 'arc') {
        this.fillArcCropper();
      } else if (shape === 'rect') {
        this.updatePoint();
        this.fillRectCropper();
      } //  console.time('drawTouchBar')


      this.drawTouchBar(this.touchBar);
      this.drawPaintBrush(this.paintBrush);
      this.drawRevokeBar(this.revokeBar); // 写的 线
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
    drawPointFn: function drawPointFn(ctx) {
      var _this = this;

      var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var cropper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.image;
      var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.image;
      var pointList = this.pointList; // const image = this.image

      if (pointList.length > 0) {
        pointList.forEach(function (el) {
          var scale = _this.scale / el.scale;

          var lineWidth = _this.limit(el.lineWidth * scale, 1, 5);

          ctx.lineWidth = quality ? lineWidth * 2 : lineWidth;
          ctx.strokeStyle = el.color;
          ctx.lineCap = 'round';
          ctx.beginPath();
          el.pointLine.forEach(function (element, i) {
            if (i === 0) {
              // 要相对于图片的位置 才是对的  不能相对于 画布
              if (quality) {
                // console.log(element)
                ctx.moveTo((image.x + element.x * scale - cropper.x) * quality, (image.y + element.y * scale - cropper.y) * quality);
              } else {
                ctx.moveTo(image.x + element.x * scale, image.y + element.y * scale);
              }
            }

            if (quality) {
              ctx.lineTo((image.x + element.x * scale - cropper.x) * quality, (image.y + element.y * scale - cropper.y) * quality);
            } else {
              ctx.lineTo(image.x + element.x * scale, image.y + element.y * scale);
            }
          });
          ctx.stroke();
        });
      } //  ctx.lineWidth = 5

    },
    drawPaintBrush: function drawPaintBrush(touchBar) {
      if (!touchBar) return;
      var x = touchBar.x,
          y = touchBar.y;
      var ctx = this.ctx,
          // touchBar = touchBar,
      color = this.color || this.averageColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 5);
      ctx.lineTo(x + 24, y + 9);
      ctx.lineTo(x + 12, y + 21);
      ctx.lineTo(x + 7, y + 22);
      ctx.lineTo(x + 8, y + 17); // ctx.lineTo(x + 20, y + 5)

      ctx.closePath();

      if (this.drawAction) {
        ctx.fillStyle = color;
        ctx.fill();
      } // ctx.stroke()


      ctx.moveTo(x + 5, y + 26);
      ctx.lineTo(x + 25, y + 26);
      ctx.stroke();
    },
    drawRevokeBar: function drawRevokeBar(touchBar) {
      if (!touchBar) return;
      var x = touchBar.x,
          y = touchBar.y; //  const {x, y, width} = touchBar   //  用宽 算个比例

      var ctx = this.ctx,
          // touchBar = touchBar,
      color = this.color || this.averageColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x + 15, y + 12);
      ctx.lineTo(x + 15, y + 8);
      ctx.lineTo(x + 7, y + 15);
      ctx.lineTo(x + 15, y + 22);
      ctx.lineTo(x + 15, y + 18);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 15, y + 24, 12, -Math.PI / 2, -Math.PI / 180 * 18, false);
      ctx.arc(x + 15, y + 35, 17, -Math.PI / 180 * 45, -Math.PI / 2, true);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();
    },
    drawTouchBar: function drawTouchBar(touchBar) {
      if (!touchBar) return;
      var ctx = this.ctx,
          color = this.color || this.averageColor,
          x = touchBar.x + touchBar.width * 0.6,
          y = touchBar.y + touchBar.height * 0.64,
          r = touchBar.width * 0.41,
          alpha = 6,
          h1 = touchBar.width * 0.1,
          h2 = touchBar.width * 0.18;
      ctx.lineWidth = 1; // 填充颜色

      ctx.fillStyle = color; // strokeRect  fillRect

      ctx.fillRect(x - touchBar.width / 6, y - touchBar.height / 6, touchBar.width * 0.43, touchBar.height * 0.43);
      ctx.beginPath();
      ctx.arc(x, y, r, Math.PI / 180 * 180, -Math.PI / 2 + alpha, false);
      ctx.stroke();

      if (alpha < 2 * Math.PI) {
        var x1 = x + (r - h1) * Math.sin(alpha),
            y1 = y - (r - h1) * Math.cos(alpha),
            x2 = x + (r + h1) * Math.sin(alpha),
            y2 = y - (r + h1) * Math.cos(alpha),
            x0 = (x1 + x2) / 2 + h2 * Math.sin(alpha + Math.PI / 2),
            y0 = (y1 + y2) / 2 - h2 * Math.cos(alpha + Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.fill();
      }
    },
    fillImage: function fillImage() {
      var image = this.image;
      var ctx = this.ctx;
      var rotateAngle = this.rotateAngle;
      this.canvasRotate('img', ctx, image.element, rotateAngle, image.x, image.y, image.width, image.height); // ctx.drawImage(image.element, image.x, image.y, image.width, image.height)
    },
    updatePoint: function updatePoint() {
      // 点中点和线 不用 执行 
      var c = this.cropper,
          nookSide = this.nookSide,
          cWidth = c.x + c.width,
          cHeight = c.y + c.height,
          forecastX = cWidth - nookSide,
          forecastY = cHeight - nookSide;
      this.points = [{
        x: c.x,
        y: c.y,
        width: nookSide,
        height: nookSide,
        diffX: 0,
        diffY: 0
      }, {
        x: forecastX,
        y: c.y,
        width: nookSide,
        height: nookSide,
        diffX: nookSide,
        diffY: 0
      }, {
        x: forecastX,
        y: forecastY,
        width: nookSide,
        height: nookSide,
        diffX: nookSide,
        diffY: nookSide
      }, {
        x: c.x,
        y: forecastY,
        width: nookSide,
        height: nookSide,
        diffX: 0,
        diffY: nookSide
      }]; // 寻找四根线

      var lineHeight = nookSide / .7,
          halfLineHeight = lineHeight / 2;
      this.lines = [{
        x: c.x,
        y: c.y - halfLineHeight,
        width: c.width,
        height: lineHeight
      }, {
        x: cWidth - halfLineHeight,
        y: c.y,
        width: lineHeight,
        height: c.height
      }, {
        x: c.x,
        y: cHeight - halfLineHeight,
        width: c.width,
        height: lineHeight
      }, {
        x: c.x - halfLineHeight,
        y: c.y,
        width: lineHeight,
        height: c.height
      }];
    },
    fillRectCropper: function fillRectCropper() {
      var ctx = this.ctx,
          cropper = this.cropper,
          points = this.points,
          color = this.color || this.averageColor;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(cropper.x, cropper.y, cropper.width, cropper.height);
      ctx.fillStyle = color;
      var nookSide = this.nookSide / 8;
      points.forEach(function (element, index) {
        ctx.save();
        ctx.translate(element.x + element.diffX, element.y + element.diffY);
        ctx.rotate(index * 90 * (Math.PI / 180));
        ctx.fillRect(-nookSide, -nookSide, element.height, nookSide * 2);
        ctx.fillRect(-nookSide, -nookSide, nookSide * 2, element.width); // if(index % 2 === 0){
        //     ctx.fillRect(-nookSide, cropper.height / 2 - element.nookSide , element.nookSide / 4, element.nookSide * 2)
        // } else {
        //     ctx.fillRect(-nookSide, cropper.width / 2 - element.nookSide, element.nookSide / 4, element.nookSide * 2)
        // }

        ctx.restore();
      }); // console.log(this.arc.r)
      // 圆
    },
    fillArcCropper: function fillArcCropper() {
      var ctx = this.ctx;
      ctx.beginPath();
      ctx.strokeStyle = this.color || this.averageColor;
      ctx.lineWidth = 2; // this.nookSide / 0.7

      ctx.arc(this.arc.x, this.arc.y, this.arc.r, 0, Math.PI * 2);
      ctx.stroke();
    },
    handleArcMove: function handleArcMove(_ref) {
      var x = _ref.x,
          y = _ref.y;
      this.arc.r = this.limit(this.getDistance({
        pageX: x,
        pageY: y
      }, {
        pageX: this.arc.x,
        pageY: this.arc.y
      }), this.nookSide * 2, this.maxRadius);
      this.draw();
    },
    // 填充背景
    fillBackground: function fillBackground() {
      // 多个变量可以用逗号 一次赋值
      var _this$options3 = this.options,
          width = _this$options3.width,
          height = _this$options3.height,
          ctx = this.ctx;
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.fillStyle = "rgba(0, 0, 0, ".concat(this.bgOpacity, ")");
      ctx.fillRect(0, 0, width, height); //蒙层 

      ctx.restore();
    },
    getNewCropper: function getNewCropper(touchX, touchY, cropper) {
      return {
        cropperWidth: cropper.x + cropper.width - touchX,
        cropperHeight: cropper.y + cropper.height - touchY,
        cropperX: touchX - cropper.x,
        cropperY: touchY - cropper.y
      };
    },
    handlePointMove: function handlePointMove(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;

      var cropper = this.cropper,
          newCropper = {},
          _this$getNewCropper = this.getNewCropper(x, y, cropper),
          cropperWidth = _this$getNewCropper.cropperWidth,
          cropperHeight = _this$getNewCropper.cropperHeight,
          cropperX = _this$getNewCropper.cropperX,
          cropperY = _this$getNewCropper.cropperY;

      switch (this.index) {
        case 0:
          newCropper.width = cropperWidth;
          newCropper.height = cropperHeight;
          newCropper.x = x;
          newCropper.y = y;
          break;

        case 1:
          // x  不会动
          newCropper.width = cropperX;
          newCropper.height = cropperHeight;
          newCropper.y = y;
          break;

        case 3:
          // y 不会动
          newCropper.width = cropperWidth;
          newCropper.height = cropperY;
          newCropper.x = x;
          break;

        case 2:
          newCropper.width = cropperX;
          newCropper.height = cropperY;
          break;

        default:
          break;
      }

      this.renderCropper(newCropper);
    },
    handleLineMove: function handleLineMove(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;

      var cropper = this.cropper,
          newCropper = {},
          _this$getNewCropper2 = this.getNewCropper(x, y, cropper),
          cropperWidth = _this$getNewCropper2.cropperWidth,
          cropperHeight = _this$getNewCropper2.cropperHeight,
          cropperX = _this$getNewCropper2.cropperX,
          cropperY = _this$getNewCropper2.cropperY;

      switch (this.index) {
        case 3:
          newCropper.width = cropperWidth;
          newCropper.x = x; // 限制

          break;

        case 0:
          newCropper.height = cropperHeight;
          newCropper.y = y; // 限制

          break;

        case 1:
          newCropper.width = cropperX;
          break;

        case 2:
          // y 不会动
          newCropper.height = cropperY;
          break;

        default:
          break;
      }

      this.renderCropper(newCropper);
    },
    renderCropper: function renderCropper(newCropper) {
      if (newCropper.width <= this.nookSide * 4 || newCropper.height <= this.nookSide * 4) {
        return;
      }

      this.cropper = _objectSpread({}, this.cropper, newCropper);
      this.draw();
    },
    handleImageMove: function handleImageMove(_ref4) {
      var x = _ref4.x,
          y = _ref4.y;
      var s = this.startPoint;
      this.image.x = x - s.offsetX;
      this.image.y = y - s.offsetY; // 限制图片移动的范围
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

      this.draw();
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
    getCoordinateByEvent: function getCoordinateByEvent(e) {
      var rect = e.target.getBoundingClientRect(),
          touch = e.touches[0],
          _this$options4 = this.options,
          width = _this$options4.width,
          height = _this$options4.height,
          coordinate = {
        x: this.limit(touch.clientX - rect.left, 2, width - 2),
        y: this.limit(touch.clientY - rect.top, 2, height - 2) // move 到边

      };
      return coordinate;
    },
    // https://blog.csdn.net/qq_42014697/article/details/80728463  两指缩放
    handleEnd: function handleEnd() {
      if (this.changeDrawAction) {
        if (this.drawAction) {
          this.drawAction = false;
          this.bgOpacity = 0;
          this.draw();
        } else {
          this.drawAction = true;
          this.bgOpacity = .4;
          this.draw();
        }

        this.changeDrawAction = false;
        return;
      }

      if (this.drawAction && this.pointLine.length > 0) {
        this.drawPoint.x = this.drawPoint.x - this.image.x;
        this.drawPoint.y = this.drawPoint.y - this.image.y;
        this.pointLine.push(this.drawPoint); // 点的 宽度

        var pointObj = {
          pointLine: this.pointLine,
          scale: this.scale,
          lineWidth: 3,
          color: this.color || this.averageColor,
          rotateAngle: this.rotateAngle
        };
        this.pointList.push(pointObj);
        this.pointLine = [];
      }
    },
    handleStart: function handleStart(e) {
      // alert(1)
      e.preventDefault(); // 双指

      if (e.touches.length > 1) {
        this.startTouches = e.touches;
        this.startPoint.type = null;
        return;
      } // 单指  起点


      this.drawPoint = this.getCoordinateByEvent(e);
      this.startPoint = this.getPointByCoordinate(this.drawPoint); // --  画画

      if (this.drawAction) {
        this.pointLine = [];
        this.ctx.beginPath();
        this.ctx.moveTo(this.drawPoint.x, this.drawPoint.y);
      }
    },
    handleMove: function handleMove(e) {
      e.preventDefault();
      var touches = e.touches;
      var image = this.image;

      if (touches.length > 1 && !this.drawAction) {
        var startTouches = this.startTouches;
        var k; // 最终的缩放系数

        var scale = this.scale; // const offset = e.deltaY / 800;

        k = this.getDistance(touches[0], touches[1]) / this.getDistance(startTouches[0], startTouches[1]); // k = k < 1 ? k / 10 : k * 10

        k = k < 1 ? 1 / (1 + k / 80) : 1 + Math.abs(k) / 160;
        k = k * scale;
        this.scale = this.limit(k, 0.02, 1.07);
        var width = image.clientWidth * this.scale,
            height = image.clientHeight * this.scale;
        this.image.x += (image.width - width) / 2;
        this.image.y += (image.height - height) / 2;
        this.image.width = width;
        this.image.height = height;
        this.draw();
        return;
      }

      if (this.drawAction) {
        // 划线
        // 先实现划线
        //  画 相对于 画布  // 存 相对于 画布
        // 屡一下   -- 这个东西  想对于画布  在图片在哪里 ===== 根据图片的位置还原 画布位置
        var drawPoint = this.drawPoint;
        var current = this.getCoordinateByEvent(e);
        var ctx = this.ctx;
        var color = this.color || this.averageColor;
        ctx.lineTo(current.x, current.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.stroke();
        drawPoint.x = drawPoint.x - image.x;
        drawPoint.y = drawPoint.y - image.y;
        this.pointLine.push(drawPoint);
        this.drawPoint = current;
        return;
      } // 这是干啥的--画=>图片和 线


      var type = this.startPoint ? this.startPoint.type : null;

      if (type && this.getCoordinateByEvent(e)) {
        this[type](this.getCoordinateByEvent(e));
      }
    },
    checkRegion: function checkRegion(x, y, target) {
      return x > target.x && x < target.x + target.width && y > target.y && y < target.y + target.height;
    },
    checkArc: function checkArc(x, y) {
      var ctx = this.ctx;
      ctx.beginPath(); // ctx.strokeStyle = 'red'//'transparent'

      ctx.lineWidth = this.nookSide / 0.7;
      ctx.arc(this.arc.x, this.arc.y, this.arc.r + ctx.lineWidth, 0, Math.PI * 2); // ctx.stroke() 

      return ctx.isPointInPath(x * this.pixelRatio, y * this.pixelRatio) && this.getDistance({
        pageX: x,
        pageY: y
      }, {
        pageX: this.arc.x,
        pageY: this.arc.y
      }) > this.arc.r - ctx.lineWidth / 2;
    },
    getPointByCoordinate: function getPointByCoordinate(_ref5) {
      var _this2 = this;

      var x = _ref5.x,
          y = _ref5.y;
      var image = this.image,
          shape = this.shape || 'rect';
      var t = {};
      var index = 0; //  旋转

      if (this.paintBrush && this.checkRegion(x, y, this.paintBrush)) {
        this.changeDrawAction = true;
        return;
      } else if (this.revokeBar && this.checkRegion(x, y, this.revokeBar)) {
        // t.type = 'draw'
        // 接下来 是draw 动作
        //  再次进来  保存 起始点 坐标
        this.pointList.pop();
        this.draw();
        return;
      } else if (this.touchBar && this.checkRegion(x, y, this.touchBar)) {
        // 旋转后的角度 每次
        this.rotateAngle = (this.rotateAngle + this.angle) % 360;
        this.draw();
        return;
      } else if (this.drawAction) {
        return;
      } else if (shape === 'arc' && this.checkArc(x, y)) {
        t.type = 'handleArcMove';
      } // 四个角移动         
      else if (shape !== 'arc' && this.points.some(function (point, i) {
          index = i;
          return _this2.checkRegion(x, y, point);
        })) {
          t.type = 'handlePointMove';
          this.index = index;
        } // 四根线移动
        else if (shape === 'rect' && this.lines.some(function (line, i) {
            index = i;
            return _this2.checkRegion(x, y, line);
          })) {
            t.type = 'handleLineMove';
            this.index = index;
          } // else if (
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
          else if (this.checkRegion(x, y, image)) {
              t.offsetX = x - image.x;
              t.offsetY = y - image.y;
              t.type = 'handleImageMove';
            }

      return t;
    },
    // 求两点之间的 距离
    getDistance: function getDistance(p1, p2) {
      var x = p2.pageX - p1.pageX,
          y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    },
    limit: function limit(value, min, max) {
      if (value < min) {
        return min;
      }

      if (value > max) {
        return max;
      }

      return value;
    },
    getImage: function getImage() {
      var _this3 = this;

      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Base64';
      var mimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/jpeg';
      var quality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      if (this.noImage) return;
      var shape = this.shape || 'rect';
      var cropper = this.cropper;

      if (shape == 'imgage') {
        cropper = this.image;
      } else if (shape === 'arc') {
        // 圆形必须 2倍才好
        cropper = {
          x: this.arc.x - this.arc.r,
          y: this.arc.y - this.arc.r,
          width: this.arc.r * 2,
          height: this.arc.r * 2
        };
      }

      var image = this.image,
          pixelRatio = this.pixelRatio,
          types = {
        Base64: function Base64(canvas, mimeType, resolve) {
          resolve(canvas.toDataURL(mimeType));
        },
        Blob: function Blob(canvas, mimeType, resolve) {
          canvas.toBlob(function (blob) {
            resolve(blob);
          }, mimeType);
        }
      },
          w = cropper.width * quality,
          h = cropper.height * quality,
          // 变量申请
      canvasDom = document.createElement('canvas'),
          cCtx = canvasDom.getContext('2d'); // if (!this.canvas) {
      //     this.canvas = document.createElement('canvas')
      //     this.cCtx = this.canvas.getContext('2d')
      // const { mountNode } = this.$refs
      // mountNode.appendChild(this.canvas)
      // }
      // const cCtx = this.cCtx

      canvasDom.width = w * pixelRatio;
      canvasDom.height = h * pixelRatio;
      cCtx.scale(pixelRatio, pixelRatio);
      cCtx.clearRect(0, 0, w, h);
      var rotateAngle = this.rotateAngle;

      if (shape === 'arc') {
        var radius = w / 2;
        cCtx.beginPath(); // 圆心是当前正方形的(画布) 中间

        cCtx.arc(radius, radius, radius, 0, Math.PI * 2, false);
        cCtx.clip();
      } //  圆形 只有 2 倍 缩放 数据是正确的
      // 旋转图片  这个是  主图旋转  /也是canvas 上 img


      this.canvasRotate('img', cCtx, image.element, rotateAngle, (image.x - cropper.x) * quality, (image.y - cropper.y) * quality, image.width * quality, image.height * quality); // 在整个图片上 写写画画  再要框了--- 就是说框是---img

      this.drawPointFn(cCtx, quality, cropper);
      return new Promise(function (resolve, reject) {
        if (!types[type]) {
          reject('type = Blob || Base64');
          return;
        }

        var _this3$position = _slicedToArray(_this3.position, 4),
            _this3$position$ = _this3$position[0],
            left = _this3$position$ === void 0 ? '50%' : _this3$position$,
            _this3$position$2 = _this3$position[1],
            top = _this3$position$2 === void 0 ? '50%' : _this3$position$2,
            _this3$position$3 = _this3$position[2],
            size = _this3$position$3 === void 0 ? 1 : _this3$position$3,
            _this3$position$4 = _this3$position[3],
            angle = _this3$position$4 === void 0 ? 0 : _this3$position$4;

        if (_this3.imageWatermark) {
          var watermarkImg = new Image();
          watermarkImg.src = _this3.getFileSrc(_this3.imageWatermark);
          watermarkImg.crossOrigin = 'anonymous';

          watermarkImg.onload = function () {
            // 等到图片加载进来之后
            var width = watermarkImg.width * size * quality / 100,
                height = watermarkImg.height * size * quality / 100,
                imgX = (w - width) * parseInt(left) / 100,
                imgY = (h - height) * parseInt(top) / 100;

            _this3.canvasRotate('img', cCtx, watermarkImg, angle, imgX, imgY, width, height);

            types[type](canvasDom, mimeType, resolve);
          };

          return;
        }

        if (_this3.textWatermark) {
          var height = _this3.limit(size, 12, 100);

          cCtx.font = height + 'px Georgia';
          var text = _this3.textWatermark,
              width = cCtx.measureText(text).width,
              textX = (w - width * 1.031) * parseInt(left) / 100,
              textY = (h + height * 0.72) * parseInt(top) / 100; // 变量申请

          cCtx.fillStyle = _this3.color || _this3.averageColor; // console.log(this.cCtx.fillStyle)

          if (cCtx.fillStyle === '#ffffff') {
            cCtx.fillStyle = '#000';
          }

          _this3.canvasRotate('text', cCtx, text, angle, textX, textY, width, height);

          types[type](canvasDom, mimeType, resolve);
          return;
        }

        types[type](canvasDom, mimeType, resolve);
      });
    },
    canvasRotate: function canvasRotate(type, ctx, target, angle, x, y, width, height) {
      ctx.save();
      var halfHeight = height / 2,
          halfWidth = width / 2;
      ctx.translate(x + halfWidth, y + halfHeight);
      ctx.rotate(Math.PI / 180 * angle);

      if (type === 'img') {
        ctx.drawImage(target, -halfWidth, -halfHeight, width, height);
      } else if (type === 'text') {
        ctx.fillText(target, -halfWidth, -halfHeight);
      }

      ctx.restore();
    },
    changeImage: function changeImage(imgAddress) {
      if (this.noImage) return;
      this.averageColor = null;

      if (imgAddress) {
        this.createImage(imgAddress);
        return;
      }

      this.inputHandle();
    },
    // 工具
    getPixelRatio: function getPixelRatio(context) {
      var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    //    isWeiXin() {
    //         const ua = window.navigator.userAgent.toLowerCase();
    //         if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //             return true
    //         } else {
    //             return false
    //         }
    //     },
    uploadImg: function uploadImg(e) {
      this.createImage(e.target.files[0]);
      this.noImage = false;
    },
    getFileSrc: function getFileSrc(src) {
      if (Object.prototype.toString.call(src) === '[object File]') {
        src = window.URL.createObjectURL(src);
      }

      return src;
    },
    createImage: function createImage(imgfile) {
      var _this4 = this;

      var img = new Image(); //  url , imgsrc, 文件  三种情况

      img.crossOrigin = 'anonymous';
      img.src = this.getFileSrc(imgfile);

      img.onload = function () {
        // 等到图片加载进来之后
        getImageDirection(img).then(function (res) {
          if (res === 1) {
            _this4.init(img);

            _this4.$emit('imgLoaded');

            return;
          } //  只有钉钉  会莫名其妙 卡顿- =>   把图片 画在canvas 背景上了


          _this4.init(img);

          _this4.init(correctImage(img, res));

          _this4.$emit('imgLoaded');
        }).catch(function (err) {
          // eslint-disable-next-line
          console.error(err);
        });
      };
    },
    inputHandle: function inputHandle() {
      document.getElementById('file-input').click();
    },
    getImageColor: function getImageColor(data) {
      var r = 0,
          g = 0,
          b = 0; // 取所有像素的平均值

      var num = this.limit(data.length, 1, 20);

      for (var row = 0; row < num; row++) {
        for (var col = 0; col < num; col++) {
          r += data[(num * row + col) * 4];
          g += data[(num * row + col) * 4 + 1];
          b += data[(num * row + col) * 4 + 2];
        }
      } // 求取平均值


      r /= num * num;
      g /= num * num;
      b /= num * num; // 将最终的值取整

      r = Math.round(r);
      g = Math.round(g);
      b = Math.round(b);
      return "rgba(".concat(255 - r, ", ").concat(255 - g, ", ").concat(255 - b, ", 1)");
    }
  },
  mounted: function mounted() {
    // 解决 字体模糊
    var mountNode = this.$refs.mountNode;
    var clientWidth = mountNode.clientWidth,
        clientHeight = mountNode.clientHeight; // p可以优化

    this.options = {
      width: clientWidth,
      height: clientHeight // canvas dom

    };
    var canvasDom = document.createElement('canvas');
    canvasDom.style.width = clientWidth + 'px';
    canvasDom.style.height = clientHeight + 'px'; //  小方格背景

    canvasDom.style.backgroundColor = '#fff';
    canvasDom.style.backgroundImage = 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)';
    canvasDom.style.backgroundSize = '29px 29px';
    canvasDom.style.backgroundPosition = '0 0, 15px 15px';
    mountNode.appendChild(canvasDom); // this.options = canvasDom.getBoundingClientRect()

    this.ctx = canvasDom.getContext('2d');
    var pixelRatio = this.pixelRatio = this.getPixelRatio(this.ctx);
    canvasDom.width = clientWidth * pixelRatio;
    canvasDom.height = clientHeight * pixelRatio;
    this.ctx.scale(pixelRatio, pixelRatio); // console.log(this.$slots.initial[0].data.attrs.src)

    if (this.defaultImgUrl || this.$slots.defaultImgUrl) {
      var src = this.defaultImgUrl ? this.defaultImgUrl : this.$slots.defaultImgUrl[0].data.attrs.src;
      this.createImage(src);
      this.noImage = false;
    }

    this.$emit('input', {
      getImage: this.getImage,
      changeImage: this.changeImage
    });
  }
});
// CONCATENATED MODULE: ./packages/cropblg.vue?vue&type=script&lang=js&
 /* harmony default export */ var packages_cropblgvue_type_script_lang_js_ = (cropblgvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/cropblg.vue





/* normalize component */

var component = normalizeComponent(
  packages_cropblgvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var cropblg = (component.exports);
// CONCATENATED MODULE: ./packages/index.js
 // const components = [progresschart];
// 定义 install 方法

var packages_install = function install(Vue) {
  if (install.installed) return;
  install.installed = true; // 遍历并注册全局组件
  // components.map(component => {

  Vue.component(cropblg.name, cropblg); // })
}; //  全局引用可自动安装


if (typeof window !== 'undefined' && window.Vue) {
  packages_install(window.Vue);
}

/* harmony default export */ var packages_0 = ({
  install: packages_install,
  crop: cropblg
});

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport crop */__webpack_require__.d(__webpack_exports__, "crop", function() { return cropblg; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ })

/******/ });
//# sourceMappingURL=vue-cropblg.common.js.map