const contentContainer = document.getElementById('root');
const aboutUsRow =
  'https://gist.githubusercontent.com/YugerKakein/7a378a089653a6d38137ba7c70d061fd/raw/9947f374e4292fd485ec8beef729f15e54800e35/about_us_data.json';
const productRow =
  'https://gist.githubusercontent.com/YugerKakein/93fe02841929be3236a0c6514d3cbbd4/raw/d0bed207ffcb0b5131301a2b9b2b8bfac16e80e8/data.json';

const newsRow =
  'https://gist.githubusercontent.com/YugerKakein/5fd61b3143de3864fad3acc75604bcbe/raw/48b681769587be2b80ad453223c8a3c15561bef3/news_data.json';

/* news */

let jsonDataNews;

async function fetchDataNews() {
  try {
    const response = await fetch(newsRow);
    jsonDataNews = await response.json();
    if (jsonDataNews) {
      initNews();
    } else {
      console.error('Invalid JSON data structure.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error('Invalid JSON data structure.');
  }
}

fetchDataNews();

function renderNewsContent(data) {
  const sectionElement = document.createElement('section');

  // Set the id attribute for the section element
  sectionElement.id = 'news';
  sectionElement.className = 'news';

  sectionElement.innerHTML += `<!-- News -->
    <h2 class="subheader">Новини</h2>
    <section class="news" id="news">
      ${data
        .map(
          (item) => `<div class="post">
                      <img src="${item.IMG}" alt="Post Image">
                      <div class="detail">
                        <time class="entry-date">${item.Time}</time>
                        <p class="post-header">
                          <a href="${item.Url}" target="_blank">
                            ${item.Header}
                          </a>
                        </p>
                        ${
                          item.Details
                            ? item.Details.map(
                                (itemDetail) =>
                                  `<p class="post-title">${itemDetail.Paragraph}</p>`
                              ).join('')
                            : ''
                        }
                        <button class="read-more">
                          <a href="${item.Url}" target="_blank">Читати все</a>
                        </button>
                      </div>
                    </div>`
        )
        .join('')}
    </section>`;

  contentContainer.innerHTML = ''; // Clear previous content
  contentContainer.appendChild(sectionElement);
}

function initNews() {
  renderNewsContent(jsonDataNews);
}

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
  const sectionElement = document.createElement('section');

  // Set the id attribute for the section element
  sectionElement.id = 'about-us';
  sectionElement.className = 'about-us';
  // Render products section header
  sectionElement.innerHTML = ` <!-- about us -->
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
  contentContainer.appendChild(sectionElement);
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
    case '#news':
      if (jsonDataNews) initNews();
      break;
    // Add more cases for other sections if needed
    default:
      if (jsonDataNews) initNews();
      break;
  }
}

window.addEventListener('hashchange', () => {
  const newHash = window.location.hash;
  handleNavigation(newHash);
});

window.addEventListener('DOMContentLoaded', initContent);
