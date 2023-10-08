import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { svgSpinner } from "./svg.js";
import { createContactItemByType, formatDate, formatTime, createContactLink } from "./utils.js";

export const createClientItem = (data) => {
    const clientTr = document.createElement('tr');
    const clientIdTd = document.createElement('td');
    const clientId = document.createElement('span');
    const clientFullName = document.createElement('td');
    const clientName = document.createElement('span');
    const clientSurname = document.createElement('span');
    const clientLastName = document.createElement('span');
    const clientCreated = document.createElement('td');
    const createDate = document.createElement('span');
    const createdTime = document.createElement('span');
    const clientChanged = document.createElement('td');
    const changedDate = document.createElement('span');
    const changedTime = document.createElement('span');
    const clientContacts = document.createElement('td');
    const clientActions = document.createElement('td');
    const clientEdit = document.createElement('button');
    const clientDelete = document.createElement('button');
    const deleteClient = deleteClientModal();
    const editClient = editClientModal(data);
    const editSpinner = document.createElement('span');
    const deleteSpinner = document.createElement('span');
    

    editSpinner.classList.add('actions__spinner');
    deleteSpinner.classList.add('actions__spinner');
    clientTr.classList.add('clients__item');
    clientTr.id = data.id;
    clientIdTd.classList.add('client__id');
    clientFullName.classList.add('clients__full-name');
    clientName.classList.add('clients__name');
    clientSurname.classList.add('clients__surname');
    clientLastName.classList.add('clients__lastname');
    clientCreated.classList.add('clients__created');
    createDate.classList.add('created__date');
    createdTime.classList.add('created__time');
    clientChanged.classList.add('clients__changed');
    changedDate.classList.add('changed__date');
    changedTime.classList.add('changed__time');
    clientContacts.classList.add('clients__contacts');
    clientActions.classList.add('clients__actions');
    clientContacts.classList.add('clients__contacts');
    clientDelete.classList.add('clients__delete', 'btn-reset');
    clientEdit.classList.add('clients__edit', 'btn-reset');
    
    let hidden = 5
    for (const index in data.contacts) {
        let contact = data.contacts[index];
        let hiddenClass = index > hidden - 1;
        createContactItemByType(contact.type, contact.value, clientContacts, hiddenClass);
    }
    if (data.contacts.length > hidden) {
        const createdBtnContact = document.createElement('button');
        createdBtnContact.classList.add('contacts__link','contacts__btn-close');
        createdBtnContact.textContent = `+${data.contacts.length - hidden}`;
        

        createdBtnContact.addEventListener('click', () => {
            clientContacts.querySelectorAll('.contacts__link').forEach(el => el.classList.add('contacts__link__active'));
            createdBtnContact.style.display = 'none';
        })
        clientContacts.append(createdBtnContact);
    }
   

    const deleteById = () => {
        import('./clientsApi.js').then(({ deleteClientItem }) => {
            deleteClient.deleteModalDelete.addEventListener('click', () => {
                try {
                    deleteClient.deleteSpinner.style.display = 'block';
                    setTimeout(() => {
                        deleteClientItem(data.id);
                        document.getElementById(data.id).remove();
                        deleteClient.deleteModal.remove();
                    }, 1000);
                } catch (error) {
                    console.log(error);
                } finally {
                    setTimeout(() => deleteClient.deleteSpinner.style.display = 'none', 1000);
                }
            });
        });
    }

    clientDelete.addEventListener('click', () => {
        deleteSpinner.style.display = 'block';
        clientDelete.classList.add('action-wait');

      setTimeout(() => {
        deleteById();
        document.body.append(deleteClient.deleteModal);

        deleteSpinner.style.display = 'none';
        clientDelete.classList.remove('action-wait');
      }, 1000);
    });

    clientEdit.addEventListener('click', () => {
        editSpinner.style.display = 'block';
        clientEdit.classList.add('action-wait');

      setTimeout(() => {
        document.body.append(editClient.editModal);

        editSpinner.style.display = 'none';
        clientEdit.classList.remove('action-wait');
      }, 1000);
    });


    deleteSpinner.innerHTML = svgSpinner;
    editSpinner.innerHTML = svgSpinner;
    clientId.textContent = Math.floor(Math.random() * 15);
    clientName.textContent = data.name;
    clientSurname.textContent = data.surname;
    clientLastName.textContent = data.lastName;
    clientEdit.textContent = 'Изменить';
    clientDelete.textContent = 'Удалить';
    createDate.textContent = formatDate(data.createdAt);
    createdTime.textContent = formatTime(data.createdAt);
    changedDate.textContent = formatDate(data.updatedAt);
    changedTime.textContent = formatTime(data.updatedAt);

    clientIdTd.append(clientId);
    clientFullName.append(clientName, clientSurname, clientLastName);
    clientCreated.append(createDate, createdTime);
    clientChanged.append(changedDate, changedTime);
    clientDelete.append(deleteSpinner);
    clientEdit.append(editSpinner);
    clientActions.append(clientEdit, clientDelete);
    clientTr.append(
        clientIdTd,
        clientFullName,
        clientCreated,
        clientChanged,
        clientContacts,
        clientActions
    );

    return clientTr;
}
