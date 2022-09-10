$ = function(selector) {
	let result = document.querySelectorAll(selector);
	return selector[0] === '#' ? result[0] : result;
}

/* prototype helpers */

HTMLElement.prototype.on = function(type, callback) {
	type.split(" ").forEach(eType => this.addEventListener(eType, callback));
	return this;
}

HTMLElement.prototype.attr = function(name, value) {
	if (typeof(value)  != 'undefined')  {
		this.setAttribute(name, value);
		return this;
	} 
	return this.getAttribute(name);
}

HTMLElement.prototype.rattr = function(name) {
	this.removeAttribute(name);
}

NodeList.prototype.on = function(type, callback) {
	for (let node of this)
		node.on(type, callback);
	return this;
}

NodeList.prototype.each = function(callback) {
	this.forEach(callback)
	return this;
}

NodeList.prototype.attr = function(name, value) {
	for (let node of this)
		node.attr(name, value);
	return this;
}

function preventDefault(event) {
	event.preventDefault();
	event.stopPropagation();
}

function cookie2object() {
	return Object.fromEntries([...document.cookie.split(";").map(c => c.trim()).map(c => c.split("="))])
}
