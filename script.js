const display = document.getElementById('display');

function appendValue(val) {
    if (display.value.length === 1 && display.value === "0" && val !== '.') {
        display.value = val;
    } else {
        display.value += val;
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    let expression = display.value.replace(/÷/g, '/').replace(/×/g, '*');
    try {
        // Simple percent handling: 50% = 0.5
        expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, num) => String(Number(num) / 100));
        let result = eval(expression);
        if (result === undefined) result = '';
        display.value = result;
    } catch (e) {
        display.value = 'Error';
    }
}

// Optional: handle keyboard input
document.addEventListener('keydown', function(e) {
    if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(e.key)) {
        appendValue(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});
