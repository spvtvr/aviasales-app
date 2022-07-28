import classes from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={classes["lds"]}>
      <div className={classes["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
