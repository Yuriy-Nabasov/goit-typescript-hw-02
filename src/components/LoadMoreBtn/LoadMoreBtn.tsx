import React from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
  disabled: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, disabled }) => {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
