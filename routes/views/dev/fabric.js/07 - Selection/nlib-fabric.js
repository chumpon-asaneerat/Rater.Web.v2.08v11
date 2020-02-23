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

;(() => {
    console.log('nlib-fabric.js loaded.');
})();