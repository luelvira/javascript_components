/*
MIT License
Copyright (c) 2021 Lucas Elvira Martin
	https://github.com/luck5941/javascript_components
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function() {
  'use strict';
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
  }

  const Modal = function() {
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

  for (const constant in ModalConstant)
    Modal.__defineGetter__(constant, () => ModalConstant[constant])

  Modal.prototype.__defineSetter__("content", function(htmlElement) {
    this.modalElement.appendChild(htmlElement);
  });

  Modal.prototype.__defineSetter__("duration", function (t) {
    if (t <= 0) throw "Error: Modal duration must be a positive integer";
    this._duration = parseInt(t);
    this._requireInteraction = false;
  });

  Modal.prototype.__defineSetter__("requireAction", function(bool) {
    this._requireInteraction = bool;
  });

  Modal.prototype.__defineSetter__("width", function(width) {
    this._width = width;
  });

  Modal.prototype.__defineSetter__("height", function(height) {
    this._height = height;
  });

  Modal.prototype.__defineSetter__("overalay", function(bool) {
    this._overlay = bool;
  });

  Modal.makeModal = function({duration:duration, width: width, height: height, require_action:require_action, overlay:overlay}) {
    modal.duration = parseInt(duration) || Modal.DEFAULT_DURATION;
    modal.width = width || Modal.WIDTH;
    modal.height = height || Modal.HEIGHT;
    modal.require_action = require_action  ?? Modal.REQUIRE_ACTION;
    modal.overlay = overlay ?? Modal.OVERLAY;
    return modal;
  };

  Modal.prototype.show = function(duration) {
		if (duration) this.duration = duration;
		this.modalElement.removeAttribute("style");
		this.overlayElement.removeAttribute("style");
		this.modalElement.removeAttribute("class");
		this.modalElement.classList.add("fadein");
		setTimeout(() => hide.call(this), this._duration+1000);
	}

	const hide = function() {
		this.modalElement.classList.remove("fadein");
		this.modalElement.classList.add("fadeout");
	}
	const modal = new Modal();
	window.Modal = Modal;
})();
