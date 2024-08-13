const pictureTemplateItem = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const thumbnailsRender = (postsArray) => {
  const oldPosts = picturesContainer.querySelectorAll('.picture');

  oldPosts.forEach((post) => {
    picturesContainer.removeChild(post);
  });

  const postsToRender = postsArray;

  const thumbnailsFragment = document.createDocumentFragment();

  postsToRender.forEach((postItem) => {
    const pictureItem = pictureTemplateItem.cloneNode(true);

    pictureItem.querySelector('.picture__img').src = postItem.url;
    pictureItem.querySelector('.picture__img').alt = postItem.description;
    pictureItem.querySelector('.picture__comments').innerText = postItem.comments.length;
    pictureItem.querySelector('.picture__likes').innerText = postItem.likes;
    pictureItem.setAttribute('data-id', postItem.id);

    thumbnailsFragment.appendChild(pictureItem);
  });

  picturesContainer.appendChild(thumbnailsFragment);
};

export { thumbnailsRender };
