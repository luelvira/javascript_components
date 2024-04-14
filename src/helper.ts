interface ExtendedHTMLElement extends HTMLElement {
  on(event:string, callback: (e:Event) => void): this;
  attr(name:string, value?:string): this|string;
  rattr(name:string):this;
}

function ExtendedHTMLElement(element:HTMLElement) {
  Object.assign(this, element);
}

ExtendedHTMLElement.prototype.on = function(eventType: string, callback: (e:Event) => void): ExtendedHTMLElement {
	eventType.split(" ").forEach(eType => this.addEventListener(eType, callback));
	return this;
  }
ExtendedHTMLElement.prototype.attr = function(name:string, value?:string): ExtendedHTMLElement|string {
	if (typeof(value) != 'undefined') {
		this.setAttribute(name, value);
		return this;
	} 
	return this.getAttribute(name);
  }
ExtendedHTMLElement.prototype.rattr = function(name:string):ExtendedHTMLElementList {
	this.removeAttribute(name);
	return this;
  }


class ExtendedHTMLElementList {
  private list:NodeList;
  private iterationCount:number;
  get length() {
    return this.list.length;
  }
  item(index:number) {
    return this.list.item(index);
  }

  forEach(callback: (item:Node, index:number, parent: NodeList)=>void, thisArg?:any) {
    this.list.forEach(callback, thisArg);
  }
  entries() {
    return this.list.entries();
  }
  keys() {
    return this.list.keys();
  }
  values() { return this.list.values();}
  constructor(list: NodeList) {
    this.list = list;
    this.iterationCount = 0;
    Object.assign(this, list);
  }
  [Symbol.iterator](): IterableIterator<Node> {
    return this;
  }

  next() {
    let result;
    if (this.iterationCount < this.length) {
      result = {value: this.item(this.iterationCount), done: false}
      this.iterationCount++;
    } else {
      result = {value: this.item(this.iterationCount), done: true}
      this.iterationCount = 0;
    }
    return result;
    
    
  }
  on(eventType: string, callback: (e: Event) => void): ExtendedHTMLElementList {
    for (const node of this)
      (<ExtendedHTMLElement>node).on(eventType, callback);
    return this;
  }
  
  each(callback: (item:ExtendedHTMLElement, index:number) => void): ExtendedHTMLElementList {
    this.forEach(callback)
    return this;
  }
  
  attr(name:string, value?:string): ExtendedHTMLElementList {
    for (const node of this)
      (<ExtendedHTMLElement>node).attr(name, value);
    return this;
  }
}

Object.setPrototypeOf(ExtendedHTMLElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(ExtendedHTMLElementList.prototype, NodeList.prototype);

const S = function(selector: string): ExtendedHTMLElement|ExtendedHTMLElementList {
  let meta_sel = selector.split(" "),
      lastSelector = meta_sel.slice(-1)[0];
  if (lastSelector[0] === "#") {
    const result = document.querySelector(selector);
    return result && new ExtendedHTMLElement(<HTMLElement>result);
  }
  const result = document.querySelectorAll(selector)
  if (result.length)
    return new ExtendedHTMLElementList(<NodeList>result);
}
const $ = S;

function preventDefault(event:Event): void {
	event.preventDefault();
	event.stopPropagation();
}

function cookie2object():object {
	return Object.fromEntries([...document.cookie.split(";").map(c => c.trim()).map(c => c.split("="))])
}

export { S, $, preventDefault, cookie2object }
