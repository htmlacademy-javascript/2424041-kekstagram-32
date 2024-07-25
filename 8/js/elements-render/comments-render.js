const commentTemplateItem = document.querySelector('#comment').content.querySelector('.social__comment');

function commentsListRender(arr, container) {
  container.replaceChildren();

  const commentsFragment = document.createDocumentFragment();

  arr.forEach((item) => {
    const commentsItem = commentTemplateItem.cloneNode(true);

    commentsItem.querySelector('.social__picture').src = item.avatar;
    commentsItem.querySelector('.social__picture').alt = item.name;
    commentsItem.querySelector('.social__text').textContent = item.message;

    commentsFragment.appendChild(commentsItem);
  });

  container.appendChild(commentsFragment);
}

export { commentsListRender };
