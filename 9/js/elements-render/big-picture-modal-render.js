import { commentsPartRender, resetCommentsVariables } from './comments-render.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureModal.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const bigPictureTotalCommentsCount = bigPictureModal.querySelector('.social__comment-total-count');
const bigPictureCommentsList = document.querySelector('.social__comments');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');

function escapeKeydown(evt) {
  if (evt.key === 'Escape') {
    bigPictureModalCloser();
  }
}

function mouseButtonDown(evt) {
  if (evt.target === bigPictureModal) {
    bigPictureModalCloser();
  }
}

function bigPictureCloseButtonDown(evt) {
  if (evt.target === bigPictureCloseButton) {
    bigPictureModalCloser();
  }
}

function bigPictureModalOpener() {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escapeKeydown);
  document.addEventListener('click', mouseButtonDown);
  bigPictureCloseButton.addEventListener('click', bigPictureCloseButtonDown);
}

function bigPictureModalCloser() {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', escapeKeydown);
  document.removeEventListener('click', mouseButtonDown);
  bigPictureCloseButton.removeEventListener('click', bigPictureCloseButtonDown);

  if (bigPictureCommentsLoader.classList.contains('hidden')) {
    bigPictureCommentsLoader.classList.remove('hidden');
  }

  resetCommentsVariables();
}

function bigPictureModalRender(item) {
  bigPictureImg.src = item.url;
  bigPictureLikes.textContent = item.likes;
  bigPictureDescription.textContent = item.description;
  bigPictureTotalCommentsCount.textContent = item.comments.length;

  bigPictureModalOpener();

  bigPictureCommentsList.replaceChildren();

  commentsPartRender(item.comments, bigPictureCommentsList);

  bigPictureCommentsLoader.addEventListener('click', () => commentsPartRender(item.comments, bigPictureCommentsList));
}

export { bigPictureModalRender };
