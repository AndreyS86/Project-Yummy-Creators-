export const hero = {};
import axios from 'axios';
import Swiper from 'swiper/swiper-bundle.min.mjs';
import '../../../node_modules/swiper/swiper-bundle.css';

const BASE_URL = `https://tasty-treats-backend.p.goit.global/api/events`;

async function fetchMasterClass() {
  try {
    const response = await axios.get(BASE_URL);

    if (response.status === 404) {
      throw new Error(response.status);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('error');
  }
}

fetchMasterClass()
  .then(data => {
    createMarkupSwiper(data);
  })
  .catch(error => console.log(error));

function createMarkupSwiper(arrSliders) {
  const swiperWrapperEl = document.querySelector('.swiper-wrapper');

  swiperWrapperEl.insertAdjacentHTML(
    'beforeend',
    arrSliders
      .map(
        ({ cook, topic }) =>
          `<div class="swiper-slide all-card" id="twist" style="width: 515px;">
                <div class="slider-images card">

                    <div class="image-container-1 first-collection-card">
										<img class="image-1 first-card" src="${cook.imgUrl}" alt="${cook.name}">
										</div>
                </div>
								<div class="slider-images card">
                    <div class="image-container-2 second-collection-card" >
                        <img class="image-2 second-card"src="${topic.previewUrl}" alt="${cook.name}">
                        <p class="image-title title-card">${topic.name}</p>
                      <p class="image-description description-card">${topic.area}</p>
                    </div>
								</div>
                <div class="slider-images card">
                    <div class="image-container-3 third-collection-card">
										<img class="image-3 third-card" src="${topic.imgUrl}" alt="${cook.name}">
										</div>
                </div>
                
          </div>`
      )

      .join('')
  );
}

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  speed: 800,

  pagination: {
    el: '.swiper-pagination',
    allowSlideNext: true,
    clickable: true,
    dynamicBullets: true,
  },
  autoplay: {
    delay: 1500,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
