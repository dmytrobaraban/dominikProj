let jsonData;

async function fetchData() {
  try {
    const response = await fetch('data.json');
    jsonData = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData().then(() => {
  if (jsonData) {
    initProductTable();
  } else {
    console.error('Invalid JSON data structure.');
  }
});


const productTable = document.getElementById('products');

function renderProductTable(data) {
  const divElement = document.createElement('div');

  // Render header row
  divElement.innerHTML += `
        <ul class="title-list">
          <li class="title-list-item">Найменування</li>
          <li class="title-list-item">Вага, г</li>
          <li class="title-list-item">Термін зберігання, міс</li>
          <li class="title-list-item">Упаковка, кг/шт в ящ</li>
          <li class="title-list-item">Ціна з ПДВ, грн</li>
        </ul>`
  data.forEach((item) => {
    divElement.innerHTML += `
      
        <h3 class="product-header">${item.SubHead}</h3>
        <div class="accordion">
        ${
          item.Info
            ? item.Info.map(
                (infoItem) => `
            <ul class="title-list">
              <li class="title-list-item">${infoItem.Name}</li>
              <li class="title-list-item">${infoItem.Weight}</li>
              <li class="title-list-item">${infoItem.ExpirationDate}</li>
              <li class="title-list-item">${infoItem.Packaging}</li>
              <li class="title-list-item">${infoItem.Price}</li>
            </ul>`
              ).join('')
            : ''
        }
      </div>`;
  });

  productTable.appendChild(divElement);
}

function initProductTable() {
  renderProductTable(jsonData);
}

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
