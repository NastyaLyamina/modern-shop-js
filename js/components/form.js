const showMessage = (text) => {
  const modal = document.querySelector('#modal-status');
  if (!modal) return;

  const modalText = modal.querySelector('.modal__text');
  const closeBtn = modal.querySelector('.modal__close');

  modalText.textContent = text;
  modal.classList.add('modal--active');

  const closeModal = () => modal.classList.remove('modal--active');
  
  if (closeBtn) closeBtn.onclick = closeModal;
  
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
};

export const initFormValidation = () => {
  const formElement = document.querySelector('.questions__form');
  
  if (!formElement) return;

  // JustValidate
  const validation = new window.JustValidate('.questions__form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше имя'
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимальная длина 3 символа'
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимальная длина 20 символов'
      }
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите вашу почту'
      },
      {
        rule: 'email',
        errorMessage: 'Некорректный формат email'
      }
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Подтвердите согласие'
      }
    ])
    .onSuccess(async (event) => {
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          showMessage('Благодарим за обращение!');
          form.reset();
        } else {
          throw new Error('Ошибка сервера');
        }
      } catch (error) {
        showMessage('Не удалось отправить обращение.');
        console.error(error);
      }
    });
};