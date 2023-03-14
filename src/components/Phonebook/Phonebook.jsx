import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ContactsBlock from 'components/ContactsBlock/ContactsBlock';
import PhoneBookList from 'components/PhonebookList/PhoneBookList';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

import {
  fetchContacts,
  deleteContacts,
  addContacts,
} from 'redux/contacts/contacts-operations';
// import { getContacts } from 'redux/contacts/contacts-selectors';
// import { getContacts } from 'redux/contacts/contacts-selectors';
// import { addContacts, deleteContacts } from 'redux/contacts/contacts-slice';

import { getAllContacts } from 'redux/contacts/contacts-selectors';

import { setFilter } from 'redux/filter/filter-slice';
import { getFilter } from 'redux/filter/filter-selectors';

import css from '../Phonebook/Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);
  console.log(contacts);
  console.log(filter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const onAddContact = data => {
    dispatch(addContacts(data));
  };

  const onDelete = id => {
    dispatch(deleteContacts(id));
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalazedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalazedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Phonebook</h2>
      <div className={css.block}>
        <ContactsBlock title="Phonebook" />
        <PhonebookForm onSubmit={onAddContact} />
        <ContactsBlock title="Contacts">
          <input
            onChange={handleFilterChange}
            value={filter}
            className={css.input}
            placeholder="Find contact"
          />

          <PhoneBookList items={filteredContacts} onDelete={onDelete} />
        </ContactsBlock>
      </div>
    </div>
  );
};

export default Phonebook;
