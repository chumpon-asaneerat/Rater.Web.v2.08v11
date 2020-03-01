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

// - add route to get assets (url/type).
// - add route to load each asset.
// - add asset manager class to cache url and data with supports progress bar.
// - check device routes
//   - main menu
//   - device register
//   - device org setup
//   - user login
//   - question main screen

//#region fabric.js object subclasses.

// Button

// MultilanguageText

//#endregion

//#region fabric.js canvas management class.

const shapeConstructors = [
    { 
        type: 'circle', 
        create: (options) => { return new fabric.Circle(options) }
    },
    { 
        type: 'ellipse', 
        create: (options) => { return new fabric.Ellipse(options) }
    },
    { 
        type: 'line', 
        create: (options) => { return new fabric.Line(options) }
    },
    { 
        type: 'polygon', 
        create: (options) => { return new fabric.Polygon(options) }
    },
    { 
        type: 'polyline', 
        create: (options) => { return new fabric.Polyline(options) }
    },
    { 
        type: 'rect', 
        create: (options) => { return new fabric.Rect(options) }
    },
    { 
        type: 'triangle', 
        create: (options) => { return new fabric.Triangle(options) }
    },
    { 
        type: 'group', 
        create: (options) => { return new fabric.Group(options) }
    }
]

const shapeTypes = shapeConstructors.map((ctor) => ctor.type )

class NCanvas {
    constructor(id_selector) {
        let el = document.getElementById(id_selector)
        this.parentElement = (el) ? el.parentElement : null
        this.canvas = new fabric.Canvas(el);
        this.options = new NCanvas.options(this);
        this.selection = new NCanvas.designer(this)
    }
    create(type, options) {
        let idx = shapeTypes.indexOf(type.toLowerCase())
        let ctor = (idx !== -1) ? shapeConstructors[idx].create : null
        return (ctor) ? ctor(options) : null;
    }
    add(obj) {
        if (this.canvas) {
            this.canvas.add(obj)
        }
    }
}
NCanvas.options = class {
    constructor(canvas) {
        this.canvas = canvas;
        // shortcut to fabric.Canvas
        this._canvas = (canvas) ? canvas.canvas : null
        this.width = 1280
        this.height = 720
        this.apply()
    }
    apply() {
        if (this._canvas) {
            let cv = this._canvas
            cv.setWidth(this.width)
            cv.setHeight(this.height)
            cv.setDimensions({ width: '100%', height: '100%' }, { cssOnly: true })
            //cv.setDimensions({ width: this.width + 'px', height: this.height + 'px' }, { cssOnly: true })
        }
    }
    get mode() {
        let ret = 'unknown'
        if (this._canvas) {
            let cv = this._canvas
            ret = (cv.selection) ? 'design' : 'runtime'
        }
        return ret
    }
    set mode(mode) {
        if (this._canvas) {
            let cv = this._canvas
            if (mode.toLowerCase() === 'design') {
                cv.selection = true
                cv.hoverCursor = 'move';
            }
            else {
                cv.selection = false
                cv.hoverCursor = 'pointer';
            }
            let objs = cv.getObjects()
            objs.forEach((o) => {
                // apply to all objects
                o.selectable = cv.selection
            })
            // deselection.
            //cv.discardActiveGroup()
            cv.discardActiveObject()
            cv.renderAll()
        }
    }
}
NCanvas.designer = class {
    constructor(canvas) {
        this.canvas = canvas;
        // shortcut to fabric.Canvas
        this._canvas = (canvas) ? canvas.canvas : null
        // create toolbox
        this.toolbox = new NCanvas.designer.toolbox(this)
        // create selection manager
        this.selection = new NCanvas.designer.selection(this)
        // create util instance
        this.util = new NCanvas.designer.util(this)

        this._inputState = {
            mouse_down: { x: 0, y: 0 },
            mouse_up: { x: 0, y: 0 }
        }

        // init fabric.js canvas events
        this._initEvents()
    }
    _initEvents() {
        this._initMouseEvents()
        this._initObjectEvents()
    }
    _initMouseEvents() {
        let self = this
        if (this._canvas) {
            this._canvas.on('mouse:down:before', (e) => { self.__onMouseDown(e) })
            this._canvas.on('mouse:down', (e) => { self.__onMouseDown(e) })
            this._canvas.on('mouse:move', (e) => { self.__onMouseMove(e) })
            this._canvas.on('mouse:up:before', (e) => { self.__onMouseUp(e) })
            this._canvas.on('mouse:up', (e) => { self.__onMouseUp(e) })
        }
    }
    _initObjectEvents() {
        let self = this
        if (this._canvas) {
            this._canvas.on('object:moved', (e) => { self.__onObjMoved(e) })
            this._canvas.on('object:scaling', (e) => { self.__onObjMoved(e) })
            this._canvas.on('object:scaled', (e) => { self.__onObjMoved(e) })
        }
    }
    __onMouseDown(e) {
        let self = this
        if (!e.target) {
            // no taget object
            this._inputState.mouse_down.x = e.pointer.x
            this._inputState.mouse_down.y = e.pointer.y            
        }
        else {
            // call once
            this.updateTools(e.target)

            e.target.on('moving', () => {                 
                self.updateTools(e.target)
            });
        }
    }
    __onMouseMove(e) { }
    __onMouseUp(e) {
        let self = this
        if (!e.target) {
            // no taget object
            this._inputState.mouse_up.x = e.pointer.x
            this._inputState.mouse_up.y = e.pointer.y
            //el.style.left = 
            //el.style.top = 
            /*
            let type = self.toolbox.activeTool;
            if (type) {
                let obj = self.canvas.create(type, {
                    left: self._inputState.mouse_down.x,
                    top: self._inputState.mouse_down.y,
                    width: self._inputState.mouse_up.x - self._inputState.mouse_down.x,
                    height: self._inputState.mouse_up.y - self._inputState.mouse_down.y,
                })
                self.canvas.add(obj)
            }
            */
        }
        else {
            e.target.off('moving');
        }
        this.updateTools(e.target)
    }
    __onObjMoved(e) {
        this.updateTools(e.target)
    }
    updateTools(obj) {
        //let obj = this.selection.getActiveObject()
        if (!obj) {
            // no taget object
            this.hideEditor()
        }
        else {            
            obj.setCoords()
            this.showEditor(obj)
        }
    }
    showEditor(object) {
        let el = document.getElementById('context1')
        let edElem = el.getBoundingClientRect()
        
        let abs = this.util.getAbsoluteCoords(object)
        //console.log(abs)
        if (!el.classList.contains('show')) {
            el.classList.add('show')
        }
        el.style.left = abs.left + 'px'
        el.style.top = (abs.top - edElem.height - 5) + 'px'
    }
    hideEditor() {
        let el = document.getElementById('context1')
        el.classList.remove('show')
    }
    /*
    __getAbsoluteCoords(object) {
        let cv = this._canvas
        let dsgn = this.canvas.parentElement
        let dsgnRect = dsgn.getBoundingClientRect()
        //console.log('design rect:', dsgnRect)
        let opts = this.canvas.options
        let scaleX = dsgnRect.width / opts.width
        let scaleY = dsgnRect.height / opts.height
        //console.log('scale:', scaleX, scaleY)
    
        let canvasZoom = cv.getZoom();
        //console.log('zoom:', canvasZoom)
        let offset = cv.calcOffset();
        let ret = { left: 0, top: 0, width: 0, height: 0 }
        if (object) {
            // Get dimensions of object
            let rect = object.getBoundingRect();
            //console.log('aCoords:', object.aCoords.tl)
            // Do the math - offset is from $(body)
            ret.left = (offset._offset.left + rect.left) * scaleX
            ret.top = (offset._offset.top + rect.top) * scaleY
            ret.width = rect.width
            ret.height = rect.height
        }
        return ret
    }
    */
}
NCanvas.designer.toolbox = class {
    constructor(designer) {
        this.designer = designer;
        // shortcut to fabric.Canvas
        if (designer) {
            this.canvas = designer.canvas
            this._canvas = designer._canvas
        }
        else {
            this.canvas = null;
            this._canvas = null;
        }
        // init properties
        this.activeTool = 'rect'
    }
}
NCanvas.designer.selection = class {
    constructor(designer) {
        this.designer = designer;
        // shortcut to fabric.Canvas
        if (designer) {
            this.canvas = designer.canvas
            this._canvas = designer._canvas
        }
        else {
            this.canvas = null;
            this._canvas = null;
        }
    }
    getActiveObject() {
        return this._canvas.getActiveObject()
    }
}
NCanvas.designer.util = class {
    constructor(designer) {
        this.designer = designer;
        // shortcut to fabric.Canvas
        if (designer) {
            this.canvas = designer.canvas
            this._canvas = designer._canvas
        }
        else {
            this.canvas = null;
            this._canvas = null;
        }
        // init properties
        this.activeTool = 'rect'
    }
    getBoundingClientRect() {
        let pElem = (this.canvas) ? this.canvas.parentElement : null 
        let ret = (pElem) ? pElem.getBoundingClientRect() : null
        return ret
    }
    getZoom() {
        return this.designer._canvas.getZoom()
    }
    getScale() {
        let rect = this.getBoundingClientRect()
        let opts = this.canvas.options
        let ret = null
        if (rect && opts) {
            let scaleX = rect.width / opts.width
            let scaleY = rect.height / opts.height
            ret = { x: scaleX, y: scaleY }
        }
        return ret
    }
    getOffset() {
        let offset = this._canvas.calcOffset()
        return (offset) ? offset._offset : null
    }
    getAbsoluteCoords(obj) {
        let ret = { left: 0, top: 0, width: 0, height: 0 }
        //let rect = this.getBoundingClientRect()
        let offset = this.getOffset()
        let scale = this.getScale()
        if (obj) {
            let rect = obj.getBoundingRect();
            ret.left = (offset.left + rect.left) * scale.x
            ret.top = (offset.top + rect.top) * scale.y
            ret.width = rect.width
            ret.height = rect.height
        }
        return ret
    }
}

//#endregion

//#region fabric.js custom selection controls (set only once)

// setup selection control.
fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: '#ff00ff',
    cornerColor: '#ff0000',
    cornerStyle: 'circle',
    cornerSize: 8,
    borderDashArray: [3, 3]
});

//fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

/*

// create a tool-tip instance:
var t1 = new ToolTip(canvas, region, "This is a tool-tip", 150, 3000);

// The Tool-Tip instance:
function ToolTip(canvas, region, text, width, timeout) {

  var me = this,                                // self-reference for event handlers
      div = document.createElement("div"),      // the tool-tip div
      parent = canvas.parentNode,               // parent node for canvas
      visible = false;                          // current status
  
  // set some initial styles, can be replaced by class-name etc.
  div.style.cssText = "position:fixed;padding:7px;background:gold;pointer-events:none;width:" + width + "px";
  div.innerHTML = text;
  
  // show the tool-tip
  this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
      visible = true;                           // lock so it's only shown once
      setDivPos(pos);                           // set position
      parent.appendChild(div);                  // add to parent of canvas
      setTimeout(hide, timeout);                // timeout for hide
    }
  }
  
  // hide the tool-tip
  function hide() {
    visible = false;                            // hide it after timeout
    parent.removeChild(div);                    // remove from DOM
  }

  // check mouse position, add limits as wanted... just for example:
  function check(e) {
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    if (!visible &&
        pos.x >= region.x && pos.x < region.x + region.w &&
        pos.y >= region.y && pos.y < region.y + region.h) {
      me.show(posAbs);                          // show tool-tip at this pos
    }
    else setDivPos(posAbs);                     // otherwise, update position
  }
  
  // get mouse position relative to canvas
  function getPos(e) {
    var r = canvas.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
  }
  
  // update and adjust div position if needed (anchor to a different corner etc.)
  function setDivPos(pos) {
    if (visible){
      if (pos.x < 0) pos.x = 0;
      if (pos.y < 0) pos.y = 0;
      // other bound checks here
      div.style.left = pos.x + "px";
      div.style.top = pos.y + "px";
    }
  }
  
  // we need to use shared event handlers:
  canvas.addEventListener("mousemove", check);
  canvas.addEventListener("click", check);

*/

//#endregion

;(() => {
    console.log('nlib-fabric.js loaded.');
})();