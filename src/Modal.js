const ModalConstant = {
  WIDTH: "50%",
  HEIGHT: "auto",
  REQUIRE_ACTION: false,
  DEFAULT_DURATION: 2000,
  OVERLAY: true,
}

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
`
};

export default class Modal {
  static modal = null;
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
    const modal = document.createElement("div");
    modal.setAttribute("id", "mnodal");
    modal.style.display = "none";
    overlay.style.display = "none";
    const shadow = container.attachShadow({"mode": 'open'});
    this.style = document.createElement("style");
    this.style.textContent = setStyle.call(this);
    shadow.append(this.style, overlay, modal);
    document.body.appendChild(container);
    this.modalElement = modal;
    this.overlayElement = overlay;
    const totalHidden = () => {
      if (!modal.classList.contains("fadein"))
        this.toastElement.style.display = "none";
    };
    modal.addEventListener("webkitAnimationEnd", () => totalHidden());
    modal.addEventListener("animationEnd", ()=> totalHidden());
    modal.addEventListener("msAnimationEnd", ()=> totalHidden());
    modal.addEventListener("oAnimationEnd", ()=>totalHidden());
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
    if (t <= 0) throw "Error: Modal duration must be a positive integer";
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
    if (duration) this.duration = duration;
    this.modalElement.removeAttribute("style");
    this.overlayElement.removeAttribute("style");
    this.modalElement.removeAttribute("class");
    this.modalElement.classList.add("fadein");
    setTimeout(() => hide.call(this), this._duration+1000);
  }

  static makeModal({duration:duration, width: width, height: height, require_action:require_action, overlay:overlay}) {
    modal.duration = parseInt(duration) || Modal.DEFAULT_DURATION;
    modal.width = width || Modal.WIDTH;
    modal.height = height || Modal.HEIGHT;
    modal.require_action = require_action  ?? Modal.REQUIRE_ACTION;
    modal.overlay = overlay ?? Modal.OVERLAY;
    return modal;
  }
}

for (const constant in ModalConstant)
  Modal.__defineGetter__(constant, () => ModalConstant[constant])

function hide() {
  this.modalElement.classList.remove("fadein");
  this.modalElement.classList.add("fadeout");
}

//Modal.modal = new Modal();

