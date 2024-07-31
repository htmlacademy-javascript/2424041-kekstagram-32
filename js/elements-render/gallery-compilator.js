import { createPostsList } from '../data-generator/posts-generator.js';
import { thumbnailsRender } from './thumbnails-render.js';
import { bigPictureModalRender } from './big-picture-modal-render.js';

const picturesContainer = document.querySelector('.pictures');

function galleryCompilator() {
  const postsList = createPostsList();

  thumbnailsRender(postsList, picturesContainer);

  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const pictureId = parseInt(evt.target.closest('.picture').getAttribute('data-id'), 10);

      for (let i = 0; i < postsList.length; i++) {
        if (pictureId === postsList[i].id) {
          return bigPictureModalRender(postsList[i]);
        }
      }
    }
  });
}

export { galleryCompilator };
