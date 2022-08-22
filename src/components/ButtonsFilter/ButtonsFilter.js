import { useSelector, useDispatch } from 'react-redux';

import { toggleButton } from '../../store/ticketSlice';

import classes from './ButtonsFilter.module.scss';

const ButtonsFilter = () => {
  const { buttons } = useSelector((store) => store.tickets);
  const dispatch = useDispatch();
  return (
    <div className={classes['results-buttons']}>
      {buttons.map((button) => {
        return (
          <button
            key={button.id}
            aria-label={button.label}
            className={classes['results-buttons-item']}
            onClick={() => dispatch(toggleButton(button.id))}
            style={button.isChecked ? { backgroundColor: '#2196F3', color: '#fff' } : null}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonsFilter;
