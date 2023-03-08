import { createRow } from './createElements.js';

import {
  setStorage,
  removeStorage,
} from './serviceStorage.js';

export const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });

    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

export const modalControl = (btnAdd, overlay) => {
  const openModal = () => {
    overlay.classList.add('is-visible');
  };

  const closeModal = () => {
    overlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  overlay.addEventListener('click', e => {
    const target = e.target;

    if (
      target === overlay ||
      target.closest('.close')
    ) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.del-icon')) {
      const deletedContact = target.closest('.contact');
      const contactNumber = deletedContact.querySelector('[data-phone]').innerText;
      deletedContact.remove();
      removeStorage('contacts', contactNumber);
    }
  });
};

export const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

export const addContactData = (contact) => {
  setStorage('contacts', contact);
};

export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    addContactData(newContact);
    form.reset();
    closeModal();
  });
};
