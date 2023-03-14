import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://64104f23864814e5b64d91f8.mockapi.io/contacts',
});

export const getAllContacts = () => contactsInstance.get('/');

export const deleteContacts = id => {
  return contactsInstance.delete(`/${id}`);
};

export const addContacts = data => {
  return contactsInstance.post('/', data);
};
