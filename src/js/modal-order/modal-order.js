const modalOrder = () => {
  const openModalButtons = document.querySelectorAll('.order-open-btn');
  const closeModalButton = document.querySelector('.order-close');
  const modalContainer = document.querySelector('.backdrop-order');

  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      modalContainer.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  closeModalButton.addEventListener('click', () => {
    modalContainer.classList.add('is-hidden');
    document.body.style.overflow = '';
  });

  modalContainer.addEventListener('click', event => {
    if (event.target === modalContainer) {
      modalContainer.classList.add('is-hidden');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      modalContainer.classList.add('is-hidden');
      document.body.style.overflow = '';
    }
  });
};

modalOrder();
