import React, { JSX } from "react";
import styles from "./Heading.module.css";
import clsx from "clsx";

interface HeadingProps {
  title: string;
  top?: boolean;
  bottom?: boolean;
  tag?: keyof JSX.IntrinsicElements;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  top,
  bottom,
  tag: Tag = "h2",
}) => {
  return (
    <Tag
      className={clsx(styles.title, {
        [styles.top]: top,
        [styles.bottom]: bottom,
      })}
    >
      {title}
    </Tag>
  );
};

export default Heading;
