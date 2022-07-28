import { useEffect } from "react";
import classes from "../App/App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, getId, setCountOnPage } from "../store/ticketSlice";
import { v4 } from "uuid";
import Loader from "../Loader";
import { format, differenceInHours, differenceInMinutes } from "date-fns";

const Tickets = () => {
  const dispatch = useDispatch();
  const { searchId, isStop, tickets, countOnPage } = useSelector(
    (state) => state.tickets
  );

  const checkedZero = useSelector(
    (state) => state.tickets.filters[1].isChecked
  );
  const checkedOne = useSelector((state) => state.tickets.filters[2].isChecked);
  const checkedTwo = useSelector((state) => state.tickets.filters[3].isChecked);
  const checkedThree = useSelector(
    (state) => state.tickets.filters[4].isChecked
  );

  useEffect(() => {
    dispatch(getId());
  }, [dispatch]);

  useEffect(() => {
    if (!searchId) return;
    let intervalId;
    if (isStop === false) {
      intervalId = setInterval(() => {
        dispatch(getTickets(searchId));
      }, 300);
      return () => clearInterval(intervalId);
    }
  });

  const flightTime = (date, duration) => {
    const departureTime = format(new Date(date), "HH:mm");
    const arrivalTime = format(
      new Date(date).setMinutes(new Date(date).getMinutes() + duration),
      "HH:mm"
    );
    return `${departureTime} - ${arrivalTime}`;
  };

  const inAirTime = (date, duration) => {
    const departureTime = new Date(date);
    const arrivalTime = new Date(date).setMinutes(
      new Date(date).getMinutes() + duration
    );
    const hoursDiff = differenceInHours(new Date(arrivalTime), departureTime);
    const minDiff = differenceInMinutes(new Date(arrivalTime), departureTime);
    return `${hoursDiff}ч ${minDiff - hoursDiff * 60}м`;
  };

  const transferText = (num) => {
    if (num === 1) return `${num} пересадка`;
    if (num > 1 && num < 5) return `${num} пересадки`;
    return `${num} пересадок`;
  };

  const getFirstTickets = tickets.filter((elem) => {
    const stopsLength =
      elem.segments[0].stops.length || elem.segments[1].stops.length;
    return (
      stopsLength === (checkedZero && 0) ||
      stopsLength === (checkedOne && 1) ||
      stopsLength === (checkedTwo && 2) ||
      stopsLength === (checkedThree && 3)
    );
  });

  const handleOnPage = () => dispatch(setCountOnPage());
  const loader = !isStop ? <Loader /> : null;

  return (
    <>
      {loader}
      {getFirstTickets.slice(0, countOnPage).map((elem) => (
        <div className={classes["results-cards"]} key={v4()}>
          <div className={classes.card}>
            <div className={classes["card-price-logo"]}>
              <span className={classes["card-price"]}>{`${new Intl.NumberFormat(
                "ru-RU"
              ).format(elem.price)} Р`}</span>
              <img
                className={classes["card-logo"]}
                src={`//pics.avs.io/99/36/${elem.carrier}.png`}
                alt="Aviacompany Logo"
              />
            </div>
            <div className={classes["card-info"]}>
              <div className={classes["info-departure"]}>
                <div className={classes["info-departure-item"]}>
                  <span>{`${elem.segments[0].origin} - ${elem.segments[0].destination}`}</span>
                  <span>
                    {flightTime(
                      elem.segments[0].date,
                      elem.segments[0].duration
                    )}
                  </span>
                </div>
                <div className={classes["info-departure-item"]}>
                  <span>В пути</span>
                  <span>
                    {inAirTime(
                      elem.segments[0].date,
                      elem.segments[0].duration
                    )}
                  </span>
                </div>
                <div className={classes["info-departure-item"]}>
                  {elem.segments[0].stops.length ? (
                    <>
                      <span>{`${transferText(
                        elem.segments[0].stops.length
                      )}`}</span>
                      <span>{elem.segments[0].stops.join(", ")}</span>
                    </>
                  ) : (
                    <>
                      <span>Прямой рейс</span>
                      <span></span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes["info-arrival"]}>
                <div className={classes["info-arrival-item"]}>
                  <span>{`${elem.segments[1].origin} - ${elem.segments[1].destination}`}</span>
                  <span>
                    {flightTime(
                      elem.segments[1].date,
                      elem.segments[1].duration
                    )}
                  </span>
                </div>
                <div className={classes["info-arrival-item"]}>
                  <span>В пути</span>
                  <span>
                    {inAirTime(
                      elem.segments[1].date,
                      elem.segments[1].duration
                    )}
                  </span>
                </div>
                <div className={classes["info-arrival-item"]}>
                  {elem.segments[1].stops.length ? (
                    <>
                      <span>{`${transferText(
                        elem.segments[1].stops.length
                      )}`}</span>
                      <span>{elem.segments[1].stops.join(", ")}</span>
                    </>
                  ) : (
                    <>
                      <span>Прямой рейс</span>
                      <span></span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {getFirstTickets.slice(0, countOnPage).length > 0 ? (
        <button
          className={classes["more-tickets"]}
          onClick={() => handleOnPage()}
        >
          Показать еще 5 билетов!
        </button>
      ) : (
        <div className={classes['not-find']}>Рейсов, подходящих под заданные фильтры, не найдено</div>
      )}
    </>
  );
};

export default Tickets;
