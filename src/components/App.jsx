import { Provider } from 'react-redux';

import Phonebook from './Phonebook/Phonebook';

import { store } from 'redux/store';

export const App = () => {
  return (
    <Provider store={store}>
      <Phonebook />
    </Provider>
  );
};
