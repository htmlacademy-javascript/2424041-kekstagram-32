const commentTemplateItem = document.querySelector('#comment').content.querySelector('.social__comment');

const bigPictureCommentsShownCount = document.querySelector('.social__comment-shown-count');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');

const PART_OF_COMMENTS = 5;
let commentsToRenderCount = 0;
let isChildrenReplaced = false;

function commentRender(comment) {
  const commentsItem = commentTemplateItem.cloneNode(true);

  commentsItem.querySelector('.social__picture').src = comment.avatar;
  commentsItem.querySelector('.social__picture').alt = comment.name;
  commentsItem.querySelector('.social__text').textContent = comment.message;

  return commentsItem;
}

function commentsPartRender(commentsArray, container) {
  const renderedComments = Math.min(commentsToRenderCount + PART_OF_COMMENTS, commentsArray.length);

  if (!isChildrenReplaced) {
    container.replaceChildren();
    isChildrenReplaced = true;
  }

  if (commentsToRenderCount >= commentsArray.length) {
    commentsToRenderCount = commentsArray.length;
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = commentsToRenderCount; i < renderedComments; i++) {
    const comment = commentRender(commentsArray[i]);
    commentsFragment.appendChild(comment);
  }

  container.appendChild(commentsFragment);

  commentsToRenderCount = renderedComments;

  if (commentsToRenderCount >= commentsArray.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  } else {
    bigPictureCommentsLoader.classList.remove('hidden');
  }

  bigPictureCommentsShownCount.textContent = commentsToRenderCount;
}

function resetCommentsVariables() {
  commentsToRenderCount = 0;
  isChildrenReplaced = false;
}

export { commentsPartRender, resetCommentsVariables };
