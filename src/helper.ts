interface iExtendedHTMLElement  {
  on(event:string, callback: (e:Event) => void): this;
  attr(name:string, value?:string): this|string|null;
  rattr(name:string):this;
}

class ExtendedHTMLElement extends HTMLElement implements iExtendedHTMLElement {
  constructor(element:HTMLElement) {
    super();
    Object.assign(this, element);
  }
  on(eventType: string, callback: (e:Event) => void): this {
	eventType.split(" ").forEach(eType => this.addEventListener(eType, callback));
	return this;
  }
  attr(name:string, value?:string): this|string|null {
	if (typeof(value) != 'undefined') {
		this.setAttribute(name, value);
		return this;
	} 
	return this.getAttribute(name);
  }
  rattr(name:string):this {
	this.removeAttribute(name);
	return this;
  }
}



class ExtendedHTMLElementList implements NodeListOf<ExtendedHTMLElement> {
  iterationCount:number
  [index:number]: ExtendedHTMLElement;
  length:number
  item(i:number): ExtendedHTMLElement {
    return this[i];
  }

  forEach(callback: (item:ExtendedHTMLElement, index:number, parent: NodeListOf<ExtendedHTMLElement>)=>void, thisArg?:any) {
    for (let i = 0; i < this.length; i++)
      callback.call(thisArg, this[i], i, this);
  }
  entries():IterableIterator<[number, ExtendedHTMLElement]> {
    const entries: [number, ExtendedHTMLElement][] = [];
    for (let i = 0; i < this.length; i++) {
      entries.push([i, this[i]]);
    }
    return entries.values();
  }
  keys() {
    return Array.from(Array(this.length).keys()).values();
  }
  values(): IterableIterator<ExtendedHTMLElement> {
    return Array.from(this).values();
  }

  [Symbol.iterator](): IterableIterator<ExtendedHTMLElement> {
    return this.values();
  }
  constructor(list: NodeListOf<HTMLElement>) {
    this.iterationCount = 0;
    this.length = list.length;
    for (let i = 0; i < this.length; i++)
      this[i] = new ExtendedHTMLElement(list[i]);
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
  
  each(callback: (item:HTMLElement, index:number, parent: NodeList) => void): ExtendedHTMLElementList {
    this.forEach(callback);
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

const S = function(selector: string): ExtendedHTMLElement|ExtendedHTMLElementList| null {
  let meta_sel = selector.split(" "),
      lastSelector = meta_sel.slice(-1)[0];
  if (lastSelector[0] === "#") {
    const result = document.querySelector(selector);
    return result && new ExtendedHTMLElement(<HTMLElement>result);
  }
  const result = document.querySelectorAll(selector)
  if (result.length)
    return new ExtendedHTMLElementList(<NodeListOf<HTMLElement>>result);
  return null;
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
