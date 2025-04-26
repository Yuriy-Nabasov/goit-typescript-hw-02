import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items, openModal }) {
  return (
    <ul className={css.gallery}>
      {items.map((item) => (
        <li key={item.id} className={css.card}>
          <ImageCard infoImage={item} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}
