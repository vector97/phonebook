import {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} from './modules/control.js';

import render from './modules/render.js';

import { getStorage } from './modules/serviceStorage.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const allContacts = getStorage('contacts');
    const {
      list,
      logo,
      btnAdd,
      overlay,
      form,
      btnDel,
    } = render.renderPhonebook(app, title);

    //  функционал

    const allRow = render.renderContacts(list, allContacts);
    const { closeModal } = modalControl(btnAdd, overlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    const sortContacts = (field) => {
      return (a, b) => a[field] > b[field] ? 1 : -1;
    };

    // сортировка данных при загрузке
    const sortingData = (sortingType) => {
      localStorage.setItem('sortingType', sortingType);
      allContacts.sort(sortContacts(sortingType));
      list.querySelectorAll('.contact').forEach(contact => contact.remove());
      render.renderContacts(list, allContacts);
    };

    sortingData(localStorage.getItem('sortingType'));

    const headerTable = document.querySelector('thead');

    headerTable.addEventListener('click', e => {
      const target = e.target;

      if (target.dataset.header) {
        const sortingType = target.dataset.header;
        sortingData(sortingType);
      }
    });
  };

  window.phoneBookInit = init;
}
