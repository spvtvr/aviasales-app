import classes from "../App/App.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleButton } from "../store/ticketSlice";

const ButtonsFilter = () => {
  const { buttons } = useSelector((store) => store.tickets);
  const dispatch = useDispatch();
  return (
    <div className={classes["results-buttons"]}>
      {buttons.map((button) => {
        return (
          <button
            key={button.id}
            className={classes["results-buttons-item"]}
            onClick={() => dispatch(toggleButton(button.id))}
            style={
              button.isChecked
                ? { backgroundColor: "#2196F3", color: "#fff" }
                : null
            }
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonsFilter;
