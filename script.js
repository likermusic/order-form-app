const orderForm = document.getElementById("orderForm");

const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");
const categorySelect = document.getElementById("category");
const quantityInput = document.getElementById("quantity");
const resetBtn = document.getElementById("resetBtn");
const previewCard = document.getElementById("previewCard");

const previewName = document.getElementById("previewName");
const previewComment = document.getElementById("previewComment");
const previewCategory = document.getElementById("previewCategory");
const previewQuantity = document.getElementById("previewQuantity");
const previewDelivery = document.getElementById("previewDelivery");
const previewOptions = document.getElementById("previewOptions");
const previewTotal = document.getElementById("previewTotal");

const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

function getSelectedDelivery() {
  const deliveryRadio = document.querySelector(
    'input[name="delivery"]:checked',
  );
  return deliveryRadio ? deliveryRadio.value : "Не выбрано";
}

function getSelectedOptions() {
  const optionCheckboxes = document.querySelectorAll(".option:checked");
  const options = [];

  for (const checkbox of optionCheckboxes) {
    options.push(checkbox.value);
  }

  return options;
}

function calculateTotal() {
  const selectedOption = categorySelect.options[categorySelect.selectedIndex];
  const productPrice = Number(selectedOption.dataset.price);

  let quantity = Number(quantityInput.value);
  if (quantity < 1 || Number.isNaN(quantity)) {
    quantity = 1;
  }

  let extraPrice = 0;
  const checkedOptions = document.querySelectorAll(".option:checked");

  for (const option of checkedOptions) {
    extraPrice += Number(option.dataset.price);
  }

  return productPrice * quantity + extraPrice;
}

function updatePreview() {
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();
  const category = categorySelect.value;
  const quantity = quantityInput.value.trim();
  const delivery = getSelectedDelivery();
  const options = getSelectedOptions();
  const total = calculateTotal();

  previewName.textContent = name || "—";
  previewComment.textContent = comment || "—";
  previewCategory.textContent = category;
  previewQuantity.textContent = quantity || "1";
  previewDelivery.textContent = delivery;
  previewOptions.textContent = options.length > 0 ? options.join(", ") : "Нет";
  previewTotal.textContent = `${total} ₽`;
}

nameInput.addEventListener("input", updatePreview);
commentInput.addEventListener("input", updatePreview);
categorySelect.addEventListener("change", updatePreview);
quantityInput.addEventListener("input", updatePreview);

const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
for (const radio of deliveryRadios) {
  radio.addEventListener("change", updatePreview);
}

const optionCheckboxes = document.querySelectorAll(".option");
for (const checkbox of optionCheckboxes) {
  checkbox.addEventListener("change", updatePreview);
}

quantityInput.addEventListener("keydown", function (event) {
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  const isDigit = event.key >= "0" && event.key <= "9";

  if (!isDigit && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
});

nameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    commentInput.focus();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearForm();
  }
});

previewCard.addEventListener("mouseenter", function () {
  previewCard.classList.add("hovered");
});

previewCard.addEventListener("mouseleave", function () {
  previewCard.classList.remove("hovered");
});

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  errorMessage.textContent = "";
  successMessage.textContent = "";
  nameInput.classList.remove("invalid");
  quantityInput.classList.remove("invalid");

  const name = nameInput.value.trim();
  const quantity = Number(quantityInput.value);

  if (name === "") {
    errorMessage.textContent = "Ошибка: введите имя клиента.";
    nameInput.classList.add("invalid");
    return;
  }

  if (Number.isNaN(quantity) || quantity < 1) {
    errorMessage.textContent = "Ошибка: количество должно быть больше 0.";
    quantityInput.classList.add("invalid");
    return;
  }

  successMessage.textContent = "Заказ успешно оформлен!";
});

resetBtn.addEventListener("click", clearForm);

function clearForm() {
  orderForm.reset();
  quantityInput.value = "1";

  errorMessage.textContent = "";
  successMessage.textContent = "";
  nameInput.classList.remove("invalid");
  quantityInput.classList.remove("invalid");

  updatePreview();
}

updatePreview();
