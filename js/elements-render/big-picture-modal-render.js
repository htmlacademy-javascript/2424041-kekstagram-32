const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureModal.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const bigPictureTotalCommentsCount = bigPictureModal.querySelector('.social__comment-total-count');
const bigPictureCommentsList = document.querySelector('.social__comments');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');
const commentTemplateItem = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPictureCommentsShownCount = document.querySelector('.social__comment-shown-count');

const PART_OF_COMMENTS = 5;
let comments = [];
let renderedComments = 0;

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

function loadCommentsListener(evt) {
  if (evt.target === bigPictureCommentsLoader) {
    commentsPartRender(comments);
  }
}

function bigPictureModalOpener() {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escapeKeydown);
  document.addEventListener('click', mouseButtonDown);
  bigPictureCommentsLoader.addEventListener('click', loadCommentsListener);
  bigPictureCloseButton.addEventListener('click', bigPictureCloseButtonDown);
}

function bigPictureModalCloser() {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', escapeKeydown);
  document.removeEventListener('click', mouseButtonDown);
  bigPictureCommentsLoader.removeEventListener('click', loadCommentsListener);
  bigPictureCloseButton.removeEventListener('click', bigPictureCloseButtonDown);

  if (bigPictureCommentsLoader.classList.contains('hidden')) {
    bigPictureCommentsLoader.classList.remove('hidden');
  }

  comments = [];
  renderedComments = 0;
}

function commentRender(comment) {
  const commentsItem = commentTemplateItem.cloneNode(true);

  commentsItem.querySelector('.social__picture').src = comment.avatar;
  commentsItem.querySelector('.social__picture').alt = comment.name;
  commentsItem.querySelector('.social__text').textContent = comment.message;

  return commentsItem;
}

function commentsPartRender(commentsArray) {
  if(commentsArray) {
    comments = commentsArray;
  }

  let commentsToRenderCount = Math.min(renderedComments + PART_OF_COMMENTS, comments.length);

  if (commentsToRenderCount >= comments.length) {
    commentsToRenderCount = comments.length;
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = renderedComments; i < commentsToRenderCount; i++) {
    const comment = commentRender(comments[i]);
    commentsFragment.appendChild(comment);
  }

  bigPictureCommentsList.appendChild(commentsFragment);

  renderedComments = commentsToRenderCount;

  if (commentsToRenderCount >= comments.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  } else {
    bigPictureCommentsLoader.classList.remove('hidden');
  }

  bigPictureCommentsShownCount.textContent = renderedComments;
}

function bigPictureModalRender(item) {
  bigPictureImg.src = item.url;
  bigPictureLikes.textContent = item.likes;
  bigPictureDescription.textContent = item.description;
  bigPictureTotalCommentsCount.textContent = item.comments.length;

  bigPictureModalOpener();

  bigPictureCommentsList.replaceChildren();

  commentsPartRender(item.comments);
}

export { bigPictureModalRender };
