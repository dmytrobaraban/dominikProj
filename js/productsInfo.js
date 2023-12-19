document.body.addEventListener('click', function (event) {
  var target = event.target;
  // Перевіряємо, чи клікнули на елемент з класом "product-header"
  if (target.classList.contains('product-header')) {
    // Знаходимо наступний елемент "accordion" після "product-header"
    var accordion = target.nextElementSibling;

    // Переключаємо клас "active" для елемента "accordion"
    accordion.classList.toggle('active');
  }
});
