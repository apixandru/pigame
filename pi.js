var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489";
var digit = 0;
var from;
var playing = false;
function playSound() {
	let hash = '';
	if(window.location.hash) {
	  hash = window.location.hash.substring(1);
	}
	console.log(hash)

	document.getElementById("dummy").innerHTML = "<embed src=\"pi" + hash + ".mp3\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
	playing = true;
	from = new Date().getTime();
	digit = 0;
	document.getElementById('n9').innerHTML = "";
}

function stopSound() {
	document.getElementById("dummy").innerHTML = "";
	playing = false;
}

function checkKeycode(e) {
	var keycode = 0;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;

	if (!playing) {
		if (keycode !== 32) {
			return;
		}
		playSound();

	} else {
		keycode = getKey(keycode);
		if (keycode !== PI.charAt(digit++)) {
			stopSound();
			resetFields();
			document.getElementById('n9').innerHTML = (digit - 3
					+ " digits in " + getTime(new Date().getTime() - from));
			return;
		}
		moveLeft();
		document.getElementById('n1').innerHTML = keycode;
		if (digit === PI.length){
			stopSound();
			resetFields();
			document.getElementById('n9').innerHTML = "Great job! Done in " + getTime( new Date().getTime() - from );
			return;
		}
	}

}

function resetFields() {
	var i;
	for (i = 1; i < 10; i++) {
		document.getElementById('n' + i).innerHTML = "";
	}
}

function moveLeft() {
	var i;
	for (i = 8; i > 0; i--) {
		document.getElementById('n' + (i + 1)).innerHTML = document
				.getElementById('n' + (i)).innerHTML;
	}
}

function getKey(key) {
	switch (key) {
	case 110:
	case 190:
		return '.';
	case 96:
	case 48:
		return '0';
	case 97:
	case 49:
		return '1';
	case 98:
	case 50:
		return '2';
	case 99:
	case 51:
		return '3';
	case 100:
	case 52:
		return '4';
	case 101:
	case 53:
		return '5';
	case 102:
	case 54:
		return '6';
	case 103:
	case 55:
		return '7';
	case 104:
	case 56:
		return '8';
	case 105:
	case 57:
		return '9';
	default:
		return -1;
	}
}

function getTime(ms) {
	var min = parseInt(ms % (1000 * 60 * 60) / (1000 * 60));
	var sec = parseInt((ms % (1000 * 60 * 60)) % (1000 * 60) / 1000);
	return (min > 0 ? min + ":" : "") + (sec > 9 ? sec : "0" + sec) + " at " +  parseInt((digit / (ms/ 1000))*60) + " cpm";
}
