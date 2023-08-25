const modalOrder = () => {
  const openModalButtons = document.querySelectorAll('.order-open-btn');
  const closeModalButton = document.querySelector('.order-close');
  const modalContainer = document.querySelector('.backdrop-order');
  const nameInput = document.querySelector('#name');
  const phoneInput = document.querySelector('#phone');
  const emailInput = document.querySelector('#email');
  const submitButton = document.querySelector('.submit-btn');

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

  nameInput.addEventListener('input', validateForm);
  phoneInput.addEventListener('input', validateForm);
  emailInput.addEventListener('input', validateForm);

  function validateForm() {
    if (nameInput.value.trim() !== '' && phoneInput.value.trim() !== '' && emailInput.checkValidity()) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
  }
};

modalOrder();