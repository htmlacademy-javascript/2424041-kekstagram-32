import { formValidation, pristine } from '../helpers/form-validation.js';

const form = document.querySelector('.img-upload__form');

const imageUploadModal = document.querySelector('.img-upload__overlay');
const imageInput = document.querySelector('.img-upload__input');
const imageEffectLevelInput = document.querySelector('.effect-level__value');
const imageFormHashtagInput = document.querySelector('.text__hashtags');
const imageFormDescriptionInput = document.querySelector('.text__description');
const imageUploadCloseButton = document.querySelector('.img-upload__cancel');

function escapeKeydown(evt) {
  if (evt.key === 'Escape') {
    if (document.activeElement === imageFormHashtagInput || document.activeElement === imageFormDescriptionInput) {
      evt.stopPropagation();
    } else {
      imageUploadModalCloser();
    }
  }
}

function mouseButtonDown(evt) {
  if (evt.target === imageUploadModal) {
    imageUploadModalCloser();
  }
}

function imageUploadCloseDown() {
  imageUploadModalCloser();
}

function imageUploadModalOpener() {
  imageUploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escapeKeydown);
  document.addEventListener('click', mouseButtonDown);
  imageUploadCloseButton.addEventListener('click', imageUploadCloseDown);

  form.addEventListener('submit', (evt) => {
    formValidation(evt);
  });
}

function imageUploadModalCloser() {
  imageUploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.reset();

  imageInput.value = '';
  imageEffectLevelInput.value = '';
  imageFormHashtagInput.value = '';
  imageFormDescriptionInput.value = '';

  document.removeEventListener('keydown', escapeKeydown);
  document.removeEventListener('click', mouseButtonDown);
  imageUploadCloseButton.removeEventListener('click', imageUploadCloseDown);

  form.removeEventListener('submit', (evt) => {
    formValidation(evt);
  });
}

imageInput.addEventListener('change', () => {
  imageUploadModalOpener();
});
