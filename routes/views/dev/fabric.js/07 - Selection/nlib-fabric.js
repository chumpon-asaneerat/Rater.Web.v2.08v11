//#region Helper methods

let toRGBA = (hexString) => {
    let h = hexString;
    let r = 0, g = 0, b = 0, a = 1;
    if (h.length === 5) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
      a = "0x" + h[4] + h[4];
    }
    else if (h.length === 9) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
      a = "0x" + h[7] + h[8];
    }
    a = +(a / 255).toFixed(3);
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

//#endregion

//#region Helper classes.

/**
 * GIFFrame class.
 */
class GIFFrame {
    constructor(url, callback) {
        this.tempCanvas = document.createElement('canvas');
        this.tempCtx = this.tempCanvas.getContext('2d');
        this.gifCanvas = document.createElement('canvas');
        this.gifCtx = this.gifCanvas.getContext('2d');
        this.imgs = [];
        this.disposalType;
        this.delay;
    
        let xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'arraybuffer';
        let self = this;
        xhr.onload = () => {
            let tempBitmap = {};
            tempBitmap.url = url;
            let arrayBuffer = xhr.response;
            if (arrayBuffer) {
                let gif = new GIF(arrayBuffer);
                let frames = gif.decompressFrames(true);
                self.gifCanvas.width = frames[0].dims.width;
                self.gifCanvas.height = frames[0].dims.height;
                for (let i = 0; i < frames.length; i++) {
                    self.createFrame(frames[i]);
                }
                this.delay = frames[0].delay;
                callback();
            }
        }
        xhr.send(null);
    }
    createFrame(frame) {
        if (!this.disposalType) {
            this.disposalType = frame.disposalType;
        }
        let dims = frame.dims;
        this.tempCanvas.width = dims.width;
        this.tempCanvas.height = dims.height;
        let frameImageData = this.tempCtx.createImageData(dims.width, dims.height);
        frameImageData.data.set(frame.patch);
        if (this.disposalType !== 1) {
            this.gifCtx.clearRect(0, 0, this.gifCanvas.width, this.gifCanvas.height);
        }
        this.tempCtx.putImageData(frameImageData, 0, 0);
        this.gifCtx.drawImage(this.tempCanvas, dims.left, dims.top);
        let dataURL = this.gifCanvas.toDataURL('image/png');
        let tempImg = fabric.util.createImage();
        tempImg.src = dataURL;
        this.imgs.push(tempImg);
    }
}

//#endregion

//#region fabric.js object subclasses.

// Button

// MultilanguageText

//#endregion

//#region fabric.js canvas management class.

const shapeConstructors = [
    { type: 'Circle', create: (options) => { return new fabric.Circle(options) }},
    { type: 'Ellipse', create: (options) => { return new fabric.Ellipse(options) }},
    { type: 'Line', create: (options) => { return new fabric.Line(options) }},
    { type: 'Polygon', create: (options) => { return new fabric.Polygon(options) }},
    { type: 'Polyline', create: (options) => { return new fabric.Polyline(options) }},
    { type: 'Rect', create: (options) => { return new fabric.Rect(options) }},
    { type: 'Triangle', create: (options) => { return new fabric.Triangle(options) }},
    { type: 'Group', create: (options) => { return new fabric.Group(options) }}
]

const shapeTypes = shapeConstructors.map((ctor) => ctor.type )

class NCanvas {
    constructor(el) {
        this.canvas = new fabric.Canvas(el);
        this.options = new NCanvas.options(this);
    }
    create(type, options) {
        let idx = shapeTypes.indexOf(type)
        let ctor = (idx !== -1) ? shapeConstructors[idx].create : null
        return (ctor) ? ctor(options) : null;
    }
    add() {}
}
NCanvas.options = class {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 1280
        this.height = 720
    }
    apply() {
        if (this.canvas) {
            this.canvas.setWidth(this.width)
            this.canvas.setHeight(this.height)
            this.canvas.setDimensions({ width: '100%', height: '100%' }, { cssOnly: true })
        }
    }
}

//#endregion

;(() => {
    console.log('nlib-fabric.js loaded.');
})();