// exif  https://github.com/exif-js/exif-js/blob/master/exif.js

export const getImageDirection = (img) => new Promise((reslove, reject) => {
    getImageData(img).then(data => {
        const orientation =  getOrientation(data) || 1
        reslove(orientation)
    }).
    catch(error => {
        reject(error)
    })
})

// 这里的获取exif要将图片转ArrayBuffer对象，这里假设获取了图片的baes64
// 步骤一
// base64转ArrayBuffer对象
function getImageData(img) {
    let data = null
    return new Promise((reslove, reject) => {
        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                data = base64ToArrayBuffer(img.src)
                reslove(data)
            } else {
                var http = new XMLHttpRequest()
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        data = http.response 
                        reslove(data)
                    } else {
                        throw "Could not load image"
                    }
                    http = null
                }
                http.open("GET", img.src, true)
                http.responseType = "arraybuffer"
                http.send(null)
            }
        } else {
            reject('img error')
        }
    })
}

/*eslint no-useless-escape: "error"*/
function base64ToArrayBuffer(base64) {
    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    var binary = atob(base64);
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    return buffer;
  }
  // 步骤二，Unicode码转字符串
  // ArrayBuffer对象 Unicode码转字符串
  function getStringFromCharCode(dataView, start, length) {
    var str = '';
    var i;
    for (i = start, length += start; i < length; i++) {
      str += String.fromCharCode(dataView.getUint8(i));
    }
    return str;
  }
// 步骤三，获取jpg图片的exif的角度（在ios体现最明显）
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
    var i;
    // Only handle JPEG image (start by 0xFFD8)
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
  
        if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
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
        if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
  
          // 8 is the offset of the current tag's value
          offset += 8;
  
          // Get the original orientation value
          orientation = dataView.getUint16(offset, littleEndian);
  
          // Override the orientation with its default value for Safari (#120)
          // if (IS_SAFARI_OR_UIWEBVIEW) {
          //   dataView.setUint16(offset, 1, littleEndian);
          // }
          break;
        }
      }
    }
    return orientation;
  }
  
  
// canvas-exif-orientation  https://github.com/koba04/canvas-exif-orientation/blob/master/index.js
//   
  export function correctImage(img, orientation, x, y, width, height) {
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

    ctx.drawImage(img, x, y, width, height)
    ctx.restore()

    return canvas
  }
  