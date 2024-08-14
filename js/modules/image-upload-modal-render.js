import { pristine } from './form-validation.js';
import { resetImageSize, scaleSmallerClick, scaleBiggerClick } from './image-resize.js';
import { applyEffect, effectSlider } from './image-effect-changer.js';
import { sendData } from './api.js';
import { isEscapeKeydown } from './functions.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MESSAGE_TIME = 5000;

const form = document.querySelector('.img-upload__form');
const imageUploadModal = form.querySelector('.img-upload__overlay');
const imageInput = form.querySelector('.img-upload__input');
const uploadPreview = form.querySelector('.img-upload__preview img');
const imageSubmitButton = form.querySelector('.img-upload__submit');
const imageFormHashtagInput = form.querySelector('.text__hashtags');
const imageFormDescriptionInput = form.querySelector('.text__description');
const imageUploadCloseButton = form.querySelector('.img-upload__cancel');
const scaleSmallerButton = form.querySelector('.scale__control--smaller');
const scaleBiggerButton = form.querySelector('.scale__control--bigger');
const filtersList = form.querySelector('.effects__list');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const submitErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const submitSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

const escapeKeydown = (evt) => {
  if (isEscapeKeydown(evt)) {
    const isErrorMessage = document.querySelector('.error');

    if (document.activeElement === imageFormHashtagInput || document.activeElement === imageFormDescriptionInput || isErrorMessage) {
      evt.stopPropagation();
    } else {
      imageUploadModalCloser();
    }
  }
};

const imageUploadCloseDown = () => {
  imageUploadModalCloser();
};

const filterListener = (evt) => {
  const target = evt.target.closest('.effects__radio');
  if (target) {
    applyEffect(target);
  }
};

const imageUploadModalOpener = () => {
  imageUploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escapeKeydown);
  imageUploadCloseButton.addEventListener('click', imageUploadCloseDown);

  scaleSmallerButton.addEventListener('click', scaleSmallerClick);
  scaleBiggerButton.addEventListener('click', scaleBiggerClick);
  filtersList.addEventListener('click', filterListener);
};

function imageUploadModalCloser() {
  imageUploadModal.classList.add('hidden');
  sliderContainer.classList.add('visually-hidden');
  document.body.classList.remove('modal-open');

  pristine.reset();
  form.reset();
  effectSlider.reset();
  resetImageSize();
  uploadPreview.style.filter = '';

  document.removeEventListener('keydown', escapeKeydown);
  imageUploadCloseButton.removeEventListener('click', imageUploadCloseDown);

  scaleSmallerButton.removeEventListener('click', scaleSmallerClick);
  scaleBiggerButton.removeEventListener('click', scaleBiggerClick);
  filtersList.removeEventListener('click', filterListener);
}

imageInput.addEventListener('change', () => {
  imageUploadModalOpener();

  const file = imageInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const effectsPreviews = filtersList.querySelectorAll('.effects__preview');

  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);

    effectsPreviews.forEach((item) => {
      item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
});

const showSubmitError = () => {
  const submitError = submitErrorTemplate.cloneNode(true);
  const submitErrorButton = submitError.querySelector('.error__button');
  document.body.appendChild(submitError);

  submitErrorButton.addEventListener('click', () => {
    submitError.remove();
  });

  function errorEscapeKeydown(evt) {
    if (isEscapeKeydown(evt)) {
      submitError.remove();
    }
  }

  function mouseButtonDown(evt) {
    if (evt.target === submitError) {
      submitError.remove();
    }
  }

  document.addEventListener('keydown', errorEscapeKeydown);
  document.addEventListener('click', mouseButtonDown);

  setTimeout(() => {
    document.removeEventListener('keydown', errorEscapeKeydown);
    document.removeEventListener('click', mouseButtonDown);
    submitError.remove();
  }, MESSAGE_TIME);
};

const showSubmitSuccess = () => {
  const submitSuccess = submitSuccessTemplate.cloneNode(true);
  const submitSuccessButton = submitSuccess.querySelector('.success__button');
  document.body.appendChild(submitSuccess);

  submitSuccessButton.addEventListener('click', () => {
    submitSuccess.remove();
  });

  const successEscapeKeydown = (evt) => {
    if (isEscapeKeydown(evt)) {
      submitSuccess.remove();
    }
  };

  const mouseButtonDown = (evt) => {
    if (evt.target === submitSuccess) {
      submitSuccess.remove();
    }
  };

  document.addEventListener('keydown', successEscapeKeydown);
  document.addEventListener('click', mouseButtonDown);

  setTimeout(() => {
    document.removeEventListener('keydown', successEscapeKeydown);
    document.removeEventListener('click', mouseButtonDown);
    submitSuccess.remove();
  }, MESSAGE_TIME);
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(evt.target);

    imageSubmitButton.disabled = true;

    sendData(formData)
      .then((responce) => {
        if (!responce.ok) {
          showSubmitError();
        } else {
          imageUploadModalCloser();
          showSubmitSuccess();
        }
      })
      .catch(showSubmitError)
      .finally(() => {
        imageSubmitButton.disabled = false;
      });
  }
});
