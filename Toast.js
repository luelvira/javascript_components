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
(function() {
	'use strict';

	const ToastConstants = {
		BOTTOM: true,
		TOP: false,
		DEFAULT_DURATION: 2000
	};

	const setStyle = function() {
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
	${(()=> this._position ? "bottom: 2%;" : "top: 2%;")()}
	${(()=> this._color ? `color: ${this._color};`: "")()}
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

	const Toast = function() {
		const container = document.createElement("div");
		const toast = document.createElement("div");
		toast.setAttribute("id", "toast");
		toast.style.display = "none";
		const shadow = container.attachShadow({mode: 'open'});
		this.style = document.createElement("style");
		this.style.textContent = "";
		shadow.append(this.style, toast);
		document.body.appendChild(container)
		this.toastElement = toast;
		const totalHidden = () => {
			if (!toast.classList.contains("fadein"))
				this.toastElement.style.display = "none";
		}
		toast.addEventListener("webkitAnimationEnd", () => totalHidden());
		toast.addEventListener("animationEnd", ()=> totalHidden());
		toast.addEventListener("msAnimationEnd", ()=> totalHidden());
		toast.addEventListener("oAnimationEnd", ()=>totalHidden());
	}

	Toast.__defineGetter__("BOTTOM", function() {return ToastConstants.BOTTOM});
	Toast.__defineGetter__("TOP", function() {return ToastConstants.TOP});
	Toast.__defineGetter__("DEFAULT_DURATION", function() {return ToastConstants.DEFAULT_DURATION});

	Toast.prototype.__defineSetter__("duration", function(t) {
		if (t <= 0) throw "Error: Toast duration must be a positive integer";
		this._duration = parseInt(t); 
	});

	Toast.prototype.__defineSetter__("position", function(pos) {
		if (pos !== ToastConstants.BOTTOM && pos !== ToastConstants.TOP) 
			throw "Error: Toast position must be equal to Toast.BOTTOM or Toast.TOP";
		this._position = pos;
		this.style.textContent = setStyle.call(this);
	});

	Toast.prototype.__defineSetter__("text", function(text) {
		this.toastElement.innerText = text || "";
	});

	Toast.prototype.__defineSetter__("backgroundColor", function(color) {
		this._bgColor = color;
		this.style.textContent = setStyle.call(this);
	});

	Toast.prototype.__defineSetter__("color", function(color) {
		this._color = color;
		this.style.textContent = setStyle.call(this);
	});

	Toast.makeText = function({duration:duration, text:text, position:position, backgroundColor: backgroundColor, color: color}) {
		toast.duration = parseInt(duration) || Toast.DEFAULT_DURATION;
		toast.position = typeof(position === "undefined") ? ToastConstants.BOTTOM : position;
		toast.text = text;
		toast.backgroundColor = backgroundColor || "#f0f0f0";
		toast.color = color || null;
		return toast;
	}

	Toast.prototype.show = function(duration) {
		if (duration) this.duration = duration;
		this.toastElement.removeAttribute("style");
		this.toastElement.removeAttribute("class");
		this.toastElement.classList.add("fadein");
		setTimeout(() => hide.call(this), this._duration+1000);
	}

	const hide = function() {
		this.toastElement.classList.remove("fadein");
		this.toastElement.classList.add("fadeout");
	}

	const toast = new Toast();
	window.Toast = Toast;
})();
