import React from "react";
import style from "./Section.module.css";

interface SectionProps extends React.PropsWithChildren<{}> {}

const Section: React.FC<SectionProps> = ({ children }) => {
  return <section className={style.section}>{children}</section>;
};
export default Section;
