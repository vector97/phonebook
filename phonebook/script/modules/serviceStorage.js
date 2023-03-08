// получение контактов из хранилища
export const getStorage = (contacts) =>
  JSON.parse(localStorage.getItem(contacts)) || [];

// запись новых контактов в хранилище
export const setStorage = (contacts, newContact) => {
  const allContacts = getStorage(contacts);
  allContacts.push(newContact);
  localStorage.setItem(contacts, JSON.stringify(allContacts));
};

// удаление контакта из хранилища по заданному номеру
export const removeStorage = (contacts, deletedContactNumber) => {
  let allContacts = getStorage(contacts);
  allContacts = allContacts.filter(contact =>
    contact.phone !== deletedContactNumber);
  localStorage.setItem(contacts, JSON.stringify(allContacts));
};
