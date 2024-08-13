import { filterGallery } from './filter-gallery.js';
import { bigPictureModalRender } from './big-picture-modal-render.js';

const picturesContainer = document.querySelector('.pictures');

const galleryRender = (postsArray) => {
  filterGallery(postsArray);

  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      const pictureId = parseInt(evt.target.closest('.picture').getAttribute('data-id'), 10);

      const postToRender = postsArray.find((item) => item.id === pictureId);

      if (postToRender) {
        evt.preventDefault();
        bigPictureModalRender(postToRender);
      }
    }
  });
};

export { galleryRender };
