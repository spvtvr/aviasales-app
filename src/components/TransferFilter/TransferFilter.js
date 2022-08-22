import { useSelector, useDispatch } from 'react-redux';

import { toggleFilter } from '../../store/ticketSlice';

import classes from './TransferFilter.module.scss';

const TransferFilter = () => {
  const filters = useSelector((state) => state.tickets.filters);
  const dispatch = useDispatch();
  const toggleItem = (id) => dispatch(toggleFilter({ id }));
  return (
    <aside className={classes['app-aside']}>
      <span className={'app-aside-text'}>Количество пересадок</span>
      {filters.map((item) => {
        return (
          <label key={item.id}>
            <input
              type="checkbox"
              className={classes.checkbox}
              checked={item.isChecked}
              onChange={() => toggleItem(item.id)}
            />
            <span className={classes['custom-checkbox']}></span>
            {item.label}
          </label>
        );
      })}
    </aside>
  );
};

export default TransferFilter;
