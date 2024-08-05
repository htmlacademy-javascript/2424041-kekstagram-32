const commentTemplateItem = document.querySelector('#comment').content.querySelector('.social__comment');

const bigPictureCommentsShownCount = document.querySelector('.social__comment-shown-count');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');

const PART_OF_COMMENTS = 5;
let renderedComments = 0;

function commentRender(comment) {
  const commentsItem = commentTemplateItem.cloneNode(true);

  commentsItem.querySelector('.social__picture').src = comment.avatar;
  commentsItem.querySelector('.social__picture').alt = comment.name;
  commentsItem.querySelector('.social__text').textContent = comment.message;

  return commentsItem;
}

function commentsPartRender(commentsArray, container) {
  let commentsToRenderCount = Math.min(renderedComments + PART_OF_COMMENTS, commentsArray.length);

  if (commentsToRenderCount >= commentsArray.length) {
    commentsToRenderCount = commentsArray.length;
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = renderedComments; i < commentsToRenderCount; i++) {
    const comment = commentRender(commentsArray[i]);
    commentsFragment.appendChild(comment);
  }

  container.appendChild(commentsFragment);

  renderedComments = commentsToRenderCount;

  if (commentsToRenderCount >= commentsArray.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  } else {
    bigPictureCommentsLoader.classList.remove('hidden');
  }

  bigPictureCommentsShownCount.textContent = renderedComments;
}

function resetCommentsVariables() {
  renderedComments = 0;
}

export { commentsPartRender, resetCommentsVariables };