import { isEscapeKeydown, isClickTargetTrue } from '../helpers/user-events-checker.js';
import { commentsListRender } from './comments-render.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureModal.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const bigPictureTotalCommentsCount = bigPictureModal.querySelector('.social__comment-total-count');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');
const bigPictureCommentsList = document.querySelector('.social__comments');

function escapeKeydown (evt) {
  if (isEscapeKeydown(evt)) {
    bigPictureModalCloser();
  }
}

function mouseButtonDown (evt) {
  if (isClickTargetTrue(evt, bigPictureModal)) {
    bigPictureModalCloser();
  }
}

function bigPictureCloseButtonDown (evt) {
  if (isClickTargetTrue(evt, bigPictureCloseButton)) {
    bigPictureModalCloser();
  }
}

function bigPictureModalOpener () {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');

  document.addEventListener('keydown', escapeKeydown);
  document.addEventListener('click', mouseButtonDown);
  bigPictureCloseButton.addEventListener('click', bigPictureCloseButtonDown);
}

function bigPictureModalCloser () {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  bigPictureCommentsCount.classList.remove('hidden');
  bigPictureCommentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', escapeKeydown);
  document.removeEventListener('click', mouseButtonDown);
  bigPictureCloseButton.removeEventListener('click', bigPictureCloseButtonDown);
}

function bigPictureModalRender(item) {
  bigPictureImg.src = item.url;
  bigPictureLikes.textContent = item.likes;
  bigPictureDescription.textContent = item.description;

  bigPictureTotalCommentsCount.textContent = item.comments.length;

  commentsListRender(item.comments, bigPictureCommentsList);

  bigPictureModalOpener();
}

export { bigPictureModalRender };
