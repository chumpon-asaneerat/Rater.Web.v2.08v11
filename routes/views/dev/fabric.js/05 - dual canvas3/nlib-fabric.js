// Helper classes.
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

/* Subclasses */
// LabeledRect
fabric.LabeledRect = fabric.util.createClass(fabric.Rect, {
    type: 'LabeledRect',
    initialize: function(options) {
        options || (options = { });
        this.callSuper('initialize', options);
        this.set('label', options.label || '');
    },
    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },
    _render: function(ctx) {
        this.callSuper('_render', ctx);
        ctx.font = '20px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
    }
});
fabric.LabeledRect.fromObject = function (object, callback, forceAsync) {
    //console.log('create label rect:', object)
    return fabric.Object._fromObject('LabeledRect', object, callback, forceAsync)
}
// GIF
fabric.GIF = fabric.util.createClass(fabric.Image, {
    type: 'GIF',
    originX: 'center',
    originY: 'center',
    initialize: function(src, options) {
        options || (options = {});
        this.callSuper('initialize', options);
        this.set('left', options.left || 10);
        this.set('top', options.top || 10);
        this.set('width', options.width || 75);
        this.set('height', options.height || 75);
        this.set('scaleX', options.scaleX || 1);
        this.set('scaleY', options.scaleY || 1);
        this.setCoords();
        this.setSrc(src)
    },
    toObject: function() {
        let ret = fabric.util.object.extend(this.callSuper('toObject'),
        {
            src: this.get('src'),
            left: this.get('left'),
            top: this.get('top'),
            width: this.get('width'),
            height: this.get('height'),
            scaleX: this.get('scaleX'),
            scaleX: this.get('scaleY')
        });
        return ret;
    },
    toSVG: function() {
        let imgs = this._gif.imgs;
        var img = new fabric.Image(imgs[0]);
        img.left = this.left;
        img.top = this.top;
        img.scaleToWidth(this.getScaledWidth())
        img.scaleToHeight(this.getScaledHeight())
        img.setCoords();
        //return this.callSuper('toSVG') + img.toSVG();
        return img.toSVG();
    },
    _render: function(ctx) {
        if (this.loaded) {
            //this.callSuper('_render', ctx);
            let imgs = this._gif.imgs;
            let frame = (imgs && imgs.length > this.framesIndex) ? imgs[this.framesIndex] : null;
            if (frame) {
                ctx.drawImage(frame, -this.width / 2, -this.height / 2, this.width, this.height);
            }
        }
    },
    play: function() {
        //console.log('global delay:', this._gif.delay)
        if (typeof(animInterval) === 'undefined') {
            this.animInterval = setInterval(() => {
                if (this._gif.imgs) {
                    this.framesIndex++;
                    if (this.framesIndex === this._gif.imgs.length) {
                        this.framesIndex = 0;
                    }
                }
            }, this._gif.delay);
        }
    },
    stop: function() {
        clearInterval(this.animInterval);
        this.animInterval = undefined;
    },
    setSrc: function(src) {
        this.stop();
        // update src vlaue.
        this.set('src', src || '');
        this._gif = new GIFFrame(src, () => {
            this.framesIndex = 0;
            this.animInterval;
            this.dirty = true;
            this.loaded = true;
            this.play(); // auto play
        })
    }
});
fabric.GIF.fromObject = function (object, callback, forceAsync) {
    //console.log('fromObject:', object)
    let obj = new fabric.GIF(object.src, object);
    obj.setCoords();
    //obj.on('image:loaded', canvas.renderAll.bind(canvas))
    callback(obj)
    //return obj;
    //return fabric.Object._fromObject('GIF', object, callback, forceAsync)
}

// setup selection control.
fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: '#ff00ff',
    cornerColor: '#ff0000',
    cornerStyle: 'circle'
});

;(() => {
    console.log('nlib-fabric.js loaded.');
})();