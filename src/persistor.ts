import { persistStore } from 'redux-persist';
import { Store } from 'redux';

const createPersistor = (store: Store) => persistStore(store);

export default createPersistor;
