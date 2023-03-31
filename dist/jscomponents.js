var jscomponents = (function (exports) {
    'use strict';

    var __defProp$1 = Object.defineProperty;
    var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __publicField$1 = (obj, key, value) => {
      __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    /**
     * component in charge of offers an interface like android's toast to display
     * some text on web apps
     *
     * @author Lucas Elvira Martín
     * @version 1.0
     * @license MIT
     * @updated 2022-11
     * @link https://github.com/luelvira/javascript_components
     */
    const ToastConstants = {
      BOTTOM: true,
      TOP: false,
      DEFAULT_DURATION: 2e3
    };
    function setStyle$1() {
      return `
#toast {
    background-color: ${this._bgColor};
    position: fixed;
    width: 80%;
    left: 10%;
    text-align: center;
    padding: 2% 0;
    box-sizing: border-box;
    border-radius: 25px;
    box-shadow: 0 3px 10px #0e0e0e;
    opacity: 0.95;
    z-index: 99;
    ${(() => this._position ? "bottom: 2%;" : "top: 2%;")()}
    ${(() => this._color ? `color: ${this._color};` : "")()}
}
#toast.fadein { animation: fadein 1s ease; }
#toast.fadeout { animation: fadeout 1s ease; }

@keyframes fadein {
    from { opacity: 0;}
    to {opacity: 0.95;}
}

@keyframes fadeout {
    from { opacity: 0.95;}
    to {opacity: 0;}
}
`;
    }
    function hide$1() {
      this.toastElement.classList.remove("fadein");
      this.toastElement.classList.add("fadeout");
    }
    const _Toast = class {
      constructor() {
        const container = document.createElement("div");
        const toast = document.createElement("div");
        toast.setAttribute("id", "toast");
        toast.style.display = "none";
        const shadow = container.attachShadow({ mode: "open" });
        this.style = document.createElement("style");
        this.style.textContent = "";
        shadow.append(this.style, toast);
        document.body.appendChild(container);
        this.toastElement = toast;
        const totalHidden = () => {
          if (!toast.classList.contains("fadein"))
            this.toastElement.style.display = "none";
        };
        toast.addEventListener("webkitAnimationEnd", () => totalHidden());
        toast.addEventListener("animationEnd", () => totalHidden());
        toast.addEventListener("msAnimationEnd", () => totalHidden());
        toast.addEventListener("oAnimationEnd", () => totalHidden());
      }
      static get BOTTOM() {
        return ToastConstants.BOTTOM;
      }
      static get TOP() {
        return ToastConstants.TOP;
      }
      get DEFAULT_DURATION() {
        return this.ToastConstants.DEFAULT_DURATION;
      }
      /**
       * @param {number} t duration in milliseconds
       * @throws {Error} if t is not a positive integer
       */
      set duration(t) {
        t = parseInt(t);
        if (t <= 0)
          throw Error("Error: Toast duration must be a positive integer");
        this._duration = t;
      }
      /**
       * @param {boolean} pos true for bottom, false for top
       * @throws {Error} if pos is not equal to Toast.BOTTOM or Toast.TOP
       * @see Toast.BOTTOM
       * @see Toast.TOP
       */
      set position(pos) {
        if (pos !== ToastConstants.BOTTOM && pos !== ToastConstants.TOP)
          throw new Error("Error: Toast position must be equal to Toast.BOTTOM or Toast.TOP");
        this._position = pos;
        this.style.textContent = setStyle$1.call(this);
      }
      /**
       * @param {string} text the text to be displayed
       */
      set text(text = "") {
        this.toastElement.innerText = text;
      }
      /**
       * @param {string} color the color of the text
       */
      set backgroundColor(color) {
        this._bgColor = color;
        this.style.textContent = setStyle$1.call(this);
      }
      static makeText({ duration, text, position, backgroundColor, color }) {
        _Toast.toast.duration = parseInt(duration) || _Toast.DEFAULT_DURATION;
        _Toast.toast.position = typeof position === "undefined" ? ToastConstants.BOTTOM : position;
        _Toast.toast.text = text;
        _Toast.toast.backgroundColor = backgroundColor || "#f0f0f0";
        _Toast.toast.color = color || null;
        return _Toast.toast;
      }
      show(duration) {
        if (duration)
          this.duration = duration;
        this.toastElement.removeAttribute("style");
        this.toastElement.removeAttribute("class");
        this.toastElement.classList.add("fadein");
        setTimeout(() => hide$1.call(this), this._duration + 1e3);
      }
    };
    let Toast = _Toast;
    __publicField$1(Toast, "toast");
    Toast.toast = new Toast();

    var __defProp = Object.defineProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    const ModalConstant = {
      WIDTH: "50%",
      HEIGHT: "auto",
      REQUIRE_ACTION: false,
      DEFAULT_DURATION: 2e3,
      OVERLAY: true
    };
    const setStyle = function() {
      return `
.overlay {
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 100vh;
  background-color: #00000085;
}
`;
    };
    const _Modal = class {
      constructor() {
        const container = document.createElement("div");
        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.position = "fixed";
        container.style.left = "0";
        container.style.top = "0";
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        const modal2 = document.createElement("div");
        modal2.setAttribute("id", "mnodal");
        modal2.style.display = "none";
        overlay.style.display = "none";
        const shadow = container.attachShadow({ "mode": "open" });
        this.style = document.createElement("style");
        this.style.textContent = setStyle.call(this);
        shadow.append(this.style, overlay, modal2);
        document.body.appendChild(container);
        this.modalElement = modal2;
        this.overlayElement = overlay;
        const totalHidden = () => {
          if (!modal2.classList.contains("fadein"))
            this.toastElement.style.display = "none";
        };
        modal2.addEventListener("webkitAnimationEnd", () => totalHidden());
        modal2.addEventListener("animationEnd", () => totalHidden());
        modal2.addEventListener("msAnimationEnd", () => totalHidden());
        modal2.addEventListener("oAnimationEnd", () => totalHidden());
      }
      /**
       * @param {HTMLElement} htmlElement
       */
      set content(htmlElement) {
        this.modalElement.appendChild(htmlElement);
      }
      /**
       * @param {number} t time in milliseconds
       * @throws {Error} if t is not a positive integer
       */
      set duration(t) {
        t = parseInt(t);
        if (t <= 0)
          throw "Error: Modal duration must be a positive integer";
        this._duration = t;
        this._requireInteraction = false;
      }
      /**
       * @param {boolean} bool
       */
      set requireAction(bool) {
        this._requireInteraction = bool;
      }
      /**
       * @param {string} width
       */
      set width(width) {
        this._width = width;
      }
      /**
       * @param {string} height
       */
      set height(height) {
        this._height = height;
      }
      /**
       * @param {boolean} bool
       */
      set overlay(bool) {
        this._overlay = bool;
      }
      show(duration) {
        if (duration)
          this.duration = duration;
        this.modalElement.removeAttribute("style");
        this.overlayElement.removeAttribute("style");
        this.modalElement.removeAttribute("class");
        this.modalElement.classList.add("fadein");
        setTimeout(() => hide.call(this), this._duration + 1e3);
      }
      static makeModal({ duration, width, height, require_action, overlay }) {
        modal.duration = parseInt(duration) || _Modal.DEFAULT_DURATION;
        modal.width = width || _Modal.WIDTH;
        modal.height = height || _Modal.HEIGHT;
        modal.require_action = require_action != null ? require_action : _Modal.REQUIRE_ACTION;
        modal.overlay = overlay != null ? overlay : _Modal.OVERLAY;
        return modal;
      }
    };
    let Modal = _Modal;
    __publicField(Modal, "modal", null);
    for (const constant in ModalConstant)
      Modal.__defineGetter__(constant, () => ModalConstant[constant]);
    function hide() {
      this.modalElement.classList.remove("fadein");
      this.modalElement.classList.add("fadeout");
    }
    Modal.modal = new Modal();

    const $ = function(selector) {
      let meta_sel = selector.split(" "), lastSelector = meta_sel.slice(-1)[0];
      if (lastSelector[0] === "#")
        return document.querySelector(selector);
      return document.querySelectorAll(selector);
    };
    HTMLElement.prototype.on = function(type, callback) {
      type.split(" ").forEach((eType) => this.addEventListener(eType, callback));
      return this;
    };
    HTMLElement.prototype.attr = function(name, value) {
      if (typeof value != "undefined") {
        this.setAttribute(name, value);
        return this;
      }
      return this.getAttribute(name);
    };
    HTMLElement.prototype.rattr = function(name) {
      this.removeAttribute(name);
      return this;
    };
    NodeList.prototype.on = function(type, callback) {
      for (let node of this)
        node.on(type, callback);
      return this;
    };
    NodeList.prototype.each = function(callback) {
      this.forEach(callback);
      return this;
    };
    NodeList.prototype.attr = function(name, value) {
      for (let node of this)
        node.attr(name, value);
      return this;
    };
    function preventDefault(event) {
      event.preventDefault();
      event.stopPropagation();
    }
    function cookie2object() {
      return Object.fromEntries([...document.cookie.split(";").map((c) => c.trim()).map((c) => c.split("="))]);
    }

    exports.$ = $;
    exports.Modal = Modal;
    exports.Toast = Toast;
    exports.cookie2object = cookie2object;
    exports.preventDefault = preventDefault;

    return exports;

})({});
//# sourceMappingURL=jscomponents.js.map
