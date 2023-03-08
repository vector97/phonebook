import * as element from './createElements.js';

export const renderPhonebook = (app, title) => {
  const header = element.createHeader();
  const logo = element.createLogo(title);
  const main = element.createMain();
  const buttonGroup = element.createButtonsGroup([
    {
      className: 'btn btn-primary mr-3 js-add',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = element.createTable();
  const { form, overlay } = element.createForm();
  const footer = element.createFooter();
  const rights = element.createRights(title);

  header.headerContainer.append(logo);
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
  footer.footerContainer.append(rights);
  app.append(header, main, footer);

  return {
    list: table.tbody,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    overlay,
    form,
  };
};

export const renderContacts = (elem, data) => {
  const allRow = data.map(element.createRow);
  elem.append(...allRow);

  return allRow;
};
