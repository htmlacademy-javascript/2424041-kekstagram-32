import { formValidation, pristine } from '../helpers/form-validation.js';
import { resetImageSize, scaleSmallerClick, scaleBiggerClick } from '../helpers/image-resize.js';
import { applyEffect, effectSlider } from '../helpers/image-filter.js';

const form = document.querySelector('.img-upload__form');
const imageUploadModal = document.querySelector('.img-upload__overlay');
const imageInput = document.querySelector('.img-upload__input');
const imageFormHashtagInput = document.querySelector('.text__hashtags');
const imageFormDescriptionInput = document.querySelector('.text__description');
const imageUploadCloseButton = document.querySelector('.img-upload__cancel');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const filtersList = document.querySelector('.effects__list');

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

function formSubmitListener(evt) {
  formValidation(evt);
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

  form.addEventListener('submit', formSubmitListener);
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

  form.removeEventListener('submit', formSubmitListener);
}

imageInput.addEventListener('change', () => {
  imageUploadModalOpener();
});
