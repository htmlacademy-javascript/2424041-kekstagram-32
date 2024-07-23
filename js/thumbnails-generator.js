import { createPostsList } from './posts-generator.js';

const pictureTemplateItem = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const thumbnailsFragment = document.createDocumentFragment();
const thumbnailsItems = createPostsList();

const thumbnailsGenerator = function () {
  thumbnailsItems.forEach((postItem) => {
    const pictureItem = pictureTemplateItem.cloneNode(true);

    pictureItem.querySelector('.picture__img').src = postItem.url;
    pictureItem.querySelector('.picture__img').alt = postItem.description;
    pictureItem.querySelector('.picture__comments').innerText = postItem.comments.length;
    pictureItem.querySelector('.picture__likes').innerText = postItem.likes;

    thumbnailsFragment.appendChild(pictureItem);
  });

  picturesContainer.appendChild(thumbnailsFragment);
};

export { thumbnailsGenerator };
