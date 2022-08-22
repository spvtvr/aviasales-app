import React from 'react';
import { Provider } from 'react-redux';

import store from '../../store';
import logo from '../../assets/img/logo.svg';
import { TransferFilter } from '../TransferFilter';
import { ButtonsFilter } from '../ButtonsFilter';
import { Tickets } from '../Tickets';

import classes from './App.module.scss';

const App = () => {
  return (
    <Provider store={store}>
      <main className={classes.app}>
        <div className={classes['app-wrapper']}>
          <img className={classes['app-logo']} src={logo} alt="Aviasales Logo"></img>
          <section className={classes['app-main']}>
            <TransferFilter />
            <div className={classes['app-results']}>
              <ButtonsFilter />
              <Tickets />
            </div>
          </section>
        </div>
      </main>
    </Provider>
  );
};

export default App;
