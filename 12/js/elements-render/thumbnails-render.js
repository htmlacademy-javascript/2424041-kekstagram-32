const pictureTemplateItem = document.querySelector('#picture').content.querySelector('.picture');

function thumbnailsRender(arr, container) {
  const thumbnailsFragment = document.createDocumentFragment();

  arr.forEach((postItem) => {
    const pictureItem = pictureTemplateItem.cloneNode(true);

    pictureItem.querySelector('.picture__img').src = postItem.url;
    pictureItem.querySelector('.picture__img').alt = postItem.description;
    pictureItem.querySelector('.picture__comments').innerText = postItem.comments.length;
    pictureItem.querySelector('.picture__likes').innerText = postItem.likes;
    pictureItem.setAttribute('data-id', postItem.id);

    thumbnailsFragment.appendChild(pictureItem);
  });

  container.appendChild(thumbnailsFragment);
}

export { thumbnailsRender };
