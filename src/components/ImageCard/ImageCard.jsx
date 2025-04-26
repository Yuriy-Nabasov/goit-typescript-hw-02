import css from "./ImageCard.module.css";

export default function ImageCard({ infoImage, openModal }) {
  return (
    <div>
      <img
        className={css.img}
        src={infoImage.urls.small}
        alt={infoImage.alt_description}
        onClick={() =>
          openModal(infoImage.urls.full, infoImage.alt_description)
        }
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
