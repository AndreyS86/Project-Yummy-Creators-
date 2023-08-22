import { galleryItems } from './gallery-items';

const openModar = document.querySelector('.icon-hear');
const closeModar = document.querySelector('.footer-modal-close');
const footerModal = document.querySelector('.footer-modal');
const footerFoto = document.querySelector('.footer-foto');

openModar.addEventListener('click', function(e) {
    e.preventDefault();
    footerModal.classList.add('active');
    footerFoto.insertAdjacentHTML('beforeend', itemsMarkup);
})
const itemsMarkup = makeGalleryItems(galleryItems);

function makeGalleryItems(items) {
    return items.map(({ preview, name, position }) => {
      return `
        <li class=footer-item>
            <div class="footer-foto-img">
                <img
                    class="footer-foto-image"
                    src="${preview}"
                    alt="${position}"
                    width="360"
                />
            </div>   
            <h2>${name}</h2> 
            <p>${position}</p>
        </li>
    `
    }).join('');
}

closeModar.addEventListener('click',() => {
    footerModal.classList.remove('active');
    footerFoto.innerHTML = '';
});

window.addEventListener('keydown', function(e) {
    if (e.code === 'Escape') {
        footerModal.classList.remove('active');
        footerFoto.innerHTML = '';
    }
});
window.addEventListener('click', function(e) {
    console.dir(e.target.className)
    if (e.target.className === 'footer-contaiter') {
        footerModal.classList.remove('active');
        footerFoto.innerHTML = '';
    }
});
