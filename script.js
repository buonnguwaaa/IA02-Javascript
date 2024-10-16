function isEmpty(input) {
    return !input.value.trim().length;
}

function isValidNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

const notificationDiv = document.querySelector("#notification");

function showNotification(message) {
  notificationDiv.textContent = message;
}

function validateInput(input) {
  if (!isValidNumber(input.value)) {
    showNotification(`Caution: Please enter a valid number for ${input.name}.`);
    input.focus();
    return false;
  }
  return true;
}

const num1Input = document.querySelector("#num1");
const num2Input = document.querySelector("#num2");

//Xử lý sự kiện blur cho 2 input
num1Input.addEventListener("blur", () => validateInput(num1Input));
num2Input.addEventListener("blur", () => validateInput(num2Input));



const calculateBtn = document.querySelector("#calculateBtn");
const resultInput = document.querySelector("#result");
const operationCheckboxes = document.querySelectorAll('input[name="operation"]');

//Xử lý sự kiện click cho nút Calculate
calculateBtn.addEventListener("click", () => {
  if (!validateInput(num1Input) || !validateInput(num2Input)) {
    return;
  }

  const selectedOperation = Array.from(operationCheckboxes).find(checkbox => checkbox.checked);
  if (!selectedOperation) {
    showNotification("Caution: Please select an operation.");
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
        showNotification("Caution: Can not divide by zero.");
        return;
      }
      result = num1 / num2;
      break;
  }

  resultInput.value = result;
  showNotification(""); // Clear any previous notification
});

// Ensure only one checkbox can be selected at a time
operationCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      operationCheckboxes.forEach(cb => {
        if (cb !== checkbox) cb.checked = false;
      });
    }
  });
});