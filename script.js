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

const bothInputs = document.querySelectorAll('[name="input"]');
const num1Input = document.querySelector("#num1");
const num2Input = document.querySelector("#num2");

// console.log(bothInputs);
bothInputs.forEach(input => {
  input.addEventListener("mouseout", () => {
    if (!isValidNumber(num1Input.value) && !isValidNumber(num2Input.value)) {
      showNotification("Caution: Please enter valid numbers for both inputs.");
      return;
    }
    if (!isValidNumber(num1Input.value)) {
       showNotification(`Caution: Please enter a valid number for the 1st number.`);
       return;
     }
    if (!isValidNumber(num2Input.value)) {
      showNotification(`Caution: Please enter a valid number for the 2nd number.`);
      return;
    }
    showNotification(""); 
  });
});


const calculateBtn = document.querySelector("#calculateBtn");
const resultInput = document.querySelector("#result");
const operationCheckboxes = document.querySelectorAll('input[name="operation"]');

calculateBtn.addEventListener("click", () => {
  if (!isValidNumber(num1Input.value) && !isValidNumber(num2Input.value)) {
    showNotification("Caution: Please enter valid numbers for both inputs.");
    return;
  }
  if (!isValidNumber(num1Input.value)) {
     showNotification(`Caution: Please enter a valid number for the 1st number.`);
     return;
   }
  if (!isValidNumber(num2Input.value)) {
    showNotification(`Caution: Please enter a valid number for the 2nd number.`);
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
        showNotification("Caution: Can not be divided by zero.");
        return;
      }
      result = num1 / num2;
      break;
  }
  showNotification("");
  resultInput.value = result;
});

operationCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      operationCheckboxes.forEach(cb => {
        if (cb !== checkbox) cb.checked = false;
      });
    }
  });
});