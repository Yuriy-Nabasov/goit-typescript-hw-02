import { PulseLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.wrap}>
      <PulseLoader
        color="#36d7b7" // Колір лоадера
        size={15} // Розмір лоадера
        speedMultiplier={1} // Швидкість анімації
      />
    </div>
  );
}
