export const getFilteredContacts = store => {
  console.log(store);
  const { filter, contacts } = store;
  if (!filter) {
    return contacts;
  }

  const normalazedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalazedFilter)
  );
};

export const getContacts = store => store.contacts;
