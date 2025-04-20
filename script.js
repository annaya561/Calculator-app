let string = "";
let buttons = document.querySelectorAll('button');
let inputField = document.querySelector('input');

// Set initial value
inputField.value = "0";

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;
        let lastChar = string.slice(-1); // Get last character

        if (value === '=') {
            try {
                string = eval(string).toString();
                inputField.value = string || "0";
            } catch (error) {
                inputField.value = "Error";
                string = "";
            }
        } else if (value === 'AC') {
            string = "";
            inputField.value = "0";
        } else if (value === '←') {
            string = string.slice(0, -1);
            inputField.value = string || "0";
        } else if (value === '%') {
            try {
                string = (eval(string) / 100).toString();
                inputField.value = string;
            } catch {
                inputField.value = "Error";
                string = "";
            }
        } else if ("+*/".includes(value)) {
            if (string === "" || "+-*/".includes(lastChar)) return;
            string += value;
            inputField.value = string;
        } else if (value === '-') {
            // Allow '-' at the beginning or after an operator, but prevent repeated '-'
            if (string === "") {
                string += value; // For -9
            } else if (!"+-*/".includes(lastChar)) {
                string += value;
            }
            inputField.value = string;
        } else if (value === '.') {
            let parts = string.split(/[\+\-\*\/]/);
            let lastPart = parts[parts.length - 1];
            if (lastPart.includes('.')) return;
            string += value;
            inputField.value = string;
        } else {
            if (string === "0" && value === "0") return;
            if (string === "" && value >= '0' && value <= '9') {
                string = value;
            } else {
                string += value;
            }
            inputField.value = string;
        }
    });
});

document.addEventListener("keydown", function(event) {
    const key = event.key;
    let lastChar = string.slice(-1);

    if (!isNaN(key)) {
        // Number keys
        if (string === "0" && key === "0") return;
        if (string === "") {
            string = key;
        } else {
            string += key;
        }
        inputField.value = string;
    } else if ("+-*/".includes(key)) {
        if (string === "" || "+-*/".includes(lastChar)) return;
        string += key;
        inputField.value = string;
    } else if (key === '-') {
        if (string === "") {
            string += key;
        } else if (!"+-*/".includes(lastChar)) {
            string += key;
        }
        inputField.value = string;
    } else if (key === '.') {
        let parts = string.split(/[\+\-\*\/]/);
        let lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) return;
        string += key;
        inputField.value = string;
    } else if (key === 'Enter') {
        try {
            string = eval(string).toString();
            inputField.value = string || "0";
        } catch (error) {
            inputField.value = "Error";
            string = "";
        }
    } else if (key === 'Backspace') {
        string = string.slice(0, -1);
        inputField.value = string || "0";
    } else if (key === 'Escape') {
        string = "";
        inputField.value = "0";
    } else if (key === '%') {
        try {
            string = (eval(string) / 100).toString();
            inputField.value = string;
        } catch {
            inputField.value = "Error";
            string = "";
        }
    }
});

document.addEventListener("keydown", function(event) {
    const key = event.key;
    let lastChar = string.slice(-1);

    // Copy result with Ctrl+C
    if (event.ctrlKey && key === 'c') {
        navigator.clipboard.writeText(inputField.value)
            .then(() => {
                
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
        return; 
    }

});



