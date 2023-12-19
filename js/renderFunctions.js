const contentContainer = document.getElementById('root');
const aboutUsRow =
  'https://gist.githubusercontent.com/YugerKakein/7a378a089653a6d38137ba7c70d061fd/raw/9947f374e4292fd485ec8beef729f15e54800e35/about_us_data.json';
const productRow =
  'https://gist.githubusercontent.com/YugerKakein/93fe02841929be3236a0c6514d3cbbd4/raw/d0bed207ffcb0b5131301a2b9b2b8bfac16e80e8/data.json';

/* about-us page */

let jsonDataAbout;

async function fetchDataAbout() {
  try {
    const response = await fetch(aboutUsRow);
    jsonDataAbout = await response.json();
    if (jsonDataAbout) {
      initAboutUs();
    } else {
      console.error('Invalid JSON data structure.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error('Invalid JSON data structure.');
  }
}

fetchDataAbout();

function renderAboutUsContent(data) {
  const divElement = document.createElement('div');
  divElement.innerHTML = ` <!-- about us -->
    <h2 class="subheader">Про компанію</h2>
    <section class="about-us" id="about-us">
      <div class="about-us-img">
        <img src="img/aboutUs.jpg" alt="about us" />
      </div>
      ${data
        .map((item) => {
          return item.Paragraphs.map(
            (infoItem) => `
          <p class='about-paragraph'>${infoItem.one || ''}</p>
          <p class='about-paragraph'>${infoItem.two || ''}</p>
          <p class='about-paragraph'>${infoItem.three || ''}</p>
        `
          ).join('');
        })
        .join('')}
    </section>`;

  contentContainer.innerHTML = ''; // Clear previous content
  contentContainer.appendChild(divElement);
}

function initAboutUs() {
  renderAboutUsContent(jsonDataAbout);
}

/* product page */

let jsonDataProduct;

async function fetchDataProduct() {
  try {
    const response = await fetch(productRow);
    jsonDataProduct = await response.json();
    if (jsonDataProduct) {
      initProductTable();
    } else {
      console.error('Invalid JSON data structure.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error('Invalid JSON data structure.');
  }
}

fetchDataProduct();

function renderProductTable(data) {
  const sectionElement = document.createElement('section');

  // Set the id attribute for the section element
  sectionElement.id = 'product';
  sectionElement.className = 'products';
  // Render products section header
  sectionElement.innerHTML += `
    <!-- products -->
    <h2 class="subheader">Наша продукція</h2>
    <ul class="title-list">
      <li class="title-list-item">Найменування</li>
      <li class="title-list-item">Вага, г</li>
      <li class="title-list-item">Термін зберігання, міс</li>
      <li class="title-list-item">Упаковка, кг/шт в ящ</li>
      <li class="title-list-item">Ціна з ПДВ, грн</li>
    </ul>`;

  // Render product data
  data.forEach((item) => {
    sectionElement.innerHTML += `
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

  contentContainer.innerHTML = ''; // Clear previous content
  contentContainer.appendChild(sectionElement);
}

function initProductTable() {
  renderProductTable(jsonDataProduct);
}

function initContent() {
  const initialHash = window.location.hash;
  if (initialHash) {
    handleNavigation(initialHash);
  }

  // Handle navigation links
  document.querySelectorAll('.nav-item').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const hash = link.getAttribute('href');
      handleNavigation(hash);
      window.location.hash = hash;
    });
  });
}

function handleNavigation(hash) {
  switch (hash) {
    case '#about-us':
      if (jsonDataAbout) initAboutUs();
      break;
    case '#product':
      if (jsonDataProduct) initProductTable();
      break;
    // Add more cases for other sections if needed
    default:
      // Handle unknown hash or default case
      break;
  }
}

window.addEventListener('hashchange', () => {
  const newHash = window.location.hash;
  handleNavigation(newHash);
});

window.addEventListener('DOMContentLoaded', initContent);
