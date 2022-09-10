function testValidID() {
	let id = null;
	for (let sel of ["#id", "#id #cont2", "div #cont2"]) {
		id = $(sel);
		console.assert(HTMLElement.prototype.isPrototypeOf(id), "check the object type")
	}
}
function testMultiplesValues() {
	let buttons = $("button")
	console.assert(NodeList.prototype.isPrototypeOf(buttons), "test 2")
	console.assert(buttons.length === 4, "test 3")
	buttons = $("#id button");
	console.assert(NodeList.prototype.isPrototypeOf(buttons), "test 3")
	console.assert(buttons.length === 4, "test 4")
	buttons = $("#id button.middle");
	console.assert(NodeList.prototype.isPrototypeOf(buttons), "test 5")
	console.assert(buttons.length === 1, "test 6. buttons length are "+ buttons.length)
}

function testInvalidSelector() {
	let random = $("#rand");
	console.assert(random === null, "test 6 failed. random is not null")
}

testValidID();
testMultiplesValues()
testInvalidSelector()
