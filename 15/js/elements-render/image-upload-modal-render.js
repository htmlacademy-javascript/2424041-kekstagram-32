import { pristine } from '../functions/form-validation.js';
import { resetImageSize, scaleSmallerClick, scaleBiggerClick } from '../functions/image-resize.js';
import { applyEffect, effectSlider } from '../functions/image-effect-changer.js';
import { sendData } from '../api.js';

const form = document.querySelector('.img-upload__form');
const imageUploadModal = document.querySelector('.img-upload__overlay');
const imageInput = document.querySelector('.img-upload__input');
const previewImage = document.querySelector('.img-upload__preview img');
const imageSubmitButton = document.querySelector('.img-upload__submit');
const imageFormHashtagInput = document.querySelector('.text__hashtags');
const imageFormDescriptionInput = document.querySelector('.text__description');
const imageUploadCloseButton = document.querySelector('.img-upload__cancel');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const filtersList = document.querySelector('.effects__list');
const submitErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const submitSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

function escapeKeydown(evt) {
  if (evt.key === 'Escape') {
    if (document.activeElement === imageFormHashtagInput || document.activeElement === imageFormDescriptionInput) {
      evt.stopPropagation();
    } else {
      imageUploadModalCloser();
    }
  }
}

function imageUploadCloseDown() {
  imageUploadModalCloser();
}

function filterListener(evt) {
  const target = evt.target.closest('.effects__radio');
  if (target) {
    applyEffect(target);
  }
}

function imageUploadModalOpener() {
  imageUploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escapeKeydown);
  imageUploadCloseButton.addEventListener('click', imageUploadCloseDown);

  scaleSmallerButton.addEventListener('click', scaleSmallerClick);
  scaleBiggerButton.addEventListener('click', scaleBiggerClick);
  filtersList.addEventListener('click', filterListener);
}

function imageUploadModalCloser() {
  imageUploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.reset();
  form.reset();
  effectSlider.reset();
  resetImageSize();

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

  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }
});

function showSubmitError() {
  const submitError = submitErrorTemplate.cloneNode(true);
  const submitErrorButton = submitError.querySelector('.error__button');
  document.body.appendChild(submitError);

  submitErrorButton.addEventListener('click', () => {
    submitError.remove();
  });

  function errorEscapeKeydown(evt) {
    if (evt.key === 'Escape') {
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
  }, 5000);
}

function showSubmitSuccess() {
  const submitSuccess = submitSuccessTemplate.cloneNode(true);
  const submitSuccessButton = submitSuccess.querySelector('.success__button');
  document.body.appendChild(submitSuccess);

  submitSuccessButton.addEventListener('click', () => {
    submitSuccess.remove();
  });

  function successEscapeKeydown(evt) {
    if (evt.key === 'Escape') {
      submitSuccess.remove();
    }
  }

  function mouseButtonDown(evt) {
    if (evt.target === submitSuccess) {
      submitSuccess.remove();
    }
  }

  document.addEventListener('keydown', successEscapeKeydown);
  document.addEventListener('click', mouseButtonDown);

  setTimeout(() => {
    document.removeEventListener('keydown', successEscapeKeydown);
    document.removeEventListener('click', mouseButtonDown);
    submitSuccess.remove();
  }, 5000);
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(evt.target);

    imageSubmitButton.disabled = true;

    sendData(formData)
      .then(() => {
        imageUploadModalCloser();
      })
      .catch(() => {
        showSubmitError();
      })
      .finally(() => {
        imageSubmitButton.disabled = false;
        showSubmitSuccess();
      });
  }
});
