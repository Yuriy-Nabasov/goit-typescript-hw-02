import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Article } from "../../types";

interface ImageGalleryProps {
  items: Article[];
  openModal: (imageUrl: string, imageTitle: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, openModal }) => {
  return (
    <ul className={css.gallery}>
      {items.map((item) => (
        <li key={item.id} className={css.card}>
          <ImageCard infoImage={item} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
