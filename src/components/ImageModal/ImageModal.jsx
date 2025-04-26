import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({
  isOpen,
  onRequestClose,
  imageUrl,
  imageTitle,
}) {
  if (!imageUrl) {
    return null;
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      overlayClassName={css.overlay}
      className={css.content}
    >
      <img src={imageUrl} alt={imageTitle} className={css.image} />
      <div className={css.imageTitle}>
        {imageTitle}

        <button className={css.btn} onClick={onRequestClose}>
          X
        </button>
      </div>
    </Modal>
  );
}
