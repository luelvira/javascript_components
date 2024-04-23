const ToastConstants = {
    BOTTOM: true,
    TOP: false,
    DEFAULT_DURATION: 2000,
};
function hide() {
    this.toastElement.classList.remove("fadein");
    this.toastElement.classList.add("fadeout");
}

export default class Toast {
    static toast;

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
        if (t <= 0) throw Error("Error: Toast duration must be a positive integer");
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
        this.style.textContent = this.setStyle();
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
        this.style.textContent = this.setStyle();
    }

    /**
     * @param {string} color the color of the text
     */
    set color(color) {
        this._color = color;
        this.style.textContent = this.setStyle();
    }

    static makeText({ duration, text, position, backgroundColor, color }) {
        Toast.toast.duration = parseInt(duration) || Toast.DEFAULT_DURATION;
        Toast.toast.position = typeof position === "undefined" ? ToastConstants.BOTTOM : position;
        Toast.toast.text = text;
        Toast.toast.backgroundColor = backgroundColor || "#f0f0f0";
        Toast.toast.color = color || null;
        return Toast.toast;
    }

    show(duration) {
        if (duration) this.duration = duration;
        this.toastElement.removeAttribute("style");
        this.toastElement.removeAttribute("class");
        this.toastElement.classList.add("fadein");
        setTimeout(() => hide.call(this), this._duration + 1000);
    }

    setStyle() {
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
    ${(() => (this._position ? "bottom: 2%;" : "top: 2%;"))()}
    ${(() => (this._color ? `color: ${this._color};` : ""))()}
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


}

Toast.toast = new Toast();
