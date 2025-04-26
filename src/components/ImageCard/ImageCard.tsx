import React from "react";
import css from "./ImageCard.module.css";
import { Article } from "../../types";

interface ImageCardProps {
  infoImage: Article;
  openModal: (imageUrl: string, imageTitle: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ infoImage, openModal }) => {
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
};

export default ImageCard;
