var element = document.querySelector('section');
var display = document.querySelector('span');
var prev = '';
var expresion = '0';
var isDecimal = false;
var operators = ['+', '-', '*', '/'];

element.addEventListener('click', function (e) {
	e.preventDefault();

	if (e.target.value === '.' && !isDecimal) {
		isDecimal = true;
		if (/[+-/*]/.test(expresion.toString().slice(-1))) {
			expresion = expresion + `0${e.target.value}`;
		} else if (prev === '=') {
			expresion = `0${e.target.value}`;
		} else {
			expresion = expresion + e.target.value;
		}

	}

	if (operators.includes(e.target.value)) {
		if (/[+-/.*]/.test(expresion.toString().slice(-1))) {
			expresion = expresion.slice(0, -1) + e.target.value;
		} else {
			isDecimal = false;
			expresion = expresion + e.target.value;
		}
	}

	if (!isNaN(e.target.value)) {
		if (prev === '=') {
			expresion = e.target.value;
		} else if (parseInt(expresion) === 0 && expresion.length === 1) {
			expresion = e.target.value;
		} else {
			expresion = expresion + e.target.value;
		}
	}

	if (e.target.value === '=') {
		isDecimal = false;
		if (/[+-/*]/.test(expresion.toString().slice(-1))) {
			expresion = eval(expresion.slice(0, -1));
		} else {
			expresion = Math.round(eval(expresion) * 10000000) / 10000000;
		}
	}

	if (e.target.value === 'ce') {
		isDecimal = false;
		expresion = '0';
	}

	prev = e.target.value;

	display.textContent = expresion;

});