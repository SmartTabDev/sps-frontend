import { Persistor } from 'redux-persist';
import store from './store';

class StoreRegistry {
  private store = store.configureStore();

  private storePersistor: any;

  getStore() {
    if ((window as any).Cypress) {
      (window as any).store = this.store;
    }

    if (process.env.NODE_ENV === 'development' && module.hot) {
      module.hot.accept('./reducers/rootReducer', () => {
        // eslint-disable-next-line
        const newRootReducer = require('./reducers/rootReducer').default;
        this.store.replaceReducer(newRootReducer);
      });
    }
    return this.store;
  }

  registerStorePersistor(persistor: Persistor) {
    this.storePersistor = persistor;
  }

  getStorePersistor() {
    return this.storePersistor;
  }
}

export default new StoreRegistry();
