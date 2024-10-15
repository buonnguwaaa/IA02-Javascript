let alertVisible = false;

function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function showNotification(message) {
    if (!alertVisible) {
        alert(message);
        alertVisible = true; 
    }
}

const num1Input = document.querySelector("#num1");
const num2Input = document.querySelector("#num2");
function validateInput(input) {
    if (!isValidNumber(input.value)) {
        if (input == num1Input) {
            showNotification(`Please enter a valid number for the first number.`);
        } else if (input == num2Input) {
            showNotification(`Please enter a valid number for the second number.`);
        }
        return false;
    }
    alertVisible = false;
    return true;
}

num1Input.addEventListener("blur", () => validateInput(num1Input));
num2Input.addEventListener("blur", () => validateInput(num2Input));

const calculateBtn = document.querySelector("#calculateBtn");
const resultInput = document.querySelector("#result");
const operationCheckboxes = document.querySelectorAll('input[name="operation"]');
calculateBtn.addEventListener("click", () => {
    if (!validateInput(num1Input) || !validateInput(num2Input)) {
        return;
    }

    const selectedOperation = Array.from(operationCheckboxes).find((checkbox) => checkbox.checked);
    if (!selectedOperation) {
        showNotification("Please select an operation.");
        alertVisible = false;
        return;
    }

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);

    let result;
    switch (selectedOperation.id) {
        case "addOp":
            result = num1 + num2;
            break;
        case "subtractOp":
            result = num1 - num2;
            break;
        case "multiplyOp":
            result = num1 * num2;
            break;
        case "divideOp":
            if (num2 === 0) {
                showNotification("Cannot divide by zero.");
                alertVisible = false;
                return;
            }
            result = num1 / num2;
            break;
    }

    resultInput.value = result;
});

operationCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            operationCheckboxes.forEach((cb) => {
                if (cb !== checkbox) 
                    cb.checked = false;
            });
        }
    });
});
