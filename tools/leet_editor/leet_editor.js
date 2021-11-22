"use strict"; // UTF-8で書いているよ

window.addEventListener("load", function() {
	const lengthDisplay = document.getElementById("length_display");
	const mainInput = document.getElementById("main_input");
	const editor = document.getElementById("editor");
	const conversionTable = document.getElementById("conversion_table");

	function inputUpdated() {
		const str = mainInput.value;
		lengthDisplay.innerText = "length: " + str.length;
		const convList = conversionTable.value.replace(/\r\n/g, "\n").split(/\r|\n/);
		const span = document.createElement("span");
		for (let i = 0; i < str.length; i++) {
			const c = str.charAt(i);
			let convChoice = null;
			for (let j = 0; j < convList.length; j++) {
				if (convList[j].indexOf(c) >= 0) {
					convChoice = convList[j];
					break;
				}
			}
			if (convChoice === null) convChoice = c;
			const idx = convChoice.indexOf(c);
			const element = document.createElement("span");
			element.setAttribute("class", "editor_char_select");
			for (let j = 0; j < convChoice.length; j++) {
				if (j > 0) element.appendChild(document.createElement("br"));
				const cElem = document.createElement("span");
				cElem.setAttribute("class", "editor_char");
				cElem.appendChild(document.createTextNode(convChoice.charAt(j)));
				const color = j === idx ? "#ffc0c0" : "#c0c0c0";
				cElem.setAttribute("style", "background-color: " + color + ";");
				cElem.addEventListener("click", (function(pos, text) {
					return function() {
						const oldValue = mainInput.value;
						const newValue = oldValue.substring(0, pos) + text + oldValue.substring(pos + 1);
						mainInput.value = newValue;
						inputUpdated();
					};
				})(i, convChoice[j]));
				element.appendChild(cElem);
			}
			span.appendChild(element);
		}
		while (editor.firstChild !== null) editor.removeChild(editor.firstChild);
		editor.appendChild(span);
	}

	mainInput.addEventListener("input", inputUpdated);
	inputUpdated();
});
